export default [
  {
    name: 'home',
    path: '/',
    component: require('./home/home.vue').default,
    meta: { primary: true, navIconColor: 'white' },
  },
  {
    name: 'shop',
    path: '/shop',
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
