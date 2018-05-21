<template>
  <div v-bind:class="{ invalid: !valid }">
    <label>{{title}}{{required ? '*' : ''}}</label>
    <textarea v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :rows="rows"></textarea>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
