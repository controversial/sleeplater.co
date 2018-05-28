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
    <div class="page-wrapper" ref="pageWrapper" v-bind:class="{ 'nav-open': navOpen }" v-bind:name="$route.name"
      v-on:click="navOpen = false"
      v-on:mouseover="pageMouseover" v-on:mouseout="pageMouseout"
    >
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

    <!-- Links to other pages -->
    <div class="page-links" ref="pageLinks">
      <nav-link v-for="route in primaryRoutes" v-bind:key="route.name" v-bind:name="route.name"
        v-bind:route="route"
        v-on:mouseover="linkMouseover"
        v-on:mouseout="linkMouseout"
        v-on:click="linkClick"
      ></nav-link>
    </div>

    <!-- Other pages appear in a stack behind -->
    <transition name="delay"><div class="other-pages" ref="stack" v-if="navOpen">
      <div class="background-page-wrapper" v-for="page in otherRoutes" v-bind:name="page.name"
        v-on:mouseover="pageMouseover" v-on:mouseout="pageMouseout" v-on:click="linkClick($event.target.getAttribute('name'))"
      >
        <component v-bind:is="page.component"></component>
      </div>
    </div></transition>

  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
