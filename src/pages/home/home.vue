<template>
  <div class="page">
    <loader a="sleep" b="later" ref="loader"></loader>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => { this.$refs.loader.progress = 1; }, 500);
  },
};
</script>

<style scoped lang="sass">
.main-loader
  position: absolute
  top: 50vh
  left: 50vw
  transform: translate(-50%, -50%)
</style>
