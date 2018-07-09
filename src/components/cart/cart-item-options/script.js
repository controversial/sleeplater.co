export default {
  props: ['cartIndex'],

  data: () => ({
    selectedSize: '',
    selectedColor: '',
    selectedQuantity: '',
  }),

  computed: {
    productInCart() { return this.$store.state.cart[this.cartIndex]; },
    productId() { return this.productInCart.id; },
    sizeInCart() { return this.productInCart.size; },
    colorInCart() { return this.productInCart.color; },
    quantityInCart() { return this.productInCart ? this.productInCart.quantity : 1; },
    product() { return this.$store.state.products.find(p => p.id === this.productId); },
  },

  methods: {
    update() {
      this.$store.commit('cartMutate', {
        cartIndex: this.cartIndex,
        update: {
          size: this.selectedSize,
          color: this.selectedColor,
          quantity: this.selectedQuantity,
        },
      });
    },
  },

  beforeMount() {
    this.selectedSize = this.sizeInCart;
    this.selectedColor = this.colorInCart;
    this.selectedQuantity = this.quantityInCart;
  },
};
