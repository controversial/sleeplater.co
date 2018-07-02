export default {
  props: ['sizes', 'value'], // value is the selected size
  data: () => ({
    allSizes: ['xs', 's', 'm', 'l', 'xl'],
    windowSize: [window.innerWidth, window.innerHeight],
    mounted: false,
  }),

  computed: {
    indicatorStyle() {
      (() => {})(this.windowSize); // Trick Vue into recomputing on window resize

      const v = this.value || this.allSizes[0];
      const highlighted = this.$refs[v][0];
      const a = this.$refs.container.getBoundingClientRect();
      const b = highlighted.getBoundingClientRect();
      return {
        top: `${(b.top + (b.height / 2)) - a.top}px`,
        left: `${(b.left + (b.width / 2)) - a.left}px`,
      };
    },
  },

  // Reactive window size to force indicatorStyle to update on resize
  methods: {
    resized() { this.windowSize = [window.innerWidth, window.innerHeight]; },
  },
  mounted() { window.addEventListener('resize', this.resized); this.mounted = true; },
  destroyed() { window.removeEventListener('resize', this.resized); this.$emit('reset'); this.mounted = false; },
};
