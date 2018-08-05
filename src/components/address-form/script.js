const countries = require('country-list')().getNames();


export default {
  props: ['show-validation'],

  data: () => ({
    countries,
    cashZipCodes: [12561, 12525, 12528, 12486, 12472, 12548, 12515],
    name: '',
    streetAddress: '',
    city: '',
    country: '',
    zip: '',
    state: '',
  }),

  computed: {
    address() {
      const { name, line1, line2, city, country, zip, state } = this; // eslint-disable-line object-curly-newline, max-len
      return [
        name,
        line1,
        line2,
        `${city}, ${state} ${zip}`,
        country,
      ];
    },

    zipValid() { return this.cashZipCodes.includes(parseInt(this.zip, 10)); },
  },
};
