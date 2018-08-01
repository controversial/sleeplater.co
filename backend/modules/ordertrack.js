// Logic for sending order notifications to Slack

const fetch = require('node-fetch');

// Load environment variables from .env file
// Should define ORDERS_WEBHOOK_URL for this module
require('dotenv').config();

/*
 * type: 'paypal' or 'cash'
 * order: {
 *   total: 104.02,
 *   items: [
 *     { name: 'Shirt name', quantity: 1, size: 's', color: '#hex', price: 10.00 },
 *   ],
 * }
 * user: {
 *   name: 'John Doe',
 *   address: 'blah blah blah \n blah blah blah',
 *   email: 'johndoe@example.com',
 * }
 */
module.exports = function sendOrderNotification(type, order, user) {
  const paymentMethodText = {
    paypal: 'PayPal (paid)',
    cash: 'Cash (incomplete)',
  }[type];
  const messageObject = {
    text: `New order from ${user.name}!`,
    attachments: [
      // User info
      {
        fields: [
          { title: 'Address', value: user.address, short: true },
          { title: 'Payment method', value: paymentMethodText, short: true },
          { title: 'Email', value: user.email, short: true },
          { title: 'Order total', value: `$${order.total.toFixed(2)}`, short: true },
        ],
      },
      // Order info
      { pretext: 'Order:' },
      ...order.items.map(item => ({
        color: item.color,
        fields: [
          { title: 'Product name', value: item.name, short: true },
          { title: 'Quantity', value: item.quantity, short: true },
          { title: 'Size', value: item.size.toUpperCase(), short: true },
          { title: 'Color', value: item.color, short: true },
          { title: 'Price', value: `$${item.price.toFixed(2)}` },
        ],
      })),
    ],
  };
  // Send request to Slack webhook
  return fetch(process.env.ORDERS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageObject),
  });
};
