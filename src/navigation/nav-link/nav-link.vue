<template>
  <span class="nav-link"
    v-on:mouseover="$emit('mouseover', route.name)"
    v-on:mouseout="$emit('mouseout', route.name)"
    v-on:click="$emit('click', route.name)"
  >{{route.name}}</span>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
