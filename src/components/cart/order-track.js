import { pick, formatAddress } from '../../helpers';

// Send request to development server if running locally
const url = ['localhost', '0.0.0.0'].includes(window.location.hostname)
  ? 'http://0.0.0.0:3000/order'
  : 'https://api.sleeplater.co/order';

export default function onOrderComplete(payer) {
  // Payment method
  const paymentMethod = payer.payment_method;

  // User info
  const user = {
    name: this.$store.state.address.name,
    address: formatAddress(this.$store.state.address),
    email: paymentMethod === 'cash' ? this.$store.state.address.email : payer.payer_info.email,
  };

  // order
  const order = {
    total: this.total,
    items: this.$store.state.cart.map(item => pick({
      ...item, // color, quantity, size come from here
      ...this.$store.state.products.find(p => p.slug === item.slug), // name, price come from here
    }, ['color', 'quantity', 'size', 'name', 'price', 'slug'])),
  };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Only some properties of this
    body: JSON.stringify({
      type: paymentMethod,
      user,
      order,
    }),
  })
    .then(r => r.json());
}
