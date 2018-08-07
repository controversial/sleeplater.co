/* eslint-disable import/first */
import { delay, formatPrice, getShippingCost } from '../../helpers';
import doPaypal from './paypal';
import onOrderComplete from './order-track';

export default {
  props: ['hidden'],

  data: () => ({
    itemsMaxHeight: 0,
    itemsHeight: 0,
    checkoutStep: 1,
    hasAttempted: false,
    orderPlaced: false,

    checkoutButtonState: 'static',
  }),

  methods: {
    formatPrice,

    updateItemsMaxHeight() {
      if (!this.itemsCount || !this.$refs.overview.$refs.items) {
        this.itemsMaxHeight = 0;
        this.itemsHeight = 0;
      } else {
        const itemsTop = this.$refs.overview.$refs.items.getBoundingClientRect().top;
        const maxBottom = (
          window.innerHeight // Height of the window
          - parseFloat(getComputedStyle(this.$el.getElementsByClassName('contents')[0]).paddingBottom) // Minus the padding at the bottom of the cart
          // Minus the height of all of the content that needs to come after the cart items
          - (this.$refs.bottommost.$el.getBoundingClientRect().bottom
          - this.$refs.overview.$refs.items.nextElementSibling.getBoundingClientRect().top)
        );
        this.itemsMaxHeight = maxBottom - itemsTop;
        this.itemsHeight = this.$refs.overview.$refs.items.getBoundingClientRect().height;
      }
    },

    checkout() {
      if (this.$store.state.paymentMethod === 'cash') {
        this.orderComplete({ payment_method: 'cash' });
      }
    },

    async orderComplete(payer) {
      this.checkoutButtonState = 'loading';
      const { status, updates } = await onOrderComplete.bind(this)(payer);
      if (status === 'success') {
        this.checkoutButtonState = 'completed';
        this.$store.commit('stockUpdated', updates);
        await delay(1000);
        this.$store.commit('clearCart');
        this.hasAttempted = false;
        this.checkoutStep = 1;
        this.orderPlaced = true;
        this.checkoutButtonState = 'static';
      } else {
        this.checkoutButtonState = 'failed';
        await delay(1500);
        this.checkoutButtonState = 'static';
      }
    },
  },

  computed: {
    itemsCount() {
      return this.$store.state.cart
        .map(item => item.quantity)
        .reduce((a, b) => a + b, 0);
    },
    productsInCart() {
      return this.$store.state.cart
        .map(({ slug, size, color, quantity }) => { // eslint-disable-line object-curly-newline
          const product = this.$store.state.products.find(p => p.slug === slug);
          return {
            ...product,
            size,
            color,
            quantity,
          };
        });
    },
    subtotal() {
      return this.productsInCart
        // Calculate price for each cart item
        .map(({ price, quantity }) => price * quantity)
        // Sum
        .reduce((a, b) => a + b, 0);
    },
    shipping() {
      return getShippingCost(this.$refs.address.zip, this.$refs.address.country, this.itemsCount);
    },
    tax() { return (this.subtotal + this.shipping) * 0.08; },
    total() { return this.subtotal + this.shipping + this.tax; },

    cartEmptyMessage() { return this.orderPlaced ? 'Order received!' : "There's nothing in your cart!"; },
  },

  watch: {
    hidden(val) {
      this.$store.commit(val ? 'showNavButtons' : 'hideNavButtons');
    },

    // button breaks if its container element has any vue attribute so we do it like this
    '$store.state.paymentMethod': function paymentMethodChanged(val) {
      document.getElementById('paypal-button').style.display = val === 'paypal' || val === 'credit'
        ? ''
        : 'none';
    },

    productsInCart(ps) {
      if (ps.length) this.orderPlaced = false;
    },
  },

  created() {
    this.boundUpdate = this.updateItemsMaxHeight.bind(this);
    window.addEventListener('resize', this.boundUpdate);
  },
  destroyed() { window.removeEventListener('resize', this.boundUpdate); },
  updated() { this.updateItemsMaxHeight(); },

  mounted() {
    doPaypal({
      getPaymentAmount: () => this.total,
      onComplete: payer => this.orderComplete(payer),
    });
  },

  components: {
    'payment-method': require('./payment-method/payment-method.vue').default,
    'order-overview': require('./order-overview/order-overview.vue').default,
  },
};
