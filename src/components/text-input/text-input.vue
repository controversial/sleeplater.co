<template>
  <div>
    <h3 v-bind:class="{ raised: this.value.length || this.focused }">{{title}}{{required ? '*' : ''}}</h3>
    <input
      type="text"
      v-bind:value="value" v-on:input="$emit('input', $event.target.value)"
      v-on:focus="focused = true" v-on:blur="focused = false">
  </div>
</template>

<script src="./script.js"></script>

<style scoped lang="sass" src="./style.sass"></style>
