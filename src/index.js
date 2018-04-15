/* eslint-disable import/first */
import './index.html';
import './main.sass';

import './components';

import Vue from 'vue';


window.app = new Vue({
  el: '#app',

  mounted() {
    setTimeout(() => { this.$refs.loader.progress = 1; }, 500);
  },
});
