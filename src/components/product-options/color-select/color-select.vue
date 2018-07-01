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
      v-bind:style="{ left: `${.6 + (1.66 * colors.indexOf(value))}rem` }"
    ></check-icon>
  </div>
</template>

<script>
export default {
  props: ['colors', 'value'], // value is the selected color
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
