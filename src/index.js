/* eslint-disable import/first */
import './index.html';
import './main.sass';

import './components';
import router from './router';

import Vue from 'vue';


window.app = new Vue({
  el: '#app',
  router,

  data: {
    transitionName: '',
  },

  methods: {
    getTransitionName(to, from) {
      return '';
    },
  },

  watch: {
    // Vue route changed
    $route(to, from) {
      this.transitionName = this.getTransitionName(to, from);
    },
  },
});
