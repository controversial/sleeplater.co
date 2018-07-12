<template>
  <div class="cart-item-options">
    <color-select v-bind:colors="product.options.colors" v-model="selectedColor"></color-select>
    <size-select v-bind:sizes="product.options.sizes" v-model="selectedSize" v-bind:displayed="displayed"></size-select>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
