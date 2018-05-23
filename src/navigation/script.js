import { ScrollHandler, SwipeHandler } from './gestures';

import routes from '../pages';
const primaryRoutes = routes.filter(route => route.meta.primary);
const primaryRouteNames = primaryRoutes.map(route => route.name);

export default {
  data: () => ({
    navOpen: false,

    transitionName: '',
    transitionMode: '',
    navTransitionDelay: 0,

    scrollHandler: undefined,
    swipeHandler: undefined,
  }),

  created() {
    this.scrollHandler = new ScrollHandler(() => this.navUp(), () => this.navDown());
    this.swipeHandler = new SwipeHandler(() => this.navUp(), () => this.navDown());
  },

  computed: {
    routeIndex() { return primaryRouteNames.indexOf(this.$route.name); },
    canGoUp() { return this.routeIndex > 0; },
    canGoDown() { return this.routeIndex < primaryRouteNames.length - 1; },

    navIconColor() { return this.$route.meta.navIconColor; },
  },

  methods: {
    // Move the whole page "up" or "down" (navigate)
    navUp() { if (this.canGoUp) this.$router.push(primaryRoutes[this.routeIndex - 1]); },
    navDown() { if (this.canGoDown) this.$router.push(primaryRoutes[this.routeIndex + 1]); },
    // Show/hide navigation menu
    toggle() {
      this.navTransitionDelay = this.navOpen ? '.5s' : '0s';
      this.navOpen = !this.navOpen;
    },
  },


  // Vue route changed: pick a transition
  watch: {
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
  },
};
