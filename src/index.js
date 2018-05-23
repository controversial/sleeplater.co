/* eslint-disable import/first */

// Polyfills
import 'babel-polyfill';
import 'promise-polyfill';
import 'whatwg-fetch';

import './index.html';
import './main.sass';

import './components';
import router from './router';
import store from './store';

import Vue from 'vue';

import NavigationController from './navigation/navigation.vue';
Vue.component('navigation', NavigationController);


// Fix for bad iOS scrolling behavior
function iOSResize() { document.body.style.height = `${window.innerHeight}px`; }
if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
  iOSResize();
  window.addEventListener('resize', iOSResize);
}


// Main app

window.app = new Vue({
  el: '#app',
  router,
  store,
});
