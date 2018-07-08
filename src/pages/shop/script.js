import Vue from 'vue';
import ProductsDisplay from './products-display/products-display.vue';
Vue.component('products-display', ProductsDisplay);

export default {
  data: () => ({
    cartOpen: false,
    currentProduct: undefined,
  }),
  computed: {
    itemsCount() {
      return this.$store.state.cart
        .map(item => item.quantity)
        .reduce((a, b) => a + b, 0);
    },
    optionsOpen: {
      get() { return !!this.$route.params.productId; },
      set(value) { if (!value) { this.$router.push(`/shop/${this.$route.params.category}`); } },
    },
  },
  methods: {
    closeAll(e) {
      if (e.target === this.$el) {
        this.cartOpen = false;
        this.optionsOpen = false;
      }
    },
  },
  watch: {
    optionsOpen(val) {
      this.$store.commit(val ? 'hideNavButtons' : 'showNavButtons');
    },
  },
};
