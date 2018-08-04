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
        .map(p => p.category) // get category
        .filter((n, i, list) => list.indexOf(n) === i); // Remove duplicates
    },
    category() { return this.$route.params.category || this.categories[0]; },
    optionsOpen: {
      get() { return !!this.$route.params.productSlug; },
      set(value) { if (!value) { this.$router.push(`/${this.category === this.categories[0] ? '' : this.category}`); } },
    },
  },
  methods: {
    openProduct(slug) {
      this.$router.push(`/${this.category}/product/${slug}`);
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
