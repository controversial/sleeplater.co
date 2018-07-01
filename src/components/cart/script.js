import Vue from 'vue';
import PaymentMethod from './payment-method/payment-method.vue';
Vue.component('payment-method', PaymentMethod);

export default {
  props: ['hidden'],

  methods: {
    roundPrice(price) {
      return (Math.round(price * 100) / 100).toFixed(2);
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
};
