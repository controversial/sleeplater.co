const sgMail = require('@sendgrid/mail');

// Load environment variables from .env file
// Should define SENDGRID_API_KEY for this module
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = function sendOrderEmail(to, order) {
  sgMail.send({
    to,
    from: 'orders@sleeplater.co',
    subject: 'Your order from sleep later',
    text: 'u ordered something haha',
    html: 'u <strong>ordered</strong> something haha',
  });
};
