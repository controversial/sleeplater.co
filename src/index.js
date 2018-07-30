/* eslint-disable import/first */

// Polyfills
import 'babel-polyfill';
import 'promise-polyfill';
import 'whatwg-fetch';

import './index.html';
import './main.sass';

import Vue from 'vue';

import './components';
import './plugins';
import router from './router';
import store from './store';


// Main app
window.app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    navigation: require('./navigation/navigation.vue').default,
  },

  data: {
    // Send request to development server if running locally
    apiBase: ['localhost', '0.0.0.0'].includes(window.location.hostname)
      ? 'http://0.0.0.0:3000'
      : 'https://api.sleeplater.co',
  },
  created() {
    fetch(`${this.apiBase}/products`)
      .then(r => r.json())
      .then(products => this.$store.commit('productsFetched', products));
  },
});


// --- miscellaneous stuff ---


// Fix for bad iOS scrolling behavior
function iOSResize() { document.body.style.height = `${window.innerHeight}px`; }
if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
  iOSResize();
  window.addEventListener('resize', iOSResize);
}
