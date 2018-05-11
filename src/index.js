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
    routeTo: '',
    routeFrom: '',
  },

  methods: {
    routeChange(_, done) {
      console.log(`'${this.routeTo.path}' replacing '${this.routeFrom.path}'`);
      done();
    },
  },

  watch: {
    // Vue route changed
    $route(to, from) {
      this.routeTo = to;
      this.routeFrom = from;
    },
  },
});
