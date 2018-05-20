<template>
  <div class="page">
    <div class="form">
      <h1>Let’s work together</h1>

      <div class="row">
        <text-input title="name" v-model="name" :required="true"></text-input>
        <text-input title="email" v-model="email" :required="true" type="email"></text-input>
        <text-input title="phone number" v-model="phone" :required="false" type="tel"></text-input>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
