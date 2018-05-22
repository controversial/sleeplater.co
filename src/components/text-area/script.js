export default {
  props: {
    value: String, // For compatibility with v-model
    title: String,
    required: Boolean,
    rows: Number,
    showValidation: Boolean,
  },

  computed: {
    valid() {
      // When the input is empty, it's automatically valid if it's not required but invalid if it is
      if (!this.value.length) return !this.required;
      // No other validation rules
      return true;
    },
  },
};
