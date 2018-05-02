<template>
  <div class="main-loader" v-bind:class="{ split, zoomed }">

    <h1 v-for="n in 2" v-bind:ref="['track', 'fill'][n - 1]">
      <span>
        <span v-for="(letter, index) in mergedText"
              v-bind:class="[['first', 'second'][index % 2]]"
              v-bind:style="{ transitionDelay: `${Math.floor(index / 2) / 20}s`}">
          {{letter}}
        </span>
      </span>
    </h1>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
