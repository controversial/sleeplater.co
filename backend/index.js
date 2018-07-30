/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bigcartel = require('./modules/bigcartel');
const stockkeeper = require('./modules/stock');
const imgur = require('./modules/imgur');
const contact = require('./modules/contact');
const sendOrderNotification = require('./modules/ordertrack');

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
  console.time('/products');
  // Get all of the product info that comes from bigcartel
  let products = await bigcartel.getProducts();
  // Add product quantities from google sheets
  const stock = await stockkeeper.getStock();
  products = products.map(product => ({
    ...product,
    options: product.options.map(({ size, color }) => ({
      size, color, quantity: stock[product.id][color][size],
    })),
  }));
  // Add supplemental images from imgur to each product
  const productImages = await imgur.getProductImages();
  const productsWithImages = products
    .map(p => Object.assign({}, p, { images: productImages[p.id] || {} }));
  res.send(productsWithImages);
  console.timeEnd('/products');
});


// Contact form

app.post('/contact', (req, res) => {
  console.time('/contact');
  const { name, email, phone, message, mode } = req.body; // eslint-disable-line object-curly-newline, max-len
  // Make sure all required parameters are present
  if (!name || !email || !message || !mode) res.status(400).send({ error: 'missing parameter(s)' });
  // Send request to Slack webhook
  else contact(name, email, phone, message, mode).then(() => res.send({ status: 'success' }));
  console.timeEnd('/contact');
});


// Order callbacks (notification + quantity update)

app.post('/order', async (req, res) => {
  console.time('/order');
  const { type, order, user } = req.body;
  if (!type || !order || !user) res.status(400).send({ error: 'missing parameter(s)' });
  else {
    const updates = await stockkeeper.handleOrder(order.items);
    // await sendOrderNotification(type, order, user);
    res.send({ status: 'success', updates });
  }
  console.timeEnd('/order');
});


// Run server


const args = process.argv.slice(2);
const port = args.length ? args[0] : 3000;
console.log(`Now listening at http://0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
