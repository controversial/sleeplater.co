<template>
  <div class="navigation">
    <!-- Nav controls -->
    <menu-button
      v-on:click="shrunken = !shrunken"
      v-bind:color="navIconColor" v-bind:transition-delay="navTransitionDelay"
    ></menu-button>
    <nav-buttons ref="nav"
      v-bind:color="navIconColor" v-bind:transition-delay="navTransitionDelay"
      v-bind:canGoUp="canGoUp" v-bind:canGoDown="canGoDown"
      v-on:up="navUp" v-on:down="navDown"
    ></nav-buttons>

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
