/* eslint-disable import/first */
import Vue from 'vue';
import ProductsDisplay from './products-display/products-display.vue';
Vue.component('products-display', ProductsDisplay);
import analytics from '../../analytics';


export default {
  data: () => ({
    cartOpen: false,
  }),
  computed: {
    itemsCount() {
      return this.$store.state.cart
        .map(item => item.quantity)
        .reduce((a, b) => a + b, 0);
    },
    categories() {
      return this.$store.state.products
        .map(p => p.categories) // get categories
        .reduce((a, b) => a.concat(b), []) // flatten
        .filter((n, i, list) => list.indexOf(n) === i); // Remove duplicates
    },
    category() { return this.$route.params.category || this.categories[0]; },
    optionsOpen: {
      get() { return !!this.$route.params.productId; },
      set(value) { if (!value) { this.$router.push(`/${this.category === this.categories[0] ? '' : this.category}`); } },
    },
  },
  methods: {
    openProduct(id) {
      // Appending a slug to the end of the URL doesn't actually change anything but it makes the
      // URL nicer and I think does something for SEO too
      const slug = this.$store.state.products
        .find(p => p.id === id)
        .name
        .toLowerCase()
        .replace(/\s/g, '-')
        .replace(/[^[A-Za-z0-9-]/g, ''); // Remove non-alphanumeric/hyphen characters
      this.$router.push(`/${this.category}/product/${id}/${slug}`);
    },
    openCart() {
      this.optionsOpen = false;
      this.cartOpen = true;
    },
    closeAll(e) {
      if (e.target === this.$el) {
        this.cartOpen = false;
        this.optionsOpen = false;
      }
    },
  },
  watch: {
    optionsOpen(val) {
      this.$store.commit(val ? 'hideNavButtons' : 'showNavButtons');
      if (!val) analytics.pageView(this.$route);
    },
  },
  beforeMount() {
    this.$store.commit(this.optionsOpen ? 'hideNavButtons' : 'showNavButtons');
  },
};
