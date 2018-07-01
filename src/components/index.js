/* eslint-disable import/first */
import Vue from 'vue';

// Feather icons
import {
  ChevronUpIcon,
  ChevronDownIcon,
  BarChartIcon,
  GridIcon,
  ShoppingCartIcon,
  XIcon,
  InstagramIcon,
  TwitterIcon,
  MailIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
} from 'vue-feather-icons';
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
Vue.component('check-icon', CheckIcon);
Vue.component('plus-icon', PlusIcon);
Vue.component('minus-icon', MinusIcon);


// Navigation

import NavButtons from './nav-buttons/nav-buttons.vue';
Vue.component('nav-buttons', NavButtons);

import MenuButton from './menu-button/menu-button.vue';
Vue.component('menu-button', MenuButton);

import SocialLinks from './social-links/social-links.vue';
Vue.component('social-links', SocialLinks);

// Loader

import Loader from './loader/loader.vue';
Vue.component('loader', Loader);


// Shop

import ShopItem from './shop-item/shop-item.vue';
Vue.component('shop-item', ShopItem);

import ShopPagination from './shop-pagination/shop-pagination.vue';
Vue.component('pagination', ShopPagination);

import CartButton from './cart-button/cart-button.vue';
Vue.component('cart-button', CartButton);

import Cart from './cart/cart.vue';
Vue.component('cart', Cart);

import ProductOptions from './product-options/product-options.vue';
Vue.component('product-options', ProductOptions);


// Contact

import TextInput from './text-input/text-input.vue';
Vue.component('text-input', TextInput);
import TextArea from './text-area/text-area.vue';
Vue.component('text-area', TextArea);

import SubmitButton from './submit-button/submit-button.vue';
Vue.component('submit-button', SubmitButton);

import Spinner from './spinner/spinner.vue';
Vue.component('spinner', Spinner);

import RadioOptions from './radio-options/radio-options.vue';
Vue.component('radio-options', RadioOptions);
