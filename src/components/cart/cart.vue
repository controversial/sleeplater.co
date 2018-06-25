<template>
  <div class="cart" v-bind:class="{ hidden }">
    <div class="contents">
      <close-icon v-on:click="$emit('close')"></close-icon>
      <h1>Cart</h1>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
