<template>
  <div class="radio-options">
    <label v-bind:class="{ selected: selection === option }" v-for="(option, index) in options">
      <!-- Each Vue component instance has an assigned unique id (this._uid). We use this to establish the radio group -->
      <input type="radio"
        v-bind:name="_uid"
        v-bind:value="option"
        v-model="selection"
        v-on:change="$emit('input', $event.target.value)"
      >{{option}}
    </label>
  </div>
</template>
<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
