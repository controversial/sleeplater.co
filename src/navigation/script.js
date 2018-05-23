import routes from '../pages';
const primaryRoutes = routes.filter(route => route.meta.primary);
const primaryRouteNames = primaryRoutes.map(route => route.name);

export default {
  data: () => ({
    transitionName: '',
    transitionMode: '',
    navTransitionDelay: 0,
    lastScrollNav: 0, // Timestamp from the last time a wheel event caused navigation
    touchStartPosition: [undefined, undefined], // Where the current touch started
    canTouchNav: true, // false if the current touch has already resulted in navigation
  }),

  computed: {
    navIconColor() {
      return this.$route.meta.navIconColor;
    },
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
    // Navigate by scrolling
    onWheel(e) {
      if (Math.abs(e.deltaY) > 15 && new Date() - this.lastScrollNav > 650) {
        this.$refs.nav[e.deltaY > 0 ? 'navDown' : 'navUp']();
        this.lastScrollNav = new Date();
      }
    },

    // Navigate by swiping (touchscreens)

    onTouchStart(e) {
      if (e.touches.length > 1) return;
      this.touchStartPosition = [e.touches[0].clientX, e.touches[0].clientY];
    },
    onTouchMove(e) {
      if (e.touches.length > 1) return;
      const pos = [e.touches[0].clientX, e.touches[0].clientY];
      const delta = [pos[0] - this.touchStartPosition[0], pos[1] - this.touchStartPosition[1]];

      if (Math.abs(delta[1]) > 20 && this.canTouchNav) {
        this.$refs.nav[delta[1] > 0 ? 'navUp' : 'navDown']();
        this.canTouchNav = false;
      }
    },
    onTouchEnd() {
      this.canTouchNav = true;
    },
  },
};
