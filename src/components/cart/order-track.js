import { formatPrice, pick } from '../../helpers';

// Send request to development server if running locally
const url = ['localhost', '0.0.0.0'].includes(window.location.hostname)
  ? 'http://0.0.0.0:3000/order'
  : 'https://api.sleeplater.co/order';

export default function onOrderComplete(payer) {
  // Payment method
  const paymentMethod = payer.payment_method;

  // User info
  const user = { name: undefined, address: undefined, email: undefined };
  if (paymentMethod === 'cash') {
    user.name = payer.name;
    user.email = payer.email;
    user.address = payer.address;
  } else {
    const info = payer.payer_info;
    user.name = `${info.first_name} ${info.last_name}`;
    user.email = info.email;
    const a = info.shipping_address;
    user.address = `${a.line1}\n${a.city}, ${a.state} ${a.postal_code}\n${a.country_code}`;
  }

  // order
  const order = {
    total: formatPrice(this.subtotal * 1.08, true),
    items: this.$store.state.cart.map(item => pick({
      ...item, // color, quantity, size come from here
      ...this.$store.state.products.find(p => p.id === item.id), // name, price come from here
    }, ['color', 'quantity', 'size', 'name', 'price', 'id'])),
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
