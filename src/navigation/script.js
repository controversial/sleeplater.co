/* eslint-disable import/first */
import Vue from 'vue';
import { ScrollHandler, SwipeHandler } from './gestures';

import NavLink from './nav-link/nav-link.vue';
Vue.component('nav-link', NavLink);

import routes from '../pages';
const primaryRoutes = routes.filter(route => (route.meta || {}).primary);
const primaryRouteNames = primaryRoutes.map(route => route.name);

import store from '../store';

import { delay } from '../helpers';

export default {
  data: () => ({
    transitionName: '',
    transitionMode: '',
    navTransitionDelay: 0,
    transitionOverride: false,

    scrollHandler: undefined,
    swipeHandler: undefined,

    primaryRoutes,
  }),

  created() {
    this.scrollHandler = new ScrollHandler(() => this.navUp(), () => this.navDown(), this);
    this.swipeHandler = new SwipeHandler(() => this.navUp(), () => this.navDown());
  },

  computed: {
    routeIndex() { return primaryRouteNames.indexOf(this.$route.name); },
    canGoUp() { return this.routeIndex > 0; },
    canGoDown() { return this.routeIndex < primaryRouteNames.length - 1; },

    otherRoutes() {
      // name assumed to be unique in this case
      const others = primaryRoutes.filter(route => route.name !== this.$route.name);
      // Items that are "closer" by position in the list of primary routes to the current one come
      // first. In cases of equal closeness, the one from after the current route comes before the
      // one that appears before the current route in the main scroll
      others.sort((a, b) => {
        const dist = page => Math.abs(this.routeIndex - primaryRouteNames.indexOf(page.name));
        if (dist(a) !== dist(b)) return dist(a) - dist(b);
        return primaryRouteNames.indexOf(b) - primaryRouteNames.indexOf(a);
      });
      return others;
    },

    navIconColor() { return this.$route.meta.navIconColor; },
    wrapperTransitionDuration() { return this.transitionOverride ? '0s' : undefined; },
  },

  methods: {
    // Move the whole page "up" or "down" (navigate)
    navToIndex(index) {
      this.$router.push({
        name: primaryRoutes[index].name,
        // Pass appropriate params to shop page if necessary
        params: primaryRoutes[index].name === 'shop' ? { category: store.state.shopCategory } : undefined,
      });
    },
    navUp() { if (this.canGoUp) this.navToIndex(this.routeIndex - 1); },
    navDown() { if (this.canGoDown) this.navToIndex(this.routeIndex + 1); },
    // Show/hide navigation menu
    toggle() {
      this.navTransitionDelay = '0s';
      this.$store.commit('toggleNav');
    },

    linkMouseover(pageName) {
      if (pageName === this.$route.name) this.$refs.pageWrapper.classList.add('hover');
      else {
        const page = this.$refs.stack.querySelector(`[name=${pageName}]`);
        if (page) page.classList.add('hover');
      }
    },
    linkMouseout(pageName) {
      if (pageName === this.$route.name) this.$refs.pageWrapper.classList.remove('hover');
      else {
        const page = this.$refs.stack.querySelector(`[name=${pageName}]`);
        if (page) page.classList.remove('hover');
      }
    },
    async linkClick(pageName) {
      // Clicking the front page is simple: just close the menu
      if (pageName === this.$route.name) this.$store.commit('closeNav');
      // Clicking other pages requires more logic
      else {
        // Move other pages down offscreen (takes 0.65s)
        const pages = [this.$refs.pageWrapper, ...this.$refs.stack.children];
        pages
          .filter(p => p.getAttribute('name') !== pageName)
          .forEach(page => page.classList.add('down'));
        await delay(25); // .25s later
        // Move the page in question up to fill viewport
        pages.find(p => p.getAttribute('name') === pageName).classList.add('up');
        await delay(650);
        this.transitionOverride = true;
        pages.forEach(page => page.classList.remove('down', 'up', 'hover'));
        this.$store.commit('closeNav');
        this.$router.push({ name: pageName, params: pageName === 'shop' ? { category: store.state.shopCategory } : undefined });
      }
    },

    pageMouseover(e) {
      if (this.$store.state.navOpen) {
        const pageName = e.target.getAttribute('name');
        const link = this.$refs.pageLinks.querySelector(`[name=${pageName}]`);
        if (link) {
          this.$refs.pageLinks.classList.add('highlight');
          link.classList.add('hover');
        }
      }
    },
    pageMouseout(e) {
      if (this.$store.state.navOpen) {
        const pageName = e.target.getAttribute('name');
        const link = this.$refs.pageLinks.querySelector(`[name=${pageName}]`);
        if (link) {
          this.$refs.pageLinks.classList.remove('highlight');
          link.classList.remove('hover');
        }
      }
    },
  },


  watch: {
    // Vue route changed: pick a transition
    $route(to, from) {
      if (this.transitionOverride) [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['', '', '0s'];
      else if (from.name === 'home' && to.name === 'shop') [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['period-scale', 'out-in', '.5s'];
      else if (primaryRouteNames.includes(from.name) && primaryRouteNames.includes(to.name)) {
        if (primaryRouteNames.indexOf(from.name) > primaryRouteNames.indexOf(to.name)) { // Going up
          [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['slide-downwards', '', '0s'];
        } else { // Going down
          [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['slide-upwards', '', '.25s'];
        }
      } else {
        [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['', '', ''];
      }

      setTimeout(() => { this.transitionOverride = false; }, 150);
    },

    // Remove highlight class from links when closing menu
    '$store.state.navOpen': function navOpenWatcher(open) {
      if (!open) {
        this.$refs.pageLinks.classList.remove('highlight');
        [...this.$refs.pageLinks.children].forEach(l => l.classList.remove('hover'));
      }
    },
  },
};
