export default {
  props: {
    options: Array,
  },
  data: () => ({
    selection: undefined,
  }),
  // Select first option by default
  mounted() { this.selection = this.options[0]; }, // eslint-disable-line prefer-destructuring
};
