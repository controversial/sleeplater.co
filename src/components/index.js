/* eslint-disable import/first */
import Vue from 'vue';

// Feather icons
import { ChevronUpIcon, ChevronDownIcon, BarChartIcon, GridIcon, ShoppingCartIcon, XIcon, InstagramIcon, TwitterIcon, MailIcon, CheckCircleIcon, AlertCircleIcon } from 'vue-feather-icons';
Vue.component('chevron-up-icon', ChevronUpIcon);
Vue.component('chevron-down-icon', ChevronDownIcon);
Vue.component('menu-icon', BarChartIcon); // Goes sideways
Vue.component('grid-icon', GridIcon);
Vue.component('shopping-cart-icon', ShoppingCartIcon);
Vue.component('close-icon', XIcon);
Vue.component('instagram-icon', InstagramIcon);
Vue.component('twitter-icon', TwitterIcon);
Vue.component('mail-icon', MailIcon);
Vue.component('check-circle-icon', CheckCircleIcon);
Vue.component('alert-circle-icon', AlertCircleIcon);

import Loader from './loader/loader.vue';
Vue.component('loader', Loader);

import NavButtons from './nav-buttons/nav-buttons.vue';
Vue.component('nav-buttons', NavButtons);

import TextInput from './text-input/text-input.vue';
Vue.component('text-input', TextInput);
import TextArea from './text-area/text-area.vue';
Vue.component('text-area', TextArea);

import SubmitButton from './submit-button/submit-button.vue';
Vue.component('submit-button', SubmitButton);
