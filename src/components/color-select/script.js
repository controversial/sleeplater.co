import * as chroma from 'chroma-js';

export default {
  props: ['colors', 'value'], // value is the selected color
  computed: {
    checkColor() {
      return chroma(this.value).luminance() < 0.75
        ? '#ffffff'
        : '#444444';
    },
  },
};
