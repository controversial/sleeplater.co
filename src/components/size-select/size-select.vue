<template>
  <div class="sizes" ref="container">
    <div
      class="size"
      v-for="size in allSizes" v-bind:key="size" v-bind:ref="size"
      v-bind:class="{ unavailable: !sizes.includes(size) }"
      v-on:click="$emit('input', size)"
    >{{ size }}</div>

    <div class="selected-indicator"
      v-if="mounted && displayed && allSizes.indexOf(value) >= 0"
      v-bind:style="indicatorStyle"
    ></div>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
