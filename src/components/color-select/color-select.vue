<template>
  <div class="colors">
    <div
      class="color"
      v-for="(color, i) in colors" v-bind:key="i"
      v-bind:style="{ background: color }"
      v-on:click="$emit('input', color)"
    ></div>

    <check-icon
      class="selected-indicator"
      v-if="colors.indexOf(value) >= 0"
      v-bind:style="{
        left: `${.5 + ((.5 + .45 + .5) * colors.indexOf(value))}em`,
        color: checkColor,
      }"
    ></check-icon>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
