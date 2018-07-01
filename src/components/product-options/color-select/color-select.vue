<template>
  <div class="colors">
    <div class="color" v-for="color in colors" v-bind:style="{ background: color }"></div>
  </div>
</template>

<script>
export default {
  props: ['colors'],
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
