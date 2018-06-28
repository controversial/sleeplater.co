import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Navigation
    navOpen: false,

    // Home
    loaded: false,

    // Shop
    shopCategory: 'default',
    products: [],
    productsFetched: false,
    paymentMethod: '',
    cart: [
      /*
      {
        id: '',
        option: 'xl',
        quantity: 1,
      }
      */
    ],

    // Contact
    contactForm: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  },
  mutations: {
    // Navigation
    toggleNav(state) { state.navOpen = !state.navOpen; },
    closeNav(state) { state.navOpen = false; },
    // Home
    loaded(state) { state.loaded = true; },
    // Shop
    changeCategory(state, category) { state.shopCategory = category; },
    productsFetched(state, products) { state.products = products; state.productsFetched = true; },
    selectPaymentMethod(state, paymentMethodName) { state.paymentMethod = paymentMethodName; },
    cartUpdate(state, payload) { // Add or update an item in the cart
      // Search for the item/configuration in the existing cart state
      const cartItem = state.cart
        .find(entry => entry.id === payload.id && entry.option === payload.option);
      // If it's already in the cart, just update quantity
      if (cartItem) {
        cartItem.quantity = payload.quantity;
      // If this item/configuration does not already exist in the cart, add it
      } else {
        const product = state.products.find(p => p.id === payload.id);
        // Validate given option
        if (!(payload.option in product.options)) throw new Error(`No such option ${payload.option} on product ${payload.id}`);
        // Add
        state.cart.push({
          id: payload.id,
          option: payload.option,
          quantity: payload.quantity,
        });
      }
    },
    // Contact
    updateContactForm(state, payload) { state.contactForm[payload.item] = payload.value; },
  },
});
