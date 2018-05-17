import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loaderSplit: false,
  },
  mutations: {
    toggleLoader(state) { state.loaderSplit = !state.loaderSplit; },
  },
});
