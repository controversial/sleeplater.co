/* eslint-disable import/first */
import './index.html';
import './main.sass';

import './components';
import router from './router';

import Vue from 'vue';

import routes from './pages';
const primaryRoutes = routes.filter(route => route.meta.primary);
const primaryRouteNames = primaryRoutes.map(route => route.name);

window.app = new Vue({
  el: '#app',
  router,

  data: {
    transitionName: '',
    transitionMode: '',
  },

  computed: {
    navIconColor() {
      return this.$route.meta.navIconColor;
    },
  },

  watch: {
    // Vue route changed
    $route(to, from) {
      if (from.name === 'home' && to.name === 'shop') [this.transitionName, this.transitionMode] = ['period-scale', 'out-in'];
      else if (primaryRouteNames.includes(from.name) && primaryRouteNames.includes(to.name)) {
        if (primaryRouteNames.indexOf(from.name) > primaryRouteNames.indexOf(to.name)) { // Going up
          [this.transitionName, this.transitionMode] = ['slide-downwards', ''];
        } else { // Going down
          [this.transitionName, this.transitionMode] = ['slide-upwards', ''];
        }
      } else {
        [this.transitionName, this.transitionMode] = ['', ''];
      }
      console.log(this.transitionName);
    },
  },
});
