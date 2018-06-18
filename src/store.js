import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loaded: false,
    shopCategory: 'default',
    contactForm: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  },
  mutations: {
    loaded(state) { state.loaded = true; },
    changeCategory(state, category) { state.shopCategory = category; },
    updateContactForm(state, payload) { state.contactForm[payload.item] = payload.value; },
  },
});
