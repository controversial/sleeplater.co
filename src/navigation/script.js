import { ScrollHandler, SwipeHandler } from './gestures';

import routes from '../pages';
const primaryRoutes = routes.filter(route => route.meta.primary);
const primaryRouteNames = primaryRoutes.map(route => route.name);

export default {
  data: () => ({
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
    navIconColor() { return this.$route.meta.navIconColor; },
    routeIndex() { return primaryRouteNames.indexOf(this.$route.name); },
    canGoUp() { return this.routeIndex > 0; },
    canGoDown() { return this.routeIndex < primaryRouteNames.length - 1; },
  },

  watch: {
    // Vue route changed
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

  methods: {
    navUp() {
      if (this.canGoUp) this.$router.push(primaryRoutes[this.routeIndex - 1]);
    },
    navDown() {
      if (this.canGoDown) this.$router.push(primaryRoutes[this.routeIndex + 1]);
    },
  },
};
