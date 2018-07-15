import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Navigation
    navOpen: false,
    hideNavButtons: false,

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
        size: 'xl',
        color: '#D66763',
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
    hideNavButtons(state) { state.hideNavButtons = true; },
    showNavButtons(state) { state.hideNavButtons = false; },

    // Home
    loaded(state) { state.loaded = true; },

    // Shop
    changeCategory(state, category) { state.shopCategory = category; },
    productsFetched(state, products) { state.products = products; state.productsFetched = true; },
    selectPaymentMethod(state, paymentMethodName) { state.paymentMethod = paymentMethodName; },
    cartUpdate(state, payload) { // Add or update an item in the cart
      // Search for the item/configuration in the existing cart state
      const cartItem = state.cart
        .find(e => e.id === payload.id && e.size === payload.size && e.color === payload.color);
      // If it's already in the cart, just update quantity
      if (cartItem) {
        cartItem.quantity = payload.quantity;
      // If this item/configuration does not already exist in the cart, add it
      } else {
        const product = state.products.find(p => p.id === payload.id);
        // Validate given options
        if (product.options.sizes.length && !product.options.sizes.includes(payload.size)) throw new Error(`Size ${payload.size} not available for product ${payload.id}`);
        if (product.options.colors.length && !product.options.colors.includes(payload.color)) throw new Error(`Color ${payload.color} not available for product ${payload.id}`);
        // Add
        state.cart.push({
          id: payload.id,
          size: payload.size,
          color: payload.color,
          quantity: payload.quantity,
        });
      }
    },
    // Change a specific item in the cart to a new configuration (could be new color, size,
    // quantity, anything)
    cartMutate(state, payload) {
      /*
       * payload = {
       *   cartIndex: 0,         <- index of the item in the cart array that we're updating
       *   update: {
       *     size: 'xl',         <- New size
       *     color: '#hex_here', <- New color
       *     quantity: 3,        <- new quantity
       *   }
       * }
       */

      const cartItem = state.cart[payload.cartIndex]; // what's in the cart already? (old state)

      // Search for whatever our new configuration is in the cart
      const newConfigInCart = state.cart
        .find(e =>
          e.id === cartItem.id
          && e.size === payload.update.size
          && e.color === payload.update.color);

      if (!newConfigInCart) {
        // Our new configuration doesn't match any in the cart. Simple! Just change it.
        Object.assign(cartItem, payload.update);
      } else if (state.cart.indexOf(newConfigInCart) !== payload.cartIndex) {
        // There's a *different* entry in the cart that matches our new configuration.
        // We should add however many of this item element we have to however many were stored in
        // the old item
        newConfigInCart.quantity += payload.update.quantity;
        // And then remove the item we're mutating since we just combined it with an older one
        state.cart.splice(payload.cartIndex, 1);
      } else {
        // We found the same item! This means we have the same config options and are only updating
        // the quantity. Let's do that.
        cartItem.quantity = payload.update.quantity;
      }
    },
    cartRemove(state, payload) {
      state.cart.splice(payload.cartIndex, 1);
    },
    // Clear everything out the cart
    clearCart(state) {
      state.cart = [];
      state.paymentMethod = '';
    },

    // Contact
    updateContactForm(state, payload) { state.contactForm[payload.item] = payload.value; },
  },
});
