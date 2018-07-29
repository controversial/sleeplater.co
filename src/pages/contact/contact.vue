<template>
  <div class="page">
    <div class="form">
      <radio-options v-model="mode" :options="['Work with us', 'Ask a question', 'Just say hi']"></radio-options>
      <h1>{{heading}}</h1>

      <div class="row">
        <text-input title="name" v-model="name" :required="true" v-bind:show-validation="hasAttempted"></text-input>
        <text-input title="email" v-model="email" :required="true" type="email" v-bind:show-validation="hasAttempted"></text-input>
        <text-input title="phone number" v-model="phone" :required="false" type="tel" v-bind:show-validation="hasAttempted"></text-input>
      </div>
      <text-area v-bind:title="messageBoxLabel" v-model="message" :required="true" :rows="10" v-bind:show-validation="hasAttempted"></text-area>
      <submit-button ref="submit" v-bind:state="buttonState" v-on:click.native="submit">Submit</submit-button>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
