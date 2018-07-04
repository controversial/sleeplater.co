<template>
  <div class="modal">
    <div class="left">
      <img v-bind:src="product.image" alt="Product preview">
    </div>
    <div class="right">
      <h1>{{ product.name }}&nbsp;<span class="price">${{ product.price }}</span></h1>
      <div class="description">{{ product.description }} </div>
      <color-select v-if="product.options.colors.length" v-bind:colors="product.options.colors" v-model="selectedColor"></color-select>
      <size-select v-if="product.options.sizes.length" v-bind:sizes="product.options.sizes" v-model="selectedSize"></size-select>

      <div class="bottom-bar" v-bind:class="{ active: buttonActive, disabled: buttonDisabled }">
        <div class="submit"
          v-on:click="() => { if (!buttonDisabled) addToCart(); }"
          v-on:mousedown="buttonActive = true"
          v-on:mouseup="buttonActive = false"
        >{{ buttonMessage }}</div>
        <quantity-select v-model="selectedQuantity"></quantity-select>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
