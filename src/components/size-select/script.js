export default {
  props: {
    sizes: Array,
    value: String, // the selected size
    // When this updates, layout will be recomputed; used to overcome rendering errors caused by
    // 'display: none' which can result in incorrect values for highlight positioning
    displayed: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    allSizes: ['xs', 's', 'm', 'l', 'xl'],
    windowSize: [window.innerWidth, window.innerHeight],
    mounted: false,
  }),

  computed: {
    indicatorStyle() {
      // Trick Vue into recomputing on window resize and on "displayed" prop change
      (() => {})(this.windowSize, this.displayed);

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
