// Load environment variables from .env file
// Should define AIRTABLE_API_KEY and AIRTABLE_BASE_ID for this module
require('dotenv').config();

const Airtable = require('airtable');
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

module.exports.get = async function getProducts() {
  // Retrive all the info we'll need from the Airtable API. It's split across 3 tables: Products,
  // Inventory, and Images.

  const productRecords = [];
  const inventoryRecords = [];
  const imageRecords = [];

  await Promise.all([
    base('Products').select({ view: 'Gallery' })
      .eachPage((records, fetchNextPage) => {
        productRecords.push(...records);
        fetchNextPage();
      }),

    base('Inventory').select({ view: 'Spreadsheet view' })
      .eachPage((records, fetchNextPage) => {
        inventoryRecords.push(...records);
        fetchNextPage();
      }),

    base('Images').select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        imageRecords.push(...records);
        fetchNextPage();
      }),
  ]);

  // Basic product info comes from the records in the "Product" table

  const productRefs = {};
  const products = productRecords.map((record) => {
    const product = {};
    product.slug = record.get('Product slug');
    product.name = record.get('Display name');
    product.description = record.get('Product description');
    product.price = record.get('Product price');
    product.category = record.get('Product category');
    product.image = (record.get('Cover image') || { 0: { url: '' } })[0].url;
    product.images = {};
    product.options = [];

    productRefs[record.id] = product;
    return product;
  });

  // Add information from the "Inventory" table about the options available for each product and the
  // available quantities for each option

  inventoryRecords.forEach((record) => {
    const product = productRefs[record.get('Parent product')[0]];
    product.options.push({
      size: record.get('Product size'),
      color: record.get('Product color'),
      quantity: Math.max(record.get('Number remaining'), 0),
    });
  });

  // Add color-specific detail images from the "Images" table to each product's info

  imageRecords.forEach((record) => {
    const product = productRefs[record.get('Parent product')[0]];
    product.images[record.get('Color')] = record.get('Images')
      .map(({ url, thumbnails }) => ({ full: url, thumb: thumbnails.large.url }));
  });

  return products;
};
