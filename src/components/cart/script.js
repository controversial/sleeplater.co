/* eslint-disable import/first */
import Vue from 'vue';
import PaymentMethod from './payment-method/payment-method.vue';
Vue.component('payment-method', PaymentMethod);
import { delay, formatPrice } from '../../helpers';
import onOrderComplete from './order-track';

export default {
  props: ['hidden'],

  data: () => ({
    itemsMaxHeight: 0,
    itemsHeight: 0,
    checkoutStep: 1,
    orderPlaced: false,

    // The index of each cart item whose options are displayed via hover
    displayedOptions: [],
    checkoutButtonState: 'static',
  }),

  methods: {
    formatPrice,

    updateItemsMaxHeight() {
      if (!this.itemsCount || !this.$refs.items) {
        this.itemsMaxHeight = 0;
        this.itemsHeight = 0;
      } else {
        const itemsTop = this.$refs.items.getBoundingClientRect().top;
        const maxBottom = (
          window.innerHeight // Height of the window
          - parseFloat(getComputedStyle(this.$el.getElementsByClassName('contents')[0]).paddingBottom) // Minus the padding at the bottom of the cart
          // Minus the height of all of the content that needs to come after the cart items
          - (this.$refs.bottommost.$el.getBoundingClientRect().bottom
          - this.$refs.items.nextElementSibling.getBoundingClientRect().top)
        );
        this.itemsMaxHeight = `${(maxBottom - itemsTop)}px`;
        this.itemsHeight = `${this.$refs.items.getBoundingClientRect().height}px`;
      }
    },

    tippyHide(i) {
      const t = this.$refs[`item-${i}`][0]._tippy; // eslint-disable-line no-underscore-dangle
      if (t.state.visible) t.hide();
    },
    tippyHideOthers(i) {
      for (let i2 = 0; i2 < this.productsInCart.length; i2 += 1) {
        if (i !== i2) this.tippyHide(i2);
      }
    },

    async checkout() {
      if (this.$store.state.paymentMethod === 'cash') {
        // gah no time for anythig better
        /* eslint-disable no-alert */
        let name = '';
        let email = '';
        let address = '';
        while (!name.length) {
          name = prompt('Enter your name');
          if (name === null) return;
        }
        while (!email.length) {
          email = prompt('Enter your email');
          if (email === null) return;
        }
        while (!address.length) {
          address = prompt('Enter your shipping address');
          if (address === null) return;
        }
        /* eslint-enable no-alert */
        this.orderComplete({
          payment_method: 'cash',
          name,
          email,
          address,
        });
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
    shipping() { return this.$store.state.paymentMethod === 'cash' ? 0 : 10; },
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
    // Create paypal button
    window.paypal.Button.render({
      env: 'production',
      client: {
        sandbox: 'AasuLzwG0RtJkM14vRWCNk9v1qtMbyod3BMEI8HGvbQ9dQIrg8BAmWgA-NfsQNtHNaRACyK2aPrVakjl',
        production: 'AZUcKQOKOGm2o9lo2hi8jiG_NsH30cW9pwt7IUaGCPTgY6WiSIjUlTGaUl51V34WCSnoGeG12ExDfFqj',
      },
      payment: (data, actions) => actions.payment.create({
        transactions: [{
          amount: { total: this.formatPrice(this.total, true), currency: 'USD' },
        }],
      }),
      onAuthorize: (data, actions) => actions.payment.execute()
        .then((result) => { this.orderComplete(result.payer); }),
      style: {
        size: 'responsive',
        shape: 'rect',
        color: 'silver',
        tagline: false,
      },
    }, '#paypal-button');
    document.getElementById('paypal-button').style.display = 'none';
  },
};
