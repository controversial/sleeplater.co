<template>
  <div class="form">
    <div class="row">
      <text-input title="Full name" v-model="name" :required="true" v-bind="{ showValidation }"></text-input>
    </div>
    <div class="row">
      <text-input title="Street address" v-model="streetAddress" :required="true" v-bind="{ showValidation }"></text-input>
    </div>
    <div class="row">
      <text-input title="City" :required="true" v-model="city" v-bind="{ showValidation }"></text-input>
      <text-input title="State / Territory" :required="true" v-model="state" v-bind="{ showValidation }"></text-input>
    </div>
    <div class="row">
      <text-input title="ZIP/Postal code" :required="true" v-model="zip" v-bind="{ showValidation }"></text-input>
      <dropdown title="Country / region" :required="true" v-model="country" v-bind:options="countries" v-bind="{ showValidation }"></dropdown>
    </div>
    <div class="cash-region-error" v-if="showValidation && cashRegionInvalid">
      Looks like you entered an address for which cash payments aren’t available. Cash payments are
      negotiated in person and orders are hand-delivered to accomadate local customers with no other
      way to pay. This service is only available in the regions covered by the United States ZIP
      codes {{ cashZipCodes.slice(0, -1).join(', ') }} and {{ cashZipCodes.slice(-1)[0] }}.
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
