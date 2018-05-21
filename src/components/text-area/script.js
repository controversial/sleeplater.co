export default {
  props: {
    value: String, // For compatibility with v-model
    title: String,
    required: Boolean,
    rows: Number,
    shouldValidate: Boolean,
  },

  computed: {
    valid() {
      if (!this.shouldValidate) return true;

      // When the input is empty, it's automatically valid if it's not required but invalid if it is
      if (!this.value.length) return !this.required;
      // No other validation rules
      return true;
    },
  },
};
