<template>
  <div class="cart-item-options">

    <color-select
      v-bind:colors="colors"
      v-model="selectedColor"
    ></color-select>

    <size-select
      v-bind:sizes="availableSizesForColor"
      v-model="selectedSize"
      v-bind:displayed="displayed"
    ></size-select>

    <cart-update-bar
      v-on:click="update"
      v-bind:button-disabled="!selectedSize || buttonMessage === 'Up to date'"
      v-bind:max-quantity="optionQuantity"
      v-model="selectedQuantity"
    >{{ buttonMessage }}</cart-update-bar>

    <div class="remove" v-on:click="remove">Remove</div>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
