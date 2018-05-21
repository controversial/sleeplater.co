import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';

export default {
  props: {
    value: String, // For compatibility with v-model
    title: String,
    required: Boolean,
    type: String,
    shouldValidate: Boolean,
  },

  data: () => ({
    focused: false,
  }),

  computed: {
    valid() {
      if (!this.shouldValidate) return true;

      // When the input is empty, it's automatically valid if it's not required but invalid if it is
      if (!this.value.length) return !this.required;
      // If the form has content...
      if (this.type === 'email') return isEmail(this.value);
      if (this.type === 'tel') return isNumeric(this.value) && (this.value.length >= 10 && this.value <= 12);
      return true;
    },
  },

  methods: {
    // Prevent typing non-numeric characters in "tel" inputs
    checkInput(e) {
      if (this.type === 'tel' && Number.isNaN(parseInt(e.key, 10))) {
        e.preventDefault();
      }
    },
  },
};
