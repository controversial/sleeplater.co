<template>
  <div class="bottom-bar" v-bind:class="{ active: buttonActive, disabled: buttonDisabled, collapsed }">
    <div class="submit"
      v-on:click="() => { if (!buttonDisabled) this.$emit('click'); }"
      v-on:mousedown="buttonActive = true"
      v-on:mouseup="buttonActive = false"
    ><slot></slot></div>

    <quantity-select
      v-bind:value="value"
      v-bind:max-value="maxQuantity"
      v-on:input="$emit('input', $event)"
    ></quantity-select>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
