// Logic for querying the BigCartel API

const path = require('path');
const fetch = require('node-fetch');

// Load environment variables from .env file
// Should define BIGCARTEL_USERNAME and BIGCARTEL_PASSWORD for this module
require('dotenv').config();

function makeReq(endpoint) {
  const base = 'api.bigcartel.com/v1/';
  const url = `https://${path.join(base, endpoint)}`;

  const authString = `${process.env.BIGCARTEL_USERNAME}:${process.env.BIGCARTEL_PASSWORD}`;
  const Authorization = `Basic ${Buffer.from(authString).toString('base64')}`;
  return fetch(url, {
    headers: { Authorization, Accept: 'application/vnd.api+json' },
  }).then(r => r.json());
}

// Fetch the ID for the account with the credentials provided
let accountId;
makeReq('/accounts').then((r) => { accountId = r.data[0].id; });


module.exports.getProducts = async function getProducts() {
  const r = await makeReq(`/accounts/${accountId}/products`);
  // Find the object to represent the "option" with a given ID
  function findOption(optionId) {
    // Build array of "options" objects that were attached to the response
    const option = r.included
      .filter(e => e.type === 'product_options')
      .find(o => o.id === optionId);
    return { name: option.attributes.name, price: option.attributes.price };
  }
  // Find the object to represent the "category" with a given ID
  function findCategory(categoryId) {
    // Build array of "category" objects that were attached to the response
    return r.included
      .filter(e => e.type === 'categories')
      .map(c => ({ id: c.id, name: c.attributes.name, position: c.attributes.position }))
      // Pick out the right one
      .find(c => c.id === categoryId);
  }
  const products = r.data.map(p => ({
    id: p.id,
    name: p.attributes.name,
    status: p.attributes.status,
    description: p.attributes.description,
    price: p.attributes.default_price,
    image: p.attributes.primary_image_url,
    options: p.relationships.options.data.map(option => findOption(option.id)),
    categories: p.relationships.categories.data.map(category => findCategory(category.id)),
  }));
  return products;
};
