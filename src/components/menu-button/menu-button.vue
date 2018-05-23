<template>
  <component v-bind:is="navOpen ? 'close-icon' : 'menu-icon'"
    class="menu-button"
    v-bind:style="{ color: navOpen ? 'white' : color, transitionDelay }" v-on:click="$emit('click')"
  ></component>
</template>

<script>

export default {
  props: ['navOpen', 'color', 'transition-delay'],
};

</script>

<style scoped lang="sass" src="./style.sass"></style>
