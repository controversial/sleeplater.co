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

// Retrieve list of albums in the sleeplaterco account from the API
module.exports.fetchAlbumsList = function fetchAlbumsList() {
  return fetch(`${url}/account/sleeplaterco/albums`, { headers })
    .then(r => r.json())
    .then(json => json.data);
};

// Retrieve list of images for a given album ID from the imgur API
module.exports.fetchAlbumImages = function fetchAlbumImages(albumId) {
  return fetch(`${url}/album/${albumId}/images`, { headers })
    .then(r => r.json())
    .then(json => json.data);
};

// Retrieve list of images for a given album ID from the imgur API only if no recent cached response
// from the request exists. If there is a cached response, return that to reduce extraneous API
// calls.
// TODO: the whole caching part haha
module.exports.getAlbumImages = function getAlbumImages(albumId) {
  return module.exports.fetchAlbumImages(albumId);
};


// Main function: fetch and process account album data into an object like:
// {
//   productId: {
//     colorHex: [imageUrl1, imageUrl2, ...],
//     anotherHex: [imageUrl3, imageUrl4, ...],
//   },
//   ...
// }
module.exports.getProductImages = async function getProductImages() {
  const albums = await module.exports.fetchAlbumsList();
  const ids = albums
    // remove non-numeric titles to get only albums whose titles represent bigcartel product IDs
    .filter(a => !Number.isNaN(Number(a.title)))
    // Create an object with both the bigcartel id of a product and the imgur id of the album it
    // goes with
    .map(a => ({ imgur: a.id, bigcartel: a.title }));
  const imagesRequests = ids.map(({ imgur }) => module.exports.getAlbumImages(imgur));
  const imageSets = await Promise.all(imagesRequests);
  // Restructure data into the shape defined in the comment above
  return imageSets
    .reduce((accum, albumImages, index) => {
      const productId = ids[index].bigcartel;
      accum[productId] = {};
      albumImages.forEach(({ description: color, link }) => {
        if (!accum[productId][color]) accum[productId][color] = [];
        accum[productId][color].push(link);
      });
      return accum;
    }, {});
};
