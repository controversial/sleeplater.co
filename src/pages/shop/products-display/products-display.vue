<template>
  <div class="products-container" v-bind:style="{ pointerEvents: interactable ? 'all' : 'none' }">
    <transition-group tag="div" name="products" class="products" ref="products" v-on:wheel.native="scrollHandler" :appear="true" :css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <shop-item
        v-for="(product, i) in categoryProducts" v-bind="product" v-bind:offset-x="getXOffset(i)" v-bind:data-index="i"
        v-bind:key="product.id + categoryIndex /* adding categoryIndex ensures that a product that's in multiple categories still animates */"
        v-on:click.native="clicked(i)">
      </shop-item>
    </transition-group>

    <pagination v-bind:num-items="categories.length" v-model="categoryIndex"></pagination>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
