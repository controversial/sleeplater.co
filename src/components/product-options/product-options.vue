<template>
  <div class="modal" v-if="open">
    <div class="left">
      <img v-bind:src="product.image" alt="Product preview">
    </div>
    <div class="right">
      <h1>{{ product.name }}&nbsp;<span class="price">${{ product.price }}</span></h1>
      <div class="description">{{ product.description }} </div>
      <color-select v-if="product.options.colors.length" v-bind:colors="product.options.colors" v-model="selectedColor"></color-select>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
