<template>
  <div class="navigation">
    <!-- Nav controls -->
    <menu-button v-bind:color="navIconColor" v-bind:transition-delay="navTransitionDelay"></menu-button>
    <nav-buttons ref="nav"
      v-bind:color="navIconColor" v-bind:transition-delay="navTransitionDelay"
      v-bind:canGoUp="canGoUp" v-bind:canGoDown="canGoDown"
      v-on:up="navUp" v-on:down="navDown"
    ></nav-buttons>
    <!-- Main page -->
    <transition v-bind:name="transitionName" v-bind:mode="transitionMode">
      <router-view
        v-on:wheel="onWheel"
        v-on:touchstart="onTouchStart" v-on:touchmove="onTouchMove" v-on:touchend="onTouchEnd"
      ></router-view>
    </transition>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
