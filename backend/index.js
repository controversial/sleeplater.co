/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bigcartel = require('./modules/bigcartel');
const contact = require('./modules/contact');

// Create server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set('json spaces', 2);


app.get('/', (req, res) => {
  res.send('ok');
});


// Get a list of all products

app.get('/products', async (req, res) => {
  res.send(await bigcartel.getProducts());
});


// Contact form

app.post('/contact', (req, res) => {
  const { name, email, phone, message, mode } = req.body; // eslint-disable-line object-curly-newline, max-len
  // Make sure all required parameters are present
  if (!name || !email || !message || !mode) res.status(400).send({ error: 'missing parameter(s)' });
  // Send request to Slack webhook
  else contact(name, email, phone, message, mode).then(() => res.send({ status: 'success' }));
});


// Run server


const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at http://0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
