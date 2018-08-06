import { formatPrice } from '../../../helpers';

export default {
  props: {
    products: Array,
    editable: Boolean,
    height: Number,
    maxHeight: Number,
  },

  data: () => ({
    // The index of each cart item whose options are displayed via hover
    displayedOptions: [],
  }),

  computed: {
    subtotal() {
      return this.products
        // Calculate price for each cart item
        .map(({ price, quantity }) => price * quantity)
        // Sum
        .reduce((a, b) => a + b, 0);
    },
    shipping() { return this.$store.state.paymentMethod === 'cash' ? 0 : 10; },
    tax() { return (this.subtotal + this.shipping) * 0.08; },
    total() { return this.subtotal + this.shipping + this.tax; },
  },

  methods: {
    formatPrice,

    tippyHide(i) {
      const t = this.$refs[`item-${i}`][0]._tippy; // eslint-disable-line no-underscore-dangle
      if (t.state.visible) t.hide();
    },
    tippyHideOthers(i) {
      for (let i2 = 0; i2 < this.products.length; i2 += 1) {
        if (i !== i2) this.tippyHide(i2);
      }
    },
  },

  components: {
    'cart-item-options': require('../cart-item-options/cart-item-options.vue').default,
  },
};
