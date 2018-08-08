import { delay } from '../helpers';

export default {
  components: { 'loader-progress': require('./loader-progress/loader-progress.vue').default },

  data: () => ({ progress: 0, split: false }),

  async mounted() {
    await delay(400);

    // Font loading
    if (document.fonts) document.fonts.ready.then(() => { this.progress += 0.1; });
    else { this.progress += 0.1; }

    // Products fetched
    if (!this.$store.state.productsFetched) {
      await new Promise((resolve) => {
        this.$store.subscribe((mutation) => {
          if (mutation.type === 'productsFetched') resolve();
        });
      });
    }
    this.progress += 0.65;

    // Preload main product images so that they're cached when we try to display them
    const increment = 0.25 / this.$store.state.products.length;
    this.$store.state.products
      .forEach((product) => {
        const img = new Image();
        img.onload = () => {
          this.progress = Math.ceil((this.progress + increment) * 100) / 100;
        };
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
