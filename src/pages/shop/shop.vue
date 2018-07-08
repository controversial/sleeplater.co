<template>
  <div class="page" v-on:click="closeAll">
    <products-display
      v-bind:interactable="!(optionsOpen || cartOpen)"
      v-on:productClick="currentProduct = $event; optionsOpen = true;"
    ></products-display>
    <product-options v-if="optionsOpen" v-bind:product-id="currentProduct.id"></product-options>
    <cart-button v-bind:items-count="itemsCount" v-on:click.native="cartOpen = true"></cart-button>
    <cart v-bind:hidden="!cartOpen" v-on:close="cartOpen = false"></cart>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
