<template>
  <div class="image-carousel">
    <img v-for="url in images" v-bind:src="url" alt="Product images">
    <div class="image-missing" v-if="!images.length">No image</div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
