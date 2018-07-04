/* eslint-disable import/first */
import Vue from 'vue';

import ColorSelect from './color-select/color-select.vue';
Vue.component('color-select', ColorSelect);
import SizeSelect from './size-select/size-select.vue';
Vue.component('size-select', SizeSelect);
import QuantitySelect from './quantity-select/quantity-select.vue';
Vue.component('quantity-select', QuantitySelect);


export default {
  props: ['product'],

  computed: {
    productInCart() { return this.$store.state.cart.find(({ id }) => id === this.product.id); },
    colorInCart() { return (this.productInCart || {}).color; },
    sizeInCart() { return (this.productInCart || {}).size; },
    quantityInCart() { return this.productInCart ? this.productInCart.quantity : 1; },

    buttonMessage() {
      const p = this.productInCart;
      if (p && p.size === this.selectedSize && p.color === this.selectedColor) {
        return p.quantity === this.selectedQuantity ? 'Added!' : 'Update quantity';
      }
      return 'Add to cart';
    },

    buttonDisabled() { return !this.selectedColor || !this.selectedSize; },
  },

  data: () => ({
    selectedColor: undefined,
    selectedSize: undefined,
    selectedQuantity: 1,

    buttonActive: false,
  }),

  beforeMount() {
    this.selectedColor = this.colorInCart;
    this.selectedSize = this.sizeInCart;
    this.selectedQuantity = this.quantityInCart;
  },

  methods: {
    addToCart() {
      this.$store.commit('cartUpdate', {
        id: this.product.id,
        color: this.selectedColor,
        size: this.selectedSize,
        quantity: this.selectedQuantity,
      });
    },
  },
};
