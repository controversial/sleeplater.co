<template>
  <div>
    <select v-on:change="$emit('input', $event.target.value)">
      <option disabled selected value>Select an option</option>
      <option v-bind="{ value }" v-for="value in options"> {{ value }} </option>
    </select>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
