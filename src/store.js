import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loaded: false,
    contactForm: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  },
  mutations: {
    loaded(state) { state.loaded = true; },
    updateContactForm(state, payload) { state.contactForm[payload.item] = payload.value; },
  },
});
