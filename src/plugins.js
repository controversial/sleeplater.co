/* eslint-disable import/first */
import Vue from 'vue';

import VueTippy from 'vue-tippy';
Vue.use(VueTippy, {
  // Bound popper.js elements to the viewport instead of the default behavior of the scroll parent
  popperOptions: { modifiers: { preventOverflow: { boundariesElement: 'viewport' } } },
});
