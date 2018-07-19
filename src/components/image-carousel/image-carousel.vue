<template>
  <div class="image-carousel">
    <div class="images-container">
      <img v-for="(url, i) in images" v-bind:style="imageStyle(i)" v-bind:src="url" alt="Product images">
      <div class="image-missing" v-if="!images.length">No image</div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
