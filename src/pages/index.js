export default [
  {
    name: 'home',
    path: '/',
    component: require('./home/home.vue').default,
    meta: { navIconColor: 'white' },
  },
  {
    name: 'shop',
    path: '/shop',
    component: require('./shop/shop.vue').default,
    meta: { navIconColor: 'black' },
  },
];
