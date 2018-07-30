/* eslint-disable import/first */
import Vue from 'vue';

// Feather icons
import {
  AlertCircleIcon,
  BarChartIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  GridIcon,
  InstagramIcon,
  MailIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  TwitterIcon,
  XIcon,
} from 'vue-feather-icons';
Vue.component('alert-circle-icon', AlertCircleIcon);
Vue.component('menu-icon', BarChartIcon); // Goes sideways
Vue.component('check-circle-icon', CheckCircleIcon);
Vue.component('check-icon', CheckIcon);
Vue.component('chevron-down-icon', ChevronDownIcon);
Vue.component('chevron-up-icon', ChevronUpIcon);
Vue.component('grid-icon', GridIcon);
Vue.component('instagram-icon', InstagramIcon);
Vue.component('mail-icon', MailIcon);
Vue.component('minus-icon', MinusIcon);
Vue.component('plus-icon', PlusIcon);
Vue.component('shopping-cart-icon', ShoppingCartIcon);
Vue.component('twitter-icon', TwitterIcon);
Vue.component('close-icon', XIcon);
Vue.component('x-icon', XIcon);


// Navigation

import NavButtons from './nav-buttons/nav-buttons.vue';
Vue.component('nav-buttons', NavButtons);

import MenuButton from './menu-button/menu-button.vue';
Vue.component('menu-button', MenuButton);

import SocialLinks from './social-links/social-links.vue';
Vue.component('social-links', SocialLinks);


// Shop

import ShopItem from './shop-item/shop-item.vue';
Vue.component('shop-item', ShopItem);

import ShopPagination from './shop-pagination/shop-pagination.vue';
Vue.component('pagination', ShopPagination);

import CartButton from './cart-button/cart-button.vue';
Vue.component('cart-button', CartButton);

import Cart from './cart/cart.vue';
Vue.component('cart', Cart);

import CartItemOptions from './cart/cart-item-options/cart-item-options.vue';
Vue.component('cart-item-options', CartItemOptions);

import ProductOptions from './product-options/product-options.vue';
Vue.component('product-options', ProductOptions);

import ImageCarousel from './image-carousel/image-carousel.vue';
Vue.component('image-carousel', ImageCarousel);

import ImageModal from './image-modal/image-modal.vue';
Vue.component('image-modal', ImageModal);

import ColorSelect from './color-select/color-select.vue';
Vue.component('color-select', ColorSelect);

import SizeSelect from './size-select/size-select.vue';
Vue.component('size-select', SizeSelect);

import QuantitySelect from './quantity-select/quantity-select.vue';
Vue.component('quantity-select', QuantitySelect);

import CartUpdateBar from './cart-update-bar/cart-update-bar.vue';
Vue.component('cart-update-bar', CartUpdateBar);


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
