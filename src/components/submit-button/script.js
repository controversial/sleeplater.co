export default {
  props: ['disabled'],

  data: () => ({
    state: 'static', // static, loading, completed, failed
  }),
};
