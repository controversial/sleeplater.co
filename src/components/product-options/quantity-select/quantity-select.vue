<template>
  <div class="quantity-select">
    <minus-icon v-on:click="$emit('input', Math.max(value - 1, 0))"></minus-icon>
    <span>{{value}}</span>
    <plus-icon v-on:click="$emit('input', value + 1)"></plus-icon>
  </div>
</template>

<script>
export default {
  props: ['value'],
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
