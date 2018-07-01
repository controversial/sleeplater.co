import Vue from 'vue';

import ColorSelect from './color-select/color-select.vue';
Vue.component('color-select', ColorSelect);


export default {
  props: ['open', 'product'],
  data: () => ({ selectedColor: undefined }),
};
