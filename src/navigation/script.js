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
