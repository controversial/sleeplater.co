<template>
  <div class="shop-item" v-bind:style="{ transform }">
    <img v-bind:src="image" alt="Product preview">
    <div class="info">
      <div class="title">{{name}}</div>
      <div class="price">{{formattedPrice}}</div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
