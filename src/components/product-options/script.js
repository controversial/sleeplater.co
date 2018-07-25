/* eslint-disable import/first */

import { formatPrice, uniq, splitWrappedLines } from '../../helpers';
import analytics from '../../analytics';

export default {
  props: ['productId'],

  computed: {
    product() { return this.$store.state.products.find(p => p.id === this.productId); },
    soldOut() { return !this.availableSizesForColor.length; },
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
    optionQuantity() {
      if (!this.selectedColor || !this.selectedSize) return 1;
      return this.product.options
        .find(o => o.size === this.selectedSize && o.color === this.selectedColor)
        .quantity;
    },

    buttonMessage() {
      if (this.mobile && this.mobilePage === 1) return 'Continue';
      const p = this.$store.state.cart.find(({ id, color, size }) =>
        id === this.product.id && color === this.selectedColor && size === this.selectedSize);
      if (this.soldOut) return 'Sold out';
      if (p) return p.quantity === this.selectedQuantity ? 'Added!' : 'Update quantity';
      return 'Add to cart';
    },

    buttonDisabled() {
      return this.mobile
        ? this.mobilePage !== 1 && (this.soldOut || !this.selectedColor || !this.selectedSize)
        : this.soldOut || !this.selectedColor || !this.selectedSize;
    },
  },

  data: () => ({
    req: undefined,
    selectedColor: undefined,
    selectedSize: undefined,
    selectedQuantity: 1,
    carouselIndex: 0,
    mobile: false,
    // Mobile has a paged layout with multiple steps
    mobilePage: 1,
  }),

  async beforeMount() {
    // Wait for productsFetched mutation in Vuex before proceeding to ensure that products are
    // populated with an API result
    if (!this.$store.state.productsFetched) {
      this.req = new Promise((resolve) => {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'productsFetched') resolve();
        });
      });
      await this.req;
    }

    // Select default options to reflect what's in cart
    this.selectedColor = this.colorInCart;
    this.selectedSize = this.sizeInCart;
    this.selectedQuantity = this.quantityInCart;

    // Auto-select first color when opening so that we have images to display
    if (!this.selectedColor) this.selectedColor = this.product.options[0].color;

    // Detect mobile layout
    const mobileQuery = window.matchMedia('screen and (orientation: portrait) and (max-width: 500px)');
    this.mobile = mobileQuery.matches;
    mobileQuery.addListener((mq) => { this.mobile = mq.matches; });
  },

  async mounted() {
    await this.req;
    splitWrappedLines(this.$refs.header);
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

    bottomBarClick() {
      // Used to advance from first to second page on mobile layout
      if (this.mobile && this.mobilePage === 1) this.mobilePage = 2;
      else this.addToCart();
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
