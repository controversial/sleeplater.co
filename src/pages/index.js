import store from '../store';

export default [
  // Appears below shop in the actual site but has to be listed first so that it matches first
  {
    name: 'contact',
    path: '/contact',
    component: require('./contact/contact.vue').default,
    meta: { primary: 2, navIconColor: 'white', title: 'sleep later – contact' },
  },

  {
    name: 'shop',
    path: '/:category?',
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
          allowScrollNav: false,
        },
      },
    ],
    meta: {
      primary: 1, title: 'sleep later – shop', navIconColor: 'black', allowScrollNav: false,
    },
  },
];
