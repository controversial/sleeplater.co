<template>
  <div class="page">
    <loader
      a="sleep" b="later"
      id="main-loader" ref="loader"
    ></loader>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => { this.$refs.loader.progress = 1; }, 500);
  },
};
</script>
