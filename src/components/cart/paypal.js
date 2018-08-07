import { formatPrice } from '../../helpers';


const buttonStyle = {
  size: 'responsive',
  shape: 'rect',
  color: 'silver',
  tagline: false,
};


// Initialize paypal button

export default function doPaypal({ getPaymentAmount, onComplete }) {
  window.paypal.Button.render({
    env: 'production',

    // Keys for sandbox/prod
    client: {
      sandbox: 'AasuLzwG0RtJkM14vRWCNk9v1qtMbyod3BMEI8HGvbQ9dQIrg8BAmWgA-NfsQNtHNaRACyK2aPrVakjl',
      production: 'AZUcKQOKOGm2o9lo2hi8jiG_NsH30cW9pwt7IUaGCPTgY6WiSIjUlTGaUl51V34WCSnoGeG12ExDfFqj',
    },

    payment: (data, actions) => actions.payment.create({
      transactions: [{
        amount: { total: formatPrice(getPaymentAmount(), true), currency: 'USD' },
      }],
    }),

    onAuthorize: (data, actions) => actions.payment.execute()
      .then((result) => { onComplete(result.payer); }),

    style: buttonStyle,
  }, '#paypal-button');
  document.getElementById('paypal-button').style.display = 'none';
}
