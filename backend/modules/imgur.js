const fetch = require('node-fetch');

// Load environment variables from .env file
// Should define IMGUR_CLIENT_ID, IMGUR_MASHAPE_KEY_TEST, and IMGUR_MASHAPE_KEY_PROD for this module
require('dotenv').config();

// Are we running on production?
const prod = process.env.NODE_ENV === 'production';

// Imgur API url
const url = 'https://imgur-apiv3.p.mashape.com/3';

// Headers for all API requests
const headers = {
  Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
  'X-Mashape-Key': process.env[`IMGUR_MASHAPE_KEY_${prod ? 'PROD' : 'TEST'}`],
};

module.exports.fetchAlbumsList = async function fetchImages() {
  const albums = await fetch(`${url}/account/sleeplaterco/albums`, { headers })
    .then(r => r.json())
    .then(json => json.data);
  return albums;
};
