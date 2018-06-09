/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const path = require('path');
// Load environment variables from .env file
// Should define BIGCARTEL_USERNAME and BIGCARTEL_PASSWORD
require('dotenv').config();

// Create server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set('json spaces', 2);


app.get('/', (req, res) => {
  res.send('ok');
});


// Run server
const args = process.argv.slice(2);
const port = args.length ? args[0] : 3001;
console.log(`Now listening at http://0.0.0.0:${port}`);
app.listen(port, '0.0.0.0');
