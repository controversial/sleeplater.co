<template>
  <div class="nav-buttons" v-bind:style="{ color, transitionDelay }">
    <chevron-up-icon v-on:click="navUp" v-bind:class="{ disabled: !canGoUp }" v-bind:style="{ transitionDelay }"></chevron-up-icon><!--
 --><chevron-down-icon v-on:click="navDown" v-bind:class="{ disabled: !canGoDown }" v-bind:style="{ transitionDelay }"></chevron-down-icon>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
