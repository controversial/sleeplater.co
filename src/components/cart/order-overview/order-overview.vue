<template>
  <div class="order-overview">
    <div class="scroll-fade" v-bind:style="{ height: `${height}px` }"></div>
    <div class="items" ref="items" v-bind:style="{ maxHeight: `${maxHeight}px` }">
      <div
        class="cart-item"
        v-for="(product, i) in products"
        v-bind:name="editable ? `item-${i}`: ''" v-bind:ref="`item-${i}`"
      >
        <div class="number"><span>{{i+1}}.</span></div>
        <div class="name">{{product.name}}</div>
        <div class="price">
          <span v-if="product.quantity > 1">{{product.quantity}}</span>
          <x-icon v-if="product.quantity > 1"></x-icon>
          ${{ formatPrice(product.price, false) }}
        </div>

        <tippy
          v-if="editable"
          :to="`item-${i}`"
          interactive="true"
          placement="bottom"
          arrow="true"
          theme="sleeplater"
          v-on:show="displayedOptions.push(i); tippyHideOthers(i)"
          v-on:hidden="displayedOptions.splice(displayedOptions.indexOf(i), 1)"
        >
          <cart-item-options v-bind:cart-index="i" v-bind:displayed="displayedOptions.includes(i)" v-bind:hide="() => tippyHide(i)"></cart-item-options>
        </tippy>
      </div>
    </div>

    <div class="cart-info">
      <div v-for="item in Object.entries(this.costBreakdown)">
        <span class="left" v-bind:class="{ emphasis: item[0] === 'total' }">{{ item[0] }}</span>
        <span class="right" v-bind:class="{ emphasis: item[0] === 'total' }">${{ formatPrice(item[1], true) }}</span>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>
