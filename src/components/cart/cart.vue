<template>
  <div class="cart" v-bind:class="{ hidden }">
    <div class="contents">

      <close-icon v-on:click="$emit('close')"></close-icon>

      <h1>Cart</h1>

      <div class="summary">
        <span>{{itemsCount}} item{{itemsCount === 1 ? '' : 's'}}</span>
        <div class="separator"></div>
        <span>${{ Math.round(subtotal * 100) / 100 }}</span>
      </div>

      <div class="details" v-if="itemsCount">
        <div class="cart-item" v-for="(product, i) in productsInCart">
          <div class="number"><span>{{i+1}}.</span></div>
          <div class="name">{{product.name}}</div>
          <div class="price">${{product.price}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
