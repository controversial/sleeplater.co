import { delay } from '../helpers';

export default {
  components: { 'loader-progress': require('./loader-progress/loader-progress.vue').default },

  data: () => ({ progress: 0, split: false }),

  async mounted() {
    setTimeout(() => { if (!this.$store.state.productsFetched) this.progress = 0.15; }, 250);
    setTimeout(() => { if (!this.$store.state.productsFetched) this.progress = 0.3; }, 800);

    // Products fetched
    if (!this.$store.state.productsFetched) {
      await new Promise((resolve) => {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'productsFetched') resolve();
        });
      });
    }
    this.progress = 0.75;

    // Preload main product images so that they're cached when we try to display them
    const increment = (1 - this.progress) / this.$store.state.products.length;
    this.$store.state.products
      .forEach((product) => {
        const img = new Image();
        img.onload = () => { this.progress += increment; };
        img.src = product.image;
      });
  },


  methods: {
    // Split open when filled
    async completed() {
      await delay(333);
      this.split = true;

      await delay(1250);
      this.$store.commit('loaded');
    },
  },
};
