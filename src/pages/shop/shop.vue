<template>
  <div class="page">
    <h1 class="bg-title fade-in">sleep later</h1>
    <products-display></products-display>
    <cart-button v-bind:items-count="2"></cart-button>
    <cart></cart>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
