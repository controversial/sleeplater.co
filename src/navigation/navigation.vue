<template>
  <div class="navigation">
    <!-- Nav controls (atop pages) -->
    <menu-button
      v-bind:navOpen="navOpen"
      v-on:click="toggle"
      v-bind:color="navIconColor" v-bind:transition-delay="navTransitionDelay"
    ></menu-button>
    <transition name="fade">
      <nav-buttons ref="nav" v-if="!navOpen"
        v-bind:canGoUp="canGoUp" v-bind:canGoDown="canGoDown"
        v-on:up="navUp" v-on:down="navDown"
        v-bind:color="navIconColor" v-bind:transition-delay="navTransitionDelay"
      ></nav-buttons>
    </transition>

    <!-- Holds the actual full content, shrinks into navigation view -->
    <div class="page-wrapper" v-bind:class="{ 'nav-open': navOpen }">
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

    <!-- Other pages appear in a stack behind -->
    <div class="other-pages">
      <div class="background-page-wrapper" v-for="page in otherRoutes">
        <component v-bind:is="page.component"></component>
      </div>
    </div>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
