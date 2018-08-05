export default {
  props: {
    value: String, // For compatibility with v-model
    options: Array,
    title: String,
    required: Boolean,
    showValidation: Boolean,
  },

  computed: {
    valid() { return !this.required && this.value.length; },
  },
};
