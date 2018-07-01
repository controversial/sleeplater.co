<template>
  <div class="modal" v-if="open">
    <div class="left">
      <img v-bind:src="product.image" alt="Product preview">
    </div>
    <div class="right">
      <h1>{{ product.name }}&nbsp;<span class="price">${{ product.price }}</span></h1>
      <div class="description">{{ product.description }} </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
