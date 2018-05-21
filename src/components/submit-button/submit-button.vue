<template>
  <div class="button" v-bind:state="state">
    <slot>Button</slot>
    <spinner></spinner>
    <check-circle-icon></check-circle-icon>
    <alert-circle-icon></alert-circle-icon>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
