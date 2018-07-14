import store from '../store';

export default [
  {
    name: 'home',
    path: '/',
    component: require('./home/home.vue').default,
    meta: { primary: true, title: 'sleep later', navIconColor: 'white' },
  },
  // When navigating to /shop, go to the category most recently visited
  { path: '/shop', redirect: () => `/shop/${store.state.shopCategory}` },
  {
    name: 'shop',
    path: '/shop/:category',
    component: require('./shop/shop.vue').default,
    children: [
      {
        name: 'product',
        path: 'product/:productId/:slug?',
        component: require('../components/product-options/product-options.vue').default,
        props: true,
        meta: {
          title(route) {
            const product = store.state.products.find(p => p.id === route.params.productId);
            return product ? `sleep later – ${product.name}` : 'sleep later';
          },
        },
      },
    ],
    meta: {
      primary: true, title: 'sleep later – shop', navIconColor: 'black', allowScrollNav: false,
    },
  },
  {
    name: 'contact',
    path: '/contact',
    component: require('./contact/contact.vue').default,
    meta: { primary: true, navIconColor: 'white', title: 'sleep later – contact' },
  },
];
