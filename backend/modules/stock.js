const { promisify } = require('util');
const GoogleSheet = require('google-spreadsheet');

// Load environment variables from .env file
// Should define GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SPREADSHEET_KEY for this module
require('dotenv').config();

const document = new GoogleSheet(process.env.GOOGLE_SPREADSHEET_KEY);
let sheet;

const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/__/g, '\n'),
};

async function startup() {
  await promisify(document.useServiceAccountAuth)(credentials);
  const info = await promisify(document.getInfo)();
  sheet = info.worksheets[0]; // first sheet in the document is fine
}

module.exports.getStock = async function getStock() {
  if (!sheet) await startup();

  const rows = await promisify(sheet.getRows)();
  const stock = rows.map(r => ({
    id: r.id,
    color: r.color,
    size: r.size,
    quantity: r.quantity,
  }));

  return stock.reduce((accum, product) => {
    if (!accum[product.id]) accum[product.id] = {};
    if (!accum[product.id][product.color]) accum[product.id][product.color] = {};
    accum[product.id][product.color][product.size] = parseInt(product.quantity, 10);
    return accum;
  }, {});
};

module.exports.handleOrder = async function handleOrder(items) {
  if (!sheet) await startup();
  const rows = await promisify(sheet.getRows)();

  const updates = items.map(({ id, color, size, quantity }) => { // eslint-disable-line object-curly-newline, max-len
    const row = rows.find(r => r.id === id && r.color === color && r.size === size);
    row.quantity = parseInt(row.quantity, 10) - quantity;
    return promisify(row.save)();
  });
  return Promise.all(updates);
};
