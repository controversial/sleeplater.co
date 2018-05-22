<template>
  <menu-icon class="menu-button" v-bind:style="{ color, transitionDelay }" v-on:click="$emit('click')"></menu-icon>
</template>

<script>

export default {
  props: ['color', 'transition-delay'],
};

</script>

<style scoped lang="sass" src="./style.sass"></style>
