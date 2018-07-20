<template>
  <div v-bind:class="{ 'image-modal': true, displayed }">
    <div class="image"
      alt="Product preview"
      v-bind:style="{ backgroundImage: `url(${image})` }"
      v-on:click="$emit('close')"
    ></div>
    <div class="darken" v-on:click="$emit('close')"></div>
  </div>
</template>

<script>
export default {
  props: ['image', 'displayed'],
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
