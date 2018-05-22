<template>
  <div class="page">
    <loader a="sleep" b="later" v-bind:split="this.split"
            ref="loader"
            v-on:completed="completed"
    ></loader>
  </div>
</template>

<script>
import { delay } from '../../helpers';

export default {
  computed: {
    split() { return this.$store.state.loaded; },
  },
  methods: {
    async completed() {
      await delay(333);
      this.$store.commit('loaded');
    },
  },
  mounted() {
    setTimeout(() => { this.$refs.loader.progress = 1; }, 500);
  },
};
</script>

<style scoped lang="sass">
@import ../../colors

.main-loader
  position: absolute
  top: 50%
  left: 50vw
  transform: translate(-50%, -50%)

.page
  background: $dark-1
  color: $actually-white
</style>
