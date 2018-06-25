import Vue from 'vue';
import ProductsDisplay from './products-display/products-display.vue';
Vue.component('products-display', ProductsDisplay);

export default {
  data: () => ({
    cartOpen: false,
  }),
};
