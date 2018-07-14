import Vue from 'vue';

const obj = product => ({
  id: product.id,
  name: product.name,
  brand: product.categories[0].split(':')[1], // undefined if no colon
  category: product.categories[0],
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
  },
});
