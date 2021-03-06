import * as transitions from './item-transitions';
import analytics from '../../../analytics';
import { clamp, delay } from '../../../helpers';


const Lethargy = require('exports-loader?this.Lethargy!lethargy/lethargy');
const lethargy = new Lethargy(null, 30);


export default {
  props: ['interactable'],

  /* eslint-disable no-underscore-dangle */
  data: () => ({
    scrollPx: 0,
    prevCategory: null,

    animatedTitle: ['', ''],
    titleStyle: {
      _initialTransform: 'translate(-47%, calc(-.4em - 25%))',
      transform: 'translate(-47%, calc(-.4em - 25%))',
      transitionProperty: 'transform, opacity',
      transitionTimingFunction: 'ease-out',
      transiitonDuration: '.4s',
      opacity: 1,
    },

    shouldDisplayTitle: false,
    shouldDisplayProducts: false,

    scrollEndTimeout: undefined,
    windowWidth: window.innerWidth, // Reactive version
  }),

  computed: {
    categories() {
      return this.$store.state.products
        .map(p => p.category) // get category
        .filter((n, i, list) => list.indexOf(n) === i); // Remove duplicates
    },
    category() { return this.$route.params.category || this.categories[0]; },
    categoryProducts() {
      if (!this.shouldDisplayProducts) return [];
      return this.$store.state.products
        .filter(p => p.category === this.category);
    },

    categoryIndex: {
      get() { return this.categories.indexOf(this.category); },
      set(i) { this.$router.push(i === 0 ? '/' : `/${this.categories[i]}`); },
    },

    minScroll() { return 0; },
    maxScroll() {
      //                  |  margins  |+| width of items from center of first to center of last |
      const itemsWidthVw = ((17.8 * 2) + (27.4 * (this.categoryProducts.length - 1)));
      const itemsWidthPx = itemsWidthVw * (0.01 * this.windowWidth);
      return clamp(itemsWidthPx - this.windowWidth, 0, Infinity);
    },

    bgTitle() {
      if (!this.shouldDisplayTitle || !this.category) return '';
      return this.category.replace(/-/g, ' ').split(':');
    },
  },

  methods: {
    getXOffset(productIndex) {
      // leftmost item's initial x-center is 17.8vw
      // 4th item (index 3) should start with 82.2vw
      return `calc(${27.4 * productIndex}vw - ${this.scrollPx}px)`;
    },

    clicked(i) {
      const product = this.categoryProducts[i];
      analytics.productClicked(product);
      this.$emit('productClick', product.slug);
    },

    scrollHandler(evt) {
      evt.preventDefault();

      // Distinguish between user scrolling and "inertial" scrolling
      const isUserScroll = lethargy.check(evt);

      // Move scroll if we're within bounds
      const newScroll = this.scrollPx + evt.deltaY;

      if (newScroll >= this.minScroll && newScroll <= this.maxScroll) {
        // Scroll normally if the scroll event would land us in the category's bounds
        this.scrollPx = newScroll;
      } else if (!isUserScroll) {
        // Rubber band if inertial scrolling carries scroll out of bounds
        // TODO
        this.scrollPx = clamp(newScroll, this.minScroll, this.maxScroll);
      } else {
        // Change category if user-initiated scrolling brings us out of bounds
        // TODO
        this.scrollPx = clamp(newScroll, this.minScroll, this.maxScroll);
      }

      // event will be called, but each scroll also cancels any existing "scroll end timer." Only
      // when inertial scrolling is finished will the "scroll end" event be called, because this
      // timer will not be cancelled
      clearTimeout(this.scrollEndTimeout);
      this.scrollEndTimeout = setTimeout(() => this.scrollEnd(), 100);
    },

    // Called when inertial scrolling is finished
    scrollEnd() {},

    onProductsFetched() {
      // Register Google Analytics impressions for products on page
      this.categoryProducts.forEach(p => analytics.productVisible(p));
      analytics.pageView(this.$route);
    },
  },

  created() {
    if (this.$store.state.productsFetched) this.onProductsFetched();
    else {
      this.$store.subscribe((mutation) => {
        if (mutation.type === 'productsFetched') this.onProductsFetched();
      });
    }

    // Don't display until after loader is finished
    // These update staggered after $store.state.loaded updates
    this.shouldDisplayTitle = this.$store.state.loaded;
    this.shouldDisplayProducts = this.$store.state.loaded;
    if (!this.shouldDisplay) {
      this.$store.subscribe(async (mutation) => {
        if (mutation.type === 'loaded') {
          setTimeout(() => { this.shouldDisplayTitle = true; }, 100);
          setTimeout(() => { this.shouldDisplayProducts = true; }, 700);
        }
      });
    }

    // Register event listener for reactive innerWidth
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });

    // add transitions as methods such that each function keeps *this* context that we're in rn
    Object.assign(this, ...Object.keys(transitions).map(key => ({
      [key]: transitions[key].bind(this),
    })));

    this.animatedTitle = this.bgTitle;
  },

  watch: {
    category: function categoryChanged(newCat, oldCat) {
      this.prevCategory = oldCat;
      // Update current category stored in Vuex
      this.$store.commit('changeCategory', this.category);
      // Match scroll position to the direction we're coming from for continuity
      this.scrollPx = this.categories.indexOf(newCat) > this.categories.indexOf(oldCat)
        ? this.minScroll
        : this.maxScroll;
      // Register Google Analytics impressions for new products
      if (typeof oldCat !== 'undefined') {
        this.categoryProducts.forEach(p => analytics.productVisible(p));
        analytics.pageView(this.$route);
      }
    },

    async bgTitle(title, oldTitle) {
      if (title[0] === oldTitle[0] && title[1] === oldTitle[1]) return;

      const leaveStagger = 0.125 * 1000;
      const oldProducts = this.$store.state.products
        .filter(p => p.category === this.prevCategory);
      if (oldProducts.length) {
        await delay(leaveStagger * (oldProducts.length + 1));
      }

      const goingRight = this.categoryIndex > this.categories.indexOf(this.prevCategory);
      // Fly out
      this.titleStyle = {
        ...this.titleStyle,
        transitionDuration: '.4s',
        transitionTimingFunction: 'ease-in',
        transform: `${this.titleStyle._initialTransform} translateX(${goingRight ? '-' : ''}25vw)`,
        opacity: 0,
      };
      await delay(400);
      // Jump to opposite side
      this.titleStyle = {
        ...this.titleStyle,
        transitionDuration: '0s',
        transform: `${this.titleStyle._initialTransform} translateX(${goingRight ? '' : '-'}25vw)`,
      };
      // Switch title
      this.animatedTitle = title;
      await delay(50); // Safari needs time to readjust vertical transform for new text, apparently
      // Fly in
      this.titleStyle = {
        ...this.titleStyle,
        transitionDuration: '.4s',
        transitionTimingFunction: 'ease-out',
        transform: this.titleStyle._initialTransform,
        opacity: 1,
      };
    },
  },
};
