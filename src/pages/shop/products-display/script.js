import * as transitions from './item-transitions';
import { clamp } from '../../../helpers';

const Lethargy = require('exports-loader?this.Lethargy!lethargy/lethargy');
const lethargy = new Lethargy(null, 30);

// Send request to development server if running locally
const apiBase = ['localhost', '0.0.0.0'].includes(window.location.hostname)
  ? 'http://0.0.0.0:3000'
  : 'https://sleeplater-backend.now.sh';


export default {
  data: () => ({
    products: [],
    scrollPx: 0,
    prevCategory: null,

    scrollEndTimeout: undefined,
    windowWidth: window.innerWidth, // Reactive version
  }),

  computed: {
    categories() {
      return this.products
        .map(p => p.categories) // get categories
        .reduce((a, b) => a.concat(b), []) // flatten
        .filter((n, i, list) => list.indexOf(n) === i); // Remove duplicates
    },
    categoryProducts() {
      return this.products.filter(p => p.categories.includes(this.$route.params.category));
    },

    categoryIndex: {
      get() { return this.categories.indexOf(this.$route.params.category); },
      set(i) { this.$router.push(`/shop/${this.categories[i]}`); },
    },

    minScroll() { return 0; },
    maxScroll() {
      //                  |  margins  |+| width of items from center of first to center of last |
      const itemsWidthVw = ((17.8 * 2) + (27.4 * (this.categoryProducts.length - 1)));
      const itemsWidthPx = itemsWidthVw * (0.01 * this.windowWidth);
      return clamp(itemsWidthPx - this.windowWidth, 0, Infinity);
    },
  },

  methods: {
    getXOffset(productIndex) {
      // leftmost item's initial x-center is 17.8vw
      // 4th item (index 3) should start with 82.2vw
      return `calc(${27.4 * productIndex}vw - ${this.scrollPx}px)`;
    },

    scrollHandler(evt) {
      evt.stopPropagation(); // Prevent navigation
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
  },

  created() {
    // Make sure vuex record of category matches the one we're displaying
    this.$store.commit('changeCategory', this.$route.params.category);

    // Get products list from backend
    fetch(`${apiBase}/products`)
      .then(r => r.json())
      .then((products) => { this.products = products; })
      .then(() => {
        if (this.$route.params.category === 'default') this.$router.replace(`/shop/${this.categories[0]}`);
      });

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });

    // add transitions as methods such that each function keeps *this* context that we're in rn
    Object.assign(this, ...Object.keys(transitions).map(key => ({
      [key]: transitions[key].bind(this),
    })));
  },

  watch: {
    '$route.params.category': function categoryChanged(newCat, oldCat) {
      this.prevCategory = oldCat;
      // Update current category stored in Vuex
      this.$store.commit('changeCategory', this.$route.params.category);
      // Match scroll position to the direction we're coming from for continuity
      this.scrollPx = this.categories.indexOf(newCat) > this.categories.indexOf(oldCat)
        ? this.minScroll
        : this.maxScroll;
    },
  },
};
