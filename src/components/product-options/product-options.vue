<template>
  <transition name="fade">
    <div class="product-options wrapper" v-if="$store.state.productsFetched">
      <div class="modal">
        <div class="left">
          <image-carousel v-bind:images="product.images[selectedColor] || []" v-model="carouselIndex"></image-carousel>
        </div>
        <div class="right">
          <h1>{{ product.name }}&nbsp;<span class="price">${{ formatPrice(product.price, true) }}</span></h1>
          <div class="description">{{ product.description }} </div>
          <color-select v-if="product.options.colors.length" v-bind:colors="product.options.colors" v-model="selectedColor"></color-select>
          <size-select v-if="product.options.sizes.length" v-bind:sizes="soldOut ? [] : product.options.sizes" v-model="selectedSize"></size-select>

          <cart-update-bar
            v-on:click="addToCart"
            v-bind:buttonDisabled="buttonDisabled"
            v-model="selectedQuantity"
          >{{ buttonMessage }}</cart-update-bar>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
