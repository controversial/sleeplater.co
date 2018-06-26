export default {
  props: ['hidden'],

  computed: {
    itemsCount() {
      return this.$store.state.cart
        .map(item => item.quantity)
        .reduce((a, b) => a + b, 0);
    },
    subtotal() {
      return this.$store.state.cart
        // Calculate price for each cart item
        .map(({ id, option, quantity }) => {
          const product = this.$store.state.products.find(p => p.id === id);
          const optionPrice = product.options[option];
          return optionPrice * quantity;
        })
        // Sum
        .reduce((a, b) => a + b, 0);
    },
  },
};
