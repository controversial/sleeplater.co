export default {
  props: {
    value: String, // For compatibility with v-model
    title: String,
    required: Boolean,
    type: String,
  },

  data: () => ({
    focused: false,
  }),

  methods: {
    checkInput(e) {
      if (this.type === 'tel' && Number.isNaN(parseInt(e.key, 10))) {
        e.preventDefault();
      }
    },
  },
};
