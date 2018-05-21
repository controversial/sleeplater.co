export default {
  props: {
    options: Array,
    value: String,
  },
  data: () => ({ selection: undefined }),
  watch: {
    value(v) { this.selection = v; },
  },
};
