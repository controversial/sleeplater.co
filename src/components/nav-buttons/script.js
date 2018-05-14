import routes from '../../pages';

const primaryRoutes = routes.filter(route => route.meta.primary);
const primaryRouteNames = primaryRoutes.map(route => route.name);

export default {
  props: ['color', 'transition-delay'],

  computed: {
    routeIndex() { return primaryRouteNames.indexOf(this.$route.name); },
    canGoUp() { return this.routeIndex > 0; },
    canGoDown() { return this.routeIndex < primaryRouteNames.length - 1; },
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
