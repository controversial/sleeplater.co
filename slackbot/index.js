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
