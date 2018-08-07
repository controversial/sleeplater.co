import { cashZipCodes } from '../../helpers';
const countries = require('country-list')().getNames();


export default {
  props: ['show-validation'],

  data: () => ({
    // Info needed for form
    countries,
    cashZipCodes,
  }),

  computed: {
    // Form values come in as computed properties from vuex with setters for mutation
    ...Object.assign({}, ...['email', 'name', 'streetAddress', 'city', 'state', 'zip', 'country']
      .map(key => ({
        [key]: {
          get() { return this.$store.state.address[key]; },
          set(value) { this.$store.commit('addressEdit', { key, value }); },
        },
      }))),

    countryValidForCash() { return this.country === 'United States'; },
    stateValidForCash() { return ['new york', 'ny'].includes(this.state.toLowerCase().trim()); },
    zipValidForCash() { return this.cashZipCodes.includes(this.zip.trim()); },
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
