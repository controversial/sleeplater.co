export default {
  props: ['images', 'value'],

  methods: {
    imageStyle(i) {
      return {
        transform: `translateY(-50%) translate(calc((100% + 7vh) * ${i - this.value}))`,
      };
    },
  },
};
