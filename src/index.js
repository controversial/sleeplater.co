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
    routeEnter() {
      console.log(`enter '${this.routeTo.path}' replacing '${this.routeFrom.path}'`);
    },
    routeLeave() {
      console.log(`exit '${this.routeFrom.path}' replacing with '${this.routeTo.path}'`);
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
