/* eslint-disable import/first */

import { formatPrice, uniq } from '../../helpers';
import analytics from '../../analytics';

export default {
  props: ['productId'],

  computed: {
    product() { return this.$store.state.products.find(p => p.id === this.productId); },
    soldOut() { return !this.availableOptions.length; },
    // (most recent entry for this product)
    // eslint-disable-next-line max-len
    productInCart() { return this.$store.state.cart.filter(({ id }) => id === this.product.id).slice(-1)[0]; },
    colorInCart() { return (this.productInCart || {}).color; },
    sizeInCart() { return (this.productInCart || {}).size; },
    quantityInCart() { return this.productInCart ? this.productInCart.quantity : 1; },

    colors() { return uniq(this.product.options.map(o => o.color)); },
    sizes() { return uniq(this.product.options.map(o => o.size)); },
    availableOptions() { return this.product.options.filter(o => o.quantity); },
    availableSizesForColor() {
      if (!this.selectedColor) return [];
      return this.availableOptions
        .filter(o => o.color === this.selectedColor)
        .map(o => o.size);
    },

    buttonMessage() {
      const p = this.$store.state.cart.find(({ id, color, size }) =>
        id === this.product.id && color === this.selectedColor && size === this.selectedSize);
      if (this.soldOut) return 'Sold out';
      if (p) return p.quantity === this.selectedQuantity ? 'Added!' : 'Update quantity';
      return 'Add to cart';
    },

    buttonDisabled() {
      return this.soldOut || !this.selectedColor || !this.selectedSize;
    },
  },

  data: () => ({
    selectedColor: undefined,
    selectedSize: undefined,
    selectedQuantity: 1,
    carouselIndex: 0,
  }),

  async beforeMount() {
    // Wait for productsFetched mutation in Vuex before proceeding to ensure that products are
    // populated with an API result
    if (!this.$store.state.productsFetched) {
      await new Promise((resolve) => {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'productsFetched') resolve();
        });
      });
    }

    this.selectedColor = this.colorInCart;
    this.selectedSize = this.sizeInCart;
    this.selectedQuantity = this.quantityInCart;

    if (!this.selectedColor) this.selectedColor = this.product.options[0].color;
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
      analytics.addToCart(this.product);
    },
  },

  watch: {
    // When we switch colors, updates to the selected size might be necessary
    selectedColor() {
      // If the size we had selected isn't available on the new color, deselect it
      if (!this.availableSizesForColor.includes(this.selectedSize)) {
        this.selectedSize = undefined;
      }
      // If there's only one size available, select it automatically
      if (this.availableSizesForColor.length === 1) {
        this.selectedSize = this.availableSizesForColor[0];
      }
    },
  },
};
