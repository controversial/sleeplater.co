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
    addToCart(state, payload) { // (add item configured with given options/quantity)
      const product = state.products.find(p => p.id === payload.id);
      // Validate given option
      if (!(payload.option in product.options)) throw new Error(`No such option ${payload.option} on product ${payload.id}`);
      state.cart.push({
        id: payload.id,
        option: payload.option,
        quantity: payload.quantity,
      });
    },
    updateInCart(state, payload) { /* TODO (change options/quantity) */ },
    // Contact
    updateContactForm(state, payload) { state.contactForm[payload.item] = payload.value; },
  },
});
