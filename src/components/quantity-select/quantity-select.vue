<template>
  <div class="quantity-select">
    <minus-icon
      v-on:click="$emit('input', Math.max(value - 1, minValue))"
      v-bind:class="{ disabled: value <= minValue }"
    ></minus-icon>

    <span>{{value}}</span>

    <plus-icon
      v-on:click="$emit('input', Math.min(value + 1, maxValue))"
      v-bind:class="{ disabled: value >= maxValue }"
    ></plus-icon>
  </div>
</template>

<script>
export default {
  props: { value: Number, maxValue: { type: Number, default: Infinity } },
  data: () => ({ minValue: 1 }),
  watch: { maxValue(v) { if (this.value > v) this.$emit('input', v); } },
};
</script>

<style scoped lang="sass" src="./style.sass"></style>
