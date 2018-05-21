export default {
  props: {
    value: String, // For compatibility with v-model
    title: String,
    required: Boolean,
    rows: Number,
  },
  data: () => ({
    invalid: false,
  }),
};
