<template>
  <div class="cart-item-options">

    <color-select
      v-if="product.options.colors.length"
      v-bind:colors="product.options.colors"
      v-model="selectedColor"
    ></color-select>

    <size-select
      v-if="product.options.sizes.length"
      v-bind:sizes="product.options.sizes"
      v-model="selectedSize"
      v-bind:displayed="displayed"
    ></size-select>

    <cart-update-bar
      v-on:click="update"
      v-bind:buttonDisabled="false"
      v-model="selectedQuantity"
    >{{ buttonMessage }}</cart-update-bar>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
