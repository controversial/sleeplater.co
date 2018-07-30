import { delay } from '../helpers';

export default {
  components: { 'loader-progress': require('./loader-progress/loader-progress.vue').default },

  data: () => ({ progress: 0, split: false }),

  async mounted() {
    await delay(1500);
    this.progress = 1;
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
