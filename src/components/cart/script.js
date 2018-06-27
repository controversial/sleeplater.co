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
        .map(({ id, option, quantity }) => {
          const product = this.$store.state.products.find(p => p.id === id);
          return {
            ...product,
            option,
            price: product.options[option],
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
