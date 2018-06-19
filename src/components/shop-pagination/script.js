export default {
  props: {
    'num-items': Number,
    value: { type: Number, default: 0 },
  },

  computed: {
    canGoLeft() { return this.value > 0; },
    canGoRight() { return this.value < this.numItems - 1; },

    leftVal() { return this.value - 1; },
    centerVal() { return this.value; },
    rightVal() { return this.value + 1; },
  },

  methods: {
    switch(value) {
      this.$emit('input', value);
    },
  },
};
