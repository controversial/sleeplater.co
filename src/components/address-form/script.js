const countries = require('country-list')().getNames();


export default {
  props: ['show-validation'],

  data: () => ({
    countries,
    cashZipCodes: [12561, 12525, 12528, 12486, 12472, 12548, 12515],
    email: '',
    name: '',
    streetAddress: '',
    city: '',
    country: 'United States',
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

    countryValidForCash() { return this.country === 'United States'; },
    stateValidForCash() { return ['new york', 'ny'].includes(this.state.toLowerCase()); },
    zipValidForCash() { return this.cashZipCodes.includes(parseInt(this.zip, 10)); },
    cashRegionInvalid() {
      return this.$store.state.paymentMethod === 'cash'
        && !(this.countryValidForCash && this.stateValidForCash && this.zipValidForCash);
    },

    valid() {
      const validatableChildren = this.$children.filter(c => typeof c.valid !== 'undefined');
      const validChildren = this.$children.filter(c => c.valid);
      return validatableChildren.length === validChildren.length && !this.cashRegionInvalid;
    },
  },
};
