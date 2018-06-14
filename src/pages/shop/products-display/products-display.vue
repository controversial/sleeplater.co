<template>
  <div class="products">
    <shop-item
      v-for="product in categoryProducts" v-bind="product"
      v-bind:key="product.id"></shop-item>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
