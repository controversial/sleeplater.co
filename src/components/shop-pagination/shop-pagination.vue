<template>
  <div>
    <div class="click-target left" v-bind:class="{ disabled: !canGoLeft }" v-on:click="left"></div>
    <div class="click-target right" v-bind:class="{ disabled: !canGoRight }" v-on:click="right"></div>

    <div class="num" v-for="(_, n) in numItems /* _ is range [1, numItems]; n is [0, numItems) */"
      v-bind:class="{
        left: n <= leftVal, // Should the number be on the left side?
        center: n === centerVal, // Center?
        right: n >= rightVal, // Right?
        visible: n >= leftVal && n <= rightVal // If it's not either left, center, or right, hide it
      }"
      v-on:click="change(n)"
    >{{(n + 1).toString().padStart(2, '0')}}</div>

    <div class="arrow left" v-bind:class="{ hidden: !canGoLeft }"></div>
    <div class="arrow right" v-bind:class="{ hidden: !canGoRight }"></div>
  </div>
</template>
<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
