<template>
  <div
    class="payment-method"
    v-bind:class="{ selected: name === selectedName }"
    v-html="contents"
    v-on:click="$emit('change', name)"
  ></div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
