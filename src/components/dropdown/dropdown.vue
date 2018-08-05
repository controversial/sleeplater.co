<template>
  <div>
    <select v-model="selectionValue">
      <option v-bind="{ value }" v-for="value in options"> {{ value }} </option>
    </select>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
