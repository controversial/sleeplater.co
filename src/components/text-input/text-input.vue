<template>
  <div>
    <h3 class="title">{{title}}</h3>
    <input type="text" v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
