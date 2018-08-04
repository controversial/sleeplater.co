// Load environment variables from .env file
// Should define AIRTABLE_API_KEY and AIRTABLE_BASE_ID for this module
require('dotenv').config();

const Airtable = require('airtable');
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

module.exports.getProducts = async function getProducts() {
};
