/* eslint-disable import/first */
import Vue from 'vue';


// VueAnalytics for Google Analytics
import VueAnalytics from 'vue-analytics';
Vue.use(VueAnalytics, {
  id: 'UA-122351714-1',
  router: require('./router').default,
  ecommerce: { enabled: true, enhanced: true },
});


// Tippy for nice tooltips
import VueTippy from 'vue-tippy';
Vue.use(VueTippy, {
  // Bound popper.js elements to the viewport instead of the default behavior of the scroll parent
  popperOptions: { modifiers: { preventOverflow: { boundariesElement: 'viewport' } } },
});
