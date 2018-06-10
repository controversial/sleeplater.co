export default {
  props: ['id', 'name', 'status', 'description', 'price', 'image', 'options'],
  computed: {
    formattedPrice() {
      const num = parseFloat(this.price);
      if (Math.floor(num) === num) return `$${num}`;
      return `$${num.toFixed(2)}`;
    },
  },
};
