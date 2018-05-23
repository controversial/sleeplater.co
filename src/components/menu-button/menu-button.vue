<template>
  <div class="menu-button" v-bind:style="{ color: navOpen ? 'white' : color, transitionDelay }">
    <component v-bind:is="navOpen ? 'close-icon' : 'menu-icon'"
      v-on:click="$emit('click')"
    ></component>
  </div>
</template>

<script>

export default {
  props: ['navOpen', 'color', 'transition-delay'],
};

</script>

<style scoped lang="sass" src="./style.sass"></style>
