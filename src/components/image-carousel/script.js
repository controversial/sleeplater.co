import { clamp, delay } from '../../helpers';

export default {
  props: {
    images: Array,
    value: Number,
    fullwidth: Boolean, /* in "full width" mode images are sized by container height and it is
                         * assumed that the carousel spans the whole width of the window */
  },

  data: () => ({
    changing: false,
    hasChanged: false,
    selectedImage: '',
    modalDisplayed: false,
  }),

  methods: {
    imageStyle(i) {
      const transform = this.fullwidth
        // "full width" mode
        ? `translateX(calc(-50% + (100vw * ${i - this.value})))`
        // desktop layout
        : `translateY(-50%) translate(calc((100% + 7vh) * ${i - this.value}))`;

      return {
        transform,
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
