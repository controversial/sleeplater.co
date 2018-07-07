/* eslint-disable import/first */
import Vue from 'vue';

import ColorSelect from './color-select/color-select.vue';
Vue.component('color-select', ColorSelect);
import SizeSelect from './size-select/size-select.vue';
Vue.component('size-select', SizeSelect);
import QuantitySelect from './quantity-select/quantity-select.vue';
Vue.component('quantity-select', QuantitySelect);

import { formatPrice } from '../../helpers';


export default {
  props: ['product'],

  computed: {
    // (most recent entry for this product)
    // eslint-disable-next-line max-len
    productInCart() { return this.$store.state.cart.filter(({ id }) => id === this.product.id).slice(-1)[0]; },
    colorInCart() { return (this.productInCart || {}).color; },
    sizeInCart() { return (this.productInCart || {}).size; },
    quantityInCart() { return this.productInCart ? this.productInCart.quantity : 1; },

    buttonMessage() {
      const p = this.$store.state.cart.find(({ id, color, size }) =>
        id === this.product.id && color === this.selectedColor && size === this.selectedSize);
      if (p) return p.quantity === this.selectedQuantity ? 'Added!' : 'Update quantity';
      return 'Add to cart';
    },

    buttonDisabled() {
      return (this.product.options.colors.length && !this.selectedColor)
        || (this.product.options.sizes.length && !this.selectedSize);
    },
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

    if (!this.selectedColor && this.product.options.colors.length === 1) {
      this.selectedColor = this.product.options.colors[0];
    }
    if (!this.selectedSize && this.product.options.sizes.length === 1) {
      this.selectedSize = this.product.options.sizes[0];
    }
  },

  methods: {
    formatPrice,

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
