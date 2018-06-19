<template>
  <div>
    <div class="arrow left" v-bind:style="{ opacity: canGoLeft ? 1 : 0 }"></div>
    <div class="arrow right" v-bind:style="{ opacity: canGoRight ? 1 : 0 }"></div>
    <div class="num" v-for="(_, n) in numItems /* _ is range [1, numItems]; n is [0, numItems) */"
      v-bind:class="{
        left: n <= leftVal, // Should the number be on the left side?
        center: n === centerVal, // Center?
        right: n >= rightVal, // Right?
        visible: n >= leftVal && n <= rightVal // If it's not either left, center, or right, hide it
      }"
    >{{(n + 1).toString().padStart(2, '0')}}</div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
