<template>
  <div class="nav-buttons" v-bind:style="{ color }">
    <chevron-up-icon v-on:click="navUp"></chevron-up-icon><!--
 --><chevron-down-icon v-on:click="navDown"></chevron-down-icon>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
