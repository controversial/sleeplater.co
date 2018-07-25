<template>
  <transition v-bind:name="mobile ? 'slide-from-bottom' : 'fade'">
    <div class="product-options wrapper" v-if="$store.state.productsFetched" v-bind:data-page="mobilePage">
      <div class="modal slides" v-hammer:swipe.down="onSwipeDown">

        <div class="touch-handle"></div>

        <div class="left">
          <image-carousel
            v-bind:images="product.images[selectedColor] || []"
            v-bind:fullwidth="mobile"
            v-model="carouselIndex"
          ></image-carousel>
        </div>

        <div class="right">
          <h1 ref="header">{{ product.name }}&nbsp;<span class="price">${{ formatPrice(product.price, true) }}</span></h1>
          <!-- "pages" markup is only used in mobile layout; on desktop these divs are unstyled -->
          <div class="pages">
            <div class="page page-1 description">
              {{ product.description }}
            </div>
            <div class="page page-2">
              <color-select v-bind:colors="colors" v-model="selectedColor"></color-select>
              <size-select v-bind:sizes="availableSizesForColor" v-model="selectedSize"></size-select>
            </div>
          </div>

          <cart-update-bar
            v-on:click="bottomBarClick"
            v-bind:buttonDisabled="buttonDisabled"
            v-bind:collapsed="mobilePage === 1"
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
