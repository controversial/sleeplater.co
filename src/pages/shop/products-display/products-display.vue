<template>
  <div class="products" v-on:wheel="scrollHandler">
    <shop-item
      v-for="(product, i) in categoryProducts" v-bind="product" v-bind:offset-x="getXOffset(i)"
      v-bind:key="product.id"></shop-item>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
