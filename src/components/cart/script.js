export default {
  props: ['hidden'],

  computed: {
    subtotal() {
      return this.$store.state.cart
        // Calculate price for each cart item
        .map(({ id, option, quantity }) => {
          const product = this.$store.state.products.find(p => p.id === id);
          const optionPrice = product.options[option];
          return optionPrice * quantity;
        })
        // Sum
        .reduce((a, b) => a + b);
    },
  },
};
