<template>
  <div class="page" v-on:click="closeAll">
    <products-display
      v-bind:interactable="!(optionsOpen || cartOpen)"
      v-on:productClick="openProduct($event)"
    ></products-display>
    <router-view></router-view>
    <cart-button v-bind:items-count="itemsCount" v-on:click.native="openCart"></cart-button>
    <cart v-bind:hidden="!cartOpen" v-on:close="cartOpen = false"></cart>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
