// Load environment variables from .env file
// Should define AIRTABLE_API_KEY and AIRTABLE_BASE_ID for this module
require('dotenv').config();

const Airtable = require('airtable');
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

module.exports.getProducts = async function getProducts() {
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

  const products = productRecords.map((record) => {
    const product = {};
    product.id = record.get('Product slug');
    product.name = record.get('Display name');
    product.description = record.get('Product description');
    product.price = record.get('Product price');
    product.image = record.get('Cover image')[0].url;

    return product;
  });
  return [productRecords, inventoryRecords, imageRecords];
};
