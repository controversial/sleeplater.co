import Vue from 'vue';

const obj = product => ({
  id: product.slug,
  name: product.name,
  brand: product.category.split(':')[1], // undefined if no colon
  category: product.category,
  price: product.price,
});

export default new Vue({
  methods: {
    // Should be called whenever a product becomes visible. Logs a product "impression"
    productVisible(product) {
      const o = obj(product);
      this.$ga.ecommerce.addImpression(o);
    },

    // Should be called whenever a product is clicked on
    productClicked(product) {
      const o = obj(product);
      this.$ga.ecommerce.addProduct(o);
      this.$ga.ecommerce.setAction('detail');
    },

    addToCart(product) {
      const o = obj(product);
      this.$ga.ecommerce.addProduct(o);
      this.$ga.ecommerce.setAction('add');
      this.$ga.event('UX', 'click');
    },

    // Register a page view. Only call for routes where auto tracking has been disabled
    pageView($route) {
      this.$ga.page($route.path);
    },
  },
});
