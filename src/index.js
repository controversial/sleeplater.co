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

import routes from './pages';
const primaryRoutes = routes.filter(route => route.meta.primary);
const primaryRouteNames = primaryRoutes.map(route => route.name);

// Fix for bad iOS scrolling behavior
function iOSResize() { document.body.style.height = `${window.innerHeight}px`; }
if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
  iOSResize();
  window.addEventListener('resize', iOSResize);
}

window.app = new Vue({
  el: '#app',
  router,
  store,

  data: {
    transitionName: '',
    transitionMode: '',
    navTransitionDelay: 0,
    lastScrollNav: 0,
  },

  computed: {
    navIconColor() {
      return this.$route.meta.navIconColor;
    },
  },

  watch: {
    // Vue route changed
    $route(to, from) {
      if (from.name === 'home' && to.name === 'shop') [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['period-scale', 'out-in', '.5s'];
      else if (primaryRouteNames.includes(from.name) && primaryRouteNames.includes(to.name)) {
        if (primaryRouteNames.indexOf(from.name) > primaryRouteNames.indexOf(to.name)) { // Going up
          [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['slide-downwards', '', '0s'];
        } else { // Going down
          [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['slide-upwards', '', '.25s'];
        }
      } else {
        [this.transitionName, this.transitionMode, this.navTransitionDelay] = ['', '.5s'];
      }
    },
  },

  methods: {
    onWheel(e) {
      if (Math.abs(e.deltaY) > 15 && new Date() - this.lastScrollNav > 650) {
        this.$refs.nav[e.deltaY > 0 ? 'navDown' : 'navUp']();
        this.lastScrollNav = new Date();
      }
    },
  },
});
