<template>
  <transition name="fade">
    <div class="product-options wrapper" v-if="$store.state.productsFetched">
      <div class="modal">
        <div class="left">
          <image-carousel
            v-bind:images="product.images[selectedColor] || []"
            v-bind:fullwidth="mobile"
            v-model="carouselIndex"
          ></image-carousel>
        </div>
        <div class="right">
          <h1>{{ product.name }}&nbsp;<span class="price">${{ formatPrice(product.price, true) }}</span></h1>
          <div class="description">{{ product.description }} </div>
          <color-select v-bind:colors="colors" v-model="selectedColor"></color-select>
          <size-select v-bind:sizes="availableSizesForColor" v-model="selectedSize"></size-select>

          <cart-update-bar
            v-on:click="addToCart"
            v-bind:buttonDisabled="buttonDisabled"
            v-bind:max-quantity="optionQuantity"
            v-model="selectedQuantity"
          >{{ buttonMessage }}</cart-update-bar>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
