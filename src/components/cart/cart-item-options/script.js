export default {
  props: ['cartIndex', 'displayed', 'hide'],

  data: () => ({
    selectedSize: '',
    selectedColor: '',
    selectedQuantity: '',
    buttonActive: false,
  }),

  computed: {
    productInCart() { return this.$store.state.cart[this.cartIndex]; },
    productId() { return this.productInCart.id; },
    sizeInCart() { return this.productInCart.size; },
    colorInCart() { return this.productInCart.color; },
    quantityInCart() { return this.productInCart ? this.productInCart.quantity : 1; },

    product() { return this.$store.state.products.find(p => p.id === this.productId); },
    buttonMessage() {
      return (
        this.selectedSize === this.sizeInCart &&
        this.selectedColor === this.colorInCart &&
        this.selectedQuantity === this.quantityInCart
      )
        ? 'Up to date'
        : 'Update';
    },
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
      this.hide();
    },

    copyConfig() {
      this.selectedSize = this.sizeInCart;
      this.selectedColor = this.colorInCart;
      this.selectedQuantity = this.quantityInCart;
    },
  },

  // When the cart-item-options is first created, and every time it displays, make sure the options
  // it shows reflect what's in the cart.
  watch: {
    displayed() { this.copyConfig(); },
  },
  beforeMount() { this.copyConfig(); },
};
