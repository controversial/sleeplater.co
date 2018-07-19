import { clamp } from '../../helpers';

export default {
  props: ['images', 'value'],

  methods: {
    imageStyle(i) {
      return {
        transform: `translateY(-50%) translate(calc((100% + 7vh) * ${i - this.value}))`,
      };
    },
    change(i) { this.$emit('input', clamp(i, 0, this.images.length - 1)); },
    left() { this.change(this.value - 1); },
    right() { this.change(this.value + 1); },
  },
};
