<template>
  <div class="page">
    <h1 class="bg-title fade-in">sleep later</h1>
    <div class="products">
      <shop-item v-for="product in products" v-bind="product" v-bind:key="product.id"></shop-item>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
