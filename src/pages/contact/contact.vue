<template>
  <div class="page">
    <div class="form">
      <radio-options :options="['Work with us', 'Ask a question', 'Just say hi']"></radio-options>
      <h1>Let’s work together</h1>

      <div class="row">
        <text-input title="name" v-model="name" :required="true"></text-input>
        <text-input title="email" v-model="email" :required="true" type="email"></text-input>
        <text-input title="phone number" v-model="phone" :required="false" type="tel"></text-input>
      </div>
      <text-area title="Project details" v-model="message" :required="true" :rows="10"></text-area>
      <submit-button ref="submit" v-on:click.native="submit">Submit</submit-button>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
