<template>
  <div class="image-carousel">
    <div class="images-container">
      <img
        v-for="(url, i) in images"
        v-bind:style="imageStyle(i)"
        v-bind:src="url"
        alt="Product images"
        v-on:click="selectedImage = url; modalDisplayed = true;"
      >
      <div class="image-missing" v-if="!images.length">No image</div>
    </div>
    <div class="pagination">
      <div
        class="dot"
        v-for="(_, i) in images"
        v-on:click="change(i)"
        v-bind:class="{ selected: value === i }"
      ></div>
    </div>
    <image-modal v-bind:image="selectedImage" v-bind:displayed="modalDisplayed" v-on:close="modalDisplayed = false;"></image-modal>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
