/* eslint-disable import/first */
import Vue from 'vue';
import PaymentMethod from './payment-method/payment-method.vue';
Vue.component('payment-method', PaymentMethod);
import { formatPrice } from '../../helpers';

export default {
  props: ['hidden'],

  data: () => ({
    itemsMaxHeight: 0,
    itemsHeight: 0,

    // The index of each cart item whose options are displayed via hover
    displayedOptions: [],
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

    checkout() {
      console.log(this.$store.state.cart);
      console.log(this.$store.state.paymentMethod);
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
        .map(({ id, size, color, quantity }) => { // eslint-disable-line object-curly-newline
          const product = this.$store.state.products.find(p => p.id === id);
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
  },

  watch: {
    hidden(val) {
      this.$store.commit(val ? 'showNavButtons' : 'hideNavButtons');
    },

    // button breaks if its container element has any vue attribute so we do it like this
    '$store.state.paymentMethod': function paymentMethodChanged(val) {
      document.getElementById('paypal-button').style.display = val === 'paypal'
        ? ''
        : 'none';
    },
  },

  created() {
    this.boundUpdate = this.updateItemsMaxHeight.bind(this);
    window.addEventListener('resize', this.boundUpdate);
  },
  destroyed() { window.removeEventListener('resize', this.boundUpdate); },
  updated() { this.updateItemsMaxHeight(); },

  mounted() {
    window.paypal.Button.render({
      env: 'production',
      client: {
        sandbox: 'AasuLzwG0RtJkM14vRWCNk9v1qtMbyod3BMEI8HGvbQ9dQIrg8BAmWgA-NfsQNtHNaRACyK2aPrVakjl',
        production: 'AZUcKQOKOGm2o9lo2hi8jiG_NsH30cW9pwt7IUaGCPTgY6WiSIjUlTGaUl51V34WCSnoGeG12ExDfFqj',
      },
      payment: (data, actions) => actions.payment.create({
        transactions: [{
          amount: { total: this.formatPrice(this.subtotal * 1.08, true), currency: 'USD' },
        }],
      }),
      onAuthorize: (data, actions) => actions.payment.execute()
        .then(() => console.log('done!')),
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
