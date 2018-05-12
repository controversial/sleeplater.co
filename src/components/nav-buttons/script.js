import routes from '../../pages';

export default {
  props: ['color'],

  methods: {
    navUp() {
      console.log('up');
    },
    navDown() {
      console.log('down');
    },
  },
};
