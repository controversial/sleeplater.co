import { delay } from '../../helpers';

export default {
  props: ['a', 'b', 'progress', 'split'],

  computed: {
    mergedText() {
      const a = [...this.a];
      const b = [...this.b];
      return a.reduce((arr, char, i) => arr.concat([a[i], b[i]]), []);
    },
  },

  watch: {
    async progress(newval, oldval) {
      const [newp, oldp] = [newval, oldval]
        .map(val => Math.min(Math.max(0, val), 1)); // Clamp to [0, 1]
      const fillTime = Math.sqrt(Math.abs(newp - oldp)) * 1.5;
      this.$refs.fill[0].style.transitionDuration = `${fillTime}s`;
      this.$refs.fill[0].style.width = `${newp * 100}%`;
      if (newp === 1) {
        // Emit an event after the progress fills completely
        await delay(fillTime * 1000);
        this.$emit('completed');
      }
    },
    async split() {
      // Emit an event after split animation is finished
      const splitTime = (Math.floor((this.mergedText.length - 1) / 2) / 20) + 0.5;
      await delay(splitTime * 1000);
      this.$emit('split');
    },
  },

  mounted() {
    [this.$refs.track[0], this.$refs.fill[0]].map(n => n.firstChild).forEach((elem) => {
      // Kerning adjustment
      // Tries to find a balance between letters looking properly-kerned while collapsed and letters
      // looking properly-kerned while expanded. Moves the width of each letter closer to the
      // average width of all letters by a specified amount (0 has no effect, 1 has complete effect)
      const spans = [...elem.children];
      const letterWidths = spans.map(span => span.offsetWidth);
      const averageWidth = letterWidths.reduce((a, b) => a + b) / letterWidths.length;
      const amount = 0.5;
      spans.forEach((span) => {
        const adjustedWidth = (span.offsetWidth * (1 - amount)) + (averageWidth * amount);
        span.style.width = `${adjustedWidth / parseFloat(getComputedStyle(elem).fontSize)}em`;
      });
    });
  },
};
