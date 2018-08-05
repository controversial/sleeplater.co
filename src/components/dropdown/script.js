export default {
  props: {
    value: String, // For compatibility with v-model
    options: Array,
    defaultOption: String,
    title: String,
    required: Boolean,
    showValidation: Boolean,
  },

  computed: {
    valid() { return !(this.required && !this.value.length); },
    selectionValue: {
      set(val) { this.$emit('input', val); },
      get() { return this.value; },
    },
  },
};
