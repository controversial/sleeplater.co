export default {
  props: ['num-items'],
  data: () => ({ position: 1 }),

  computed: {
    canGoLeft() { return this.position > 1; },
    canGoRight() { return this.position < this.numItems; },

    leftNum() { return this.position - 1; },
    centerNum() { return this.position; },
    rightNum() { return this.position + 1; },
  },
};
