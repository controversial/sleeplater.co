const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set('json spaces', 2);
