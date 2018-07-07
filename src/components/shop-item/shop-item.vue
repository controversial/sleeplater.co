<template>
  <div class="shop-item" v-bind:style="{ transform }">
    <div class="transform-wrapper">
      <img v-bind:src="image" alt="Product preview">
      <div class="info">
        <div class="title"><span>{{name}}</span></div>
        <div class="price"><span>{{formattedPrice}}</span></div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
