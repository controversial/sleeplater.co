import store from '../store';

export default [
  {
    name: 'home',
    path: '/',
    component: require('./home/home.vue').default,
    meta: { primary: true, navIconColor: 'white' },
  },
  // When navigating to /shop, go to the category most recently visited
  { path: '/shop', redirect: () => `/shop/${store.state.shopCategory}` },
  {
    name: 'shop',
    path: '/shop/:category',
    component: require('./shop/shop.vue').default,
    meta: { primary: true, navIconColor: 'black', allowScrollNav: false },
  },
  {
    name: 'contact',
    path: '/contact',
    component: require('./contact/contact.vue').default,
    meta: { primary: true, navIconColor: 'white' },
  },
];
