import Hammer from 'hammerjs';
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
    swiping: false,
    modalDisplayed: false,
    offset: 0,
  }),

  computed: {
    selectedImage() {
      return this.images[this.value];
    },
  },

  methods: {
    imageStyle(i) {
      const transform = this.fullwidth
        // "full width" mode
        ? `translateX(calc(-50% + (100vw * ${i - this.value}) + ${this.offset}px))`
        // desktop layout
        : `translateY(-50%) translate(calc((100% + 7vh) * ${i - this.value}))`;

      return {
        transform,
        ...(this.changing ? { display: 'none' } : {}),
        ...((this.swiping || this.changing || this.modalDisplayed) ? { transitionDuration: '0s' } : {}),
      };
    },
    change(i) { this.$emit('input', clamp(i, 0, this.images.length - 1)); },
    left() { this.change(this.value - 1); },
    right() { this.change(this.value + 1); },

    pan(e) {
      this.offset = e.deltaX;
    },
    panstart() { this.swiping = true; },
    panend(e) {
      this.swiping = false;
      this.offset = 0;
      const direction = {
        [Hammer.DIRECTION_LEFT]: 'right', // Swipe left, go right
        [Hammer.DIRECTION_RIGHT]: 'left',
      }[e.direction];
      if (
        Math.abs(e.velocityX) > 0.1 // Smaller faster swipe
        || e.distance > window.innerWidth / 4 // Big swipe
      ) {
        if (this[direction]) this[direction]();
      }
    },
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
