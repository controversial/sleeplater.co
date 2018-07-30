<template>
  <div class="loader">
    <loader-progress
      ref="loader"
      a="sleep" b="later"
      v-bind:progress="progress" v-bind:split="this.split"
      v-on:completed="completed"
    ></loader-progress>
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass">
@import ../styles/common

.loader
  background: $dark-1
  color: $actually-white
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 100

.loader-progress
  position: absolute
  top: 50%
  left: 50vw
  transform: translate(-50%, -50%)

</style>
