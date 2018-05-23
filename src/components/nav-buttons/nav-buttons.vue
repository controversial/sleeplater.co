<template>
  <div class="nav-buttons" v-bind:style="{ color, transitionDelay }">
    <chevron-up-icon v-on:click="$emit('up')" v-bind:class="{ disabled: !canGoUp }" v-bind:style="{ transitionDelay }"></chevron-up-icon><!--
 --><chevron-down-icon v-on:click="$emit('down')" v-bind:class="{ disabled: !canGoDown }" v-bind:style="{ transitionDelay }"></chevron-down-icon>
  </div>
</template>

<script>
export default {
  props: ['color', 'transition-delay', 'canGoUp', 'canGoDown'],
};
</script>
<style scoped lang="sass" src="./style.sass"></style>
