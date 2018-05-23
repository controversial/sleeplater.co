<template>
  <div class="navigation">
    <!-- Nav controls (atop pages) -->
    <menu-button
      v-bind:navOpen="shrunken"
      v-on:click="toggleShrink"
      v-bind:color="navIconColor" v-bind:transition-delay="navTransitionDelay"
    ></menu-button>
    <nav-buttons ref="nav" v-if="!shrunken"
      v-bind:color="navIconColor" v-bind:transition-delay="navTransitionDelay"
      v-bind:canGoUp="canGoUp" v-bind:canGoDown="canGoDown"
      v-on:up="navUp" v-on:down="navDown"
    ></nav-buttons>

    <!-- Holds the actual full content, shrinks into navigation view -->
    <div class="page-wrapper" v-bind:class="{ shrunken }">
      <!-- Main page -->
      <transition v-bind:name="transitionName" v-bind:mode="transitionMode">
        <!-- Bindings for switching route with touch / scroll gestures -->
        <router-view
          v-on:wheel.native="scrollHandler.onWheel"

          v-on:touchstart.native="swipeHandler.onTouchStart"
          v-on:touchmove.native="swipeHandler.onTouchMove"
          v-on:touchend.native="swipeHandler.onTouchEnd"
        ></router-view>
      </transition>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
