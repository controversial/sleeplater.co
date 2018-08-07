<template>
  <div>
    <label class="raised">{{ title }}{{required ? '*' : ''}}</label>
    <select v-model="selectionValue">
      <option v-bind="{ value }" v-for="value in options"> {{ value }} </option>
    </select>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
