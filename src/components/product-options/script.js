/* eslint-disable import/first */
import Vue from 'vue';

import ColorSelect from './color-select/color-select.vue';
Vue.component('color-select', ColorSelect);
import SizeSelect from './size-select/size-select.vue';
Vue.component('size-select', SizeSelect);


export default {
  props: ['product'],

  computed: {
    productInCart() { return this.$store.state.cart.find(({ id }) => id === this.product.id); },
    colorInCart() { return (this.productInCart || {}).color; },
    sizeInCart() { return (this.productInCart || {}).size; },
  },

  data: () => ({
    selectedColor: undefined,
    selectedSize: undefined,
  }),

  beforeMount() {
    this.selectedColor = this.colorInCart;
    this.selectedSize = this.sizeInCart;
  },
};
