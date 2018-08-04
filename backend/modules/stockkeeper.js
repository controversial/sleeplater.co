// Load environment variables from .env file
// Should define AIRTABLE_API_KEY and AIRTABLE_BASE_ID for this module
require('dotenv').config();

const Airtable = require('airtable');
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

module.exports.handleOrder = async function handleOrder(items) {
  const inventoryRecords = [];

  // Fetch records using the 'string' format because it allows us to see the product slug of the
  // parent product without retrieving and sorting through the whole Products table
  // The API says about the 'string' cellFormat that "You should not rely on the format of these
  // strings, as it is subject to change" so let's hope it holds!
  const irrelevancies = { timeZone: 'America/New_York', userLocale: 'en-us' };
  await base('Inventory').select({ view: 'Spreadsheet view', cellFormat: 'string', ...irrelevancies })
    .eachPage((records, fetchNextPage) => {
      inventoryRecords.push(...records);
      fetchNextPage();
    });

  const updates = items.map(({ slug, color, size, quantity }) => { // eslint-disable-line object-curly-newline, max-len
    // Locate the record in the inventory table that matches
    const record = inventoryRecords.find(inventoryRecord =>
      slug === inventoryRecord.get('Parent product')
        && color === inventoryRecord.get('Product color')
        && size === inventoryRecord.get('Product size'));
    if (!record) return Promise.reject(new Error("Couldn't find product configuration"));
    // Increase the number of "products sold"
    return base('Inventory').update(record.id, {
      'Number sold': parseInt(record.get('Number sold'), 10) + quantity,
    })
      // Return info about what products were updated and what their new quantities are
      .then(updatedRecord => ({
        slug,
        color,
        size,
        quantity: updatedRecord.get('Number remaining'),
      }));
  });

  return Promise.all(updates);
};

global.handleOrder = exports.handleOrder;
setTimeout(() => {}, 9999999);
