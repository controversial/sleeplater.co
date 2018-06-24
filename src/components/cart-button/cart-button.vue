<template>
  <div class="cart-button fade-in">
    <shopping-cart-icon></shopping-cart-icon>
    <div class="badge" v-if="itemsCount"><span>{{itemsCount}}</span></div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
