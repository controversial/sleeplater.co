/* eslint-disable import/first */
import Vue from 'vue';

import ColorSelect from './color-select/color-select.vue';
Vue.component('color-select', ColorSelect);
import SizeSelect from './size-select/size-select.vue';
Vue.component('size-select', SizeSelect);


export default {
  props: ['open', 'product'],
  data: () => ({
    selectedColor: undefined,
    selectedSize: undefined,
  }),
};
