// Logic for sending contact form messages to Slack

const fetch = require('node-fetch');

// Load environment variables from .env file
// Should define CONTACT_WEBHOOK_URL for this module
require('dotenv').config();


module.exports = function sendContactMessage(name, email, phone, message, mode) {
  const modeWord = {
    'Work with us': 'work opportunity',
    'Ask a question': 'question',
    'Just say hi': 'message',
  }[mode];
  const messageObject = {
    attachments: [{
      pretext: `New ${modeWord} from contact form:`,
      author_name: name,
      author_link: `mailto:${email}`,
      text: message,
      fields: [
        { title: 'Email', value: email, short: true },
        phone ? { title: 'Phone number', value: phone, short: true } : undefined,
      ],
      fallback: `Message from ${name} (${email}, ${phone}): ${message}.`, // TODO: modeWord here
    }],
  };
  // Send request to Slack webhook
  return fetch(process.env.CONTACT_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageObject),
  });
};
