export default {
  props: [
    // Item info
    'id', 'name', 'status', 'description', 'price', 'image', 'options',

    'offsetX',
  ],
  computed: {
    formattedPrice() {
      const num = parseFloat(this.price);
      if (Math.floor(num) === num) return `$${num}`;
      return `$${num.toFixed(2)}`;
    },

    transform() {
      return `translate(-50%, -50%) translateX(${this.offsetX || 0})`;
    },
  },
};
