

export default {
  props: {
    name: { type: String, required: true }, // ex: "paypal"
    svg: { type: String, required: true },
    text: { type: String, default: '' },
    selectedName: String,
  },

  computed: {
    contents() {
      // eslint-disable-next-line import/no-dynamic-require
      const { svg } = this;
      const text = this.text ? ` <span>${this.text}</span>` : '';
      return svg + text;
    },
  },
};
