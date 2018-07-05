<template>
  <div class="cart" v-bind:class="{ hidden }">
    <div class="contents">

      <close-icon v-on:click="$emit('close')"></close-icon>

      <h1>Cart</h1>

      <div class="summary">
        <span>{{itemsCount}} item{{itemsCount === 1 ? '' : 's'}}</span>
        <div class="separator"></div>
        <span>${{ roundPrice(subtotal) }}</span>
      </div>

      <div class="details" v-if="itemsCount">
        <div class="scroll-fade" v-bind:style="{ height: itemsHeight }"></div>
        <div class="items" ref="items" v-bind:style="{ maxHeight: itemsMaxHeight }">
          <div class="cart-item" v-for="(product, i) in productsInCart">
            <div class="number"><span>{{i+1}}.</span></div>
            <div class="name">{{product.name}}</div>
            <div class="price">${{product.price}}</div>
          </div>
        </div>
        <div class="cart-info">
          <div>
            <span class="left">Subtotal</span>
            <span class="right">${{ roundPrice(subtotal) }}</span>
          </div>
          <div>
            <span class="left">Tax</span>
            <span class="right">${{ roundPrice(subtotal * 0.08) }}</span>
          </div>
          <div>
            <span class="left emphasis">Total</span><span class="right emphasis">${{ roundPrice(subtotal * 1.08) }}</span>
          </div>
        </div>
      </div>

      <div class="checkout" v-if="itemsCount">
        <div class="row">
          <payment-method
            name="paypal"
            v-on:change="(name) => $store.commit('selectPaymentMethod', name)"
            v-bind="{ selectedName: $store.state.paymentMethod, svg: require('!raw-loader!../../assets/PayPal.svg')}"
          ></payment-method>
          <payment-method
            name="applepay"
            v-on:change="(name) => $store.commit('selectPaymentMethod', name)"
            v-bind="{ selectedName: $store.state.paymentMethod, svg: require('!raw-loader!../../assets/ApplePay.svg')}"
          ></payment-method>
        </div>
        <div class="row">
          <payment-method
            name="credit"
            text="Pay with credit card"
            v-on:change="(name) => $store.commit('selectPaymentMethod', name)"
            v-bind="{ selectedName: $store.state.paymentMethod, svg: require('!raw-loader!../../assets/credit-card.svg')}"
          ></payment-method>
        </div>
        <div class="row">
          <submit-button ref="bottommost" style="flex-grow: 1" v-bind:disabled="!$store.state.paymentMethod">checkout</submit-button>
        </div>
      </div>

      <div class="empty-state" v-if="!itemsCount">There's nothing in your cart!</div>

    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>

<!-- these svg styles can't be scoped because the SVGs are added from require statements -->
<style lang="sass">
.cart .checkout .payment-method
  svg
    height: 18px
    flex-grow: 0
    width: auto
    fill: currentColor

    &:not(:last-child)
      margin-right: 7px

  g
    fill: currentColor
</style>
