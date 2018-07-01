import Vue from 'vue';
import ProductsDisplay from './products-display/products-display.vue';
Vue.component('products-display', ProductsDisplay);

export default {
  data: () => ({
    cartOpen: false,
    optionsOpen: false,
    currentProduct: undefined,
  }),
  computed: {
    itemsCount() {
      return this.$store.state.cart
        .map(item => item.quantity)
        .reduce((a, b) => a + b, 0);
    },
  },
};
