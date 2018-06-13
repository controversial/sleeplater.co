// Send request to development server if running locally
const apiBase = ['localhost', '0.0.0.0'].includes(window.location.hostname)
  ? 'http://0.0.0.0:3000'
  : 'https://sleeplater-backend.now.sh';


export default {
  data: () => ({
    products: [],
  }),

  computed: {
    categories() {
      return this.products
        .map(p => p.categories) // get categories
        .reduce((a, b) => a.concat(b), []) // flatten
        .filter((n, i, list) => list.indexOf(n) === i); // Remove duplicates
    },
  },

  mounted() {
    // Get products list from backend
    fetch(`${apiBase}/products`)
      .then(r => r.json())
      .then((products) => { this.products = products; });
  },
};
