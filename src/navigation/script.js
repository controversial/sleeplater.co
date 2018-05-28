/* eslint-disable import/first */
import Vue from 'vue';
import { ScrollHandler, SwipeHandler } from './gestures';

import NavLink from './nav-link/nav-link.vue';
Vue.component('nav-link', NavLink);

import routes from '../pages';
const primaryRoutes = routes.filter(route => route.meta.primary);
const primaryRouteNames = primaryRoutes.map(route => route.name);

import { delay } from '../helpers';

export default {
  data: () => ({
    navOpen: false,

    transitionName: '',
    transitionMode: '',
    navTransitionDelay: 0,

    scrollHandler: undefined,
    swipeHandler: undefined,

    primaryRoutes,
  }),

  created() {
    this.scrollHandler = new ScrollHandler(() => this.navUp(), () => this.navDown());
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
  },

  methods: {
    // Move the whole page "up" or "down" (navigate)
    navUp() { if (this.canGoUp) this.$router.push(primaryRoutes[this.routeIndex - 1]); },
    navDown() { if (this.canGoDown) this.$router.push(primaryRoutes[this.routeIndex + 1]); },
    // Show/hide navigation menu
    toggle() {
      this.navTransitionDelay = '0s';
      this.navOpen = !this.navOpen;
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
      if (pageName === this.$route.name) this.navOpen = false;
      // Clicking other pages requires more logic
      else {
        // Move other pages down offscreen (takes 0.65s)
        const pages = [this.$refs.pageWrapper, ...this.$refs.stack.childNodes];
        pages
          .filter(p => p.getAttribute('name') !== pageName)
          .forEach(page => page.classList.add('down'));
        await delay(400); // .4s later (before that animation finishes)
        // Move the page in question up to fill viewport
        pages.find(p => p.getAttribute('name') === pageName).classList.add('up');
        await delay(650);
        pages.forEach(page => page.classList.remove('down', 'up', 'hover'));
        this.navOpen = false;
        this.$router.push(routes.find(r => r.name === pageName).path);
      }
    },

    pageMouseover(e) {
      if (this.navOpen) {
        const pageName = e.target.getAttribute('name');
        const link = this.$refs.pageLinks.querySelector(`[name=${pageName}]`);
        if (link) {
          this.$refs.pageLinks.classList.add('highlight');
          link.classList.add('hover');
        }
      }
    },
    pageMouseout(e) {
      if (this.navOpen) {
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
      if (from.name === 'home' && to.name === 'shop') [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['period-scale', 'out-in', '.5s'];
      else if (primaryRouteNames.includes(from.name) && primaryRouteNames.includes(to.name)) {
        if (primaryRouteNames.indexOf(from.name) > primaryRouteNames.indexOf(to.name)) { // Going up
          [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['slide-downwards', '', '0s'];
        } else { // Going down
          [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['slide-upwards', '', '.25s'];
        }
      } else {
        [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['', '.5s'];
      }
    },

    // Remove highlight class from links when closing menu
    navOpen(open) {
      if (!open) this.$refs.pageLinks.classList.remove('highlight');
    },
  },
};
