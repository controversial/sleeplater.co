/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set('json spaces', 2);

function constructSlackMessage(name, email, phone, message) {
  return {
    attachments: [{
      pretext: 'New message from contact form:',
      author_name: name,
      author_link: `mailto:${email}`,
      text: message,
      fields: [
        { title: 'Email', value: email, short: true },
        phone ? { title: 'Phone number', value: phone, short: true } : undefined,
      ],
      fallback: `Message from ${name} (${email}, ${phone}): ${message}.`,
    }],
  };
}

app.post('/', (req, res) => {
  const { name, email, phone, message } = req.body; // eslint-disable-line object-curly-newline
  // Report on missing parameters
  if (!name || !email || !message) {
    const missing = ['name', 'email', 'message'].filter(n => !Object.keys(req.body).includes(n));
    res.status(400).send({ error: `missing parameter(s) ${missing.join(', ')}` });
  } else {
    // Send request to Slack webhook
    fetch(process.env.WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(constructSlackMessage(name, email, phone, message)),
    }).then(() => res.send({ status: 'success' }));
  }
});

// Run server
const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at http://0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
