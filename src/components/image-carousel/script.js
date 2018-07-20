import { clamp, delay } from '../../helpers';

export default {
  props: ['images', 'value'],

  data: () => ({ changing: false, hasChanged: false }),

  methods: {
    imageStyle(i) {
      return {
        transform: `translateY(-50%) translate(calc((100% + 7vh) * ${i - this.value}))`,
        ...(this.changing ? { transitionDuration: '0s', display: 'none' } : {}),
      };
    },
    change(i) { this.$emit('input', clamp(i, 0, this.images.length - 1)); },
    left() { this.change(this.value - 1); },
    right() { this.change(this.value + 1); },
  },

  watch: {
    async images() {
      if (this.images.length) {
        if (!this.hasChanged) { this.hasChanged = true; return; }
        this.changing = true;
        this.change(0);
        await delay(15);
        this.changing = false;
      }
    },
  },
};
