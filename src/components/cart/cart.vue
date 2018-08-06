<template>
  <div class="cart" v-bind:class="{ hidden }">
    <div class="contents">

      <close-icon v-if="checkoutStep === 1" v-on:click="$emit('close')"></close-icon>
      <back-icon v-if="checkoutStep > 1" v-on:click="checkoutStep -= 1"></back-icon>

      <h1>Cart</h1>

      <div class="summary">
        <span>{{itemsCount}} item{{itemsCount === 1 ? '' : 's'}}</span>
        <div class="separator"></div>
        <span>${{ formatPrice(subtotal, true) }}</span>
      </div>

      <div class="sliding" v-bind:data-page="checkoutStep">

        <!-- First page has order summary and payment options -->

        <div class="page-1">
          <order-overview v-if="itemsCount"
            ref="overview"
            v-bind:products="productsInCart"
            editable
            v-bind:height="itemsHeight"
            v-bind:maxHeight="itemsMaxHeight"
          ></order-overview>

          <div class="payment-methods" v-if="itemsCount">
            <div class="row">
              <payment-method
                name="credit"
                text="Pay with credit card"
                v-on:change="(name) => $store.commit('selectPaymentMethod', name)"
                v-bind="{ selectedName: $store.state.paymentMethod, svg: require('!raw-loader!../../assets/credit-card.svg')}"
              ></payment-method>
            </div>
            <div class="row">
              <payment-method
                name="paypal"
                v-on:change="(name) => $store.commit('selectPaymentMethod', name)"
                v-bind="{ selectedName: $store.state.paymentMethod, svg: require('!raw-loader!../../assets/PayPal.svg')}"
              ></payment-method>
              <payment-method
                name="cash"
                text="Cash"
                v-on:change="(name) => $store.commit('selectPaymentMethod', name)"
                v-bind="{ selectedName: $store.state.paymentMethod, svg: require('!raw-loader!../../assets/hand-holding-usd-solid.svg')}"
              ></payment-method>
            </div>
            <div class="row">
              <submit-button
                class="checkout button"
                ref="bottommost"
                v-bind:disabled="!$store.state.paymentMethod"
                v-on:click.native="checkoutStep = 2"
              >checkout</submit-button>
            </div>
          </div>
        </div>

        <!-- Second page has shipping details for cash payments -->

        <div class="page-2">
          <div class="shipping">
            <address-form ref="address" :showValidation="hasAttempted"></address-form>
          </div>

          <!-- Submit buttons -->
          <div class="row">
            <submit-button
              class="checkout button"
              v-on:click.native="() => ($refs.address.valid ? () => { checkoutStep = 3; } : () => { hasAttempted = true; })()"
            >Continue</submit-button>
          </div>
        </div>

        <!-- Third page -->
        <div class="page-3">
          <order-overview v-if="itemsCount"
            ref="overview"
            v-bind:products="productsInCart"
            show-shipping
            v-bind:height="itemsHeight"
            v-bind:maxHeight="itemsMaxHeight"
          ></order-overview>

          <div class="submission">
            <div class="row" v-bind:style="{ display: $store.state.paymentMethod === 'cash' || !$store.state.paymentMethod ? '' : 'none'}">
              <submit-button
                class="checkout button"
                v-bind:state="checkoutButtonState"
                v-bind:disabled="!$store.state.paymentMethod"
                v-on:click.native="checkout"
              >checkout</submit-button>
            </div>
            <div class="row">
              <div id="paypal-button"></div>
            </div>
            <div class="row">
              <div class="credit-card-info" v-if="$store.state.paymentMethod === 'credit'">
                To pay with a credit card without creating an account, select "Pay with Debit or Credit
                Card" at the bottom of the PayPal checkout window.
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="empty-state" v-if="!itemsCount">{{ cartEmptyMessage }}</div>

    </div>
  </div>
</template>

<script src="./script.js"></script>
<style scoped lang="sass" src="./style.sass"></style>

<!-- these svg styles can't be scoped because the SVGs are added from require statements -->
<style lang="sass">
.cart .payment-methods .payment-method
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
