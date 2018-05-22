import { pick, delay } from '../../helpers';

const url = ['localhost', '0.0.0.0'].includes(window.location.hostname)
  ? 'http://0.0.0.0:3000/'
  : 'https://contact-form.now.sh/';


export default {
  // getters/setters so that each item can be reflected persistently in vuex
  computed: {
    name: {
      get() { return this.$store.state.contactForm.name; },
      set(value) { this.$store.commit({ type: 'updateContactForm', item: 'name', value }); },
    },
    email: {
      get() { return this.$store.state.contactForm.email; },
      set(value) { this.$store.commit({ type: 'updateContactForm', item: 'email', value }); },
    },
    phone: {
      get() { return this.$store.state.contactForm.phone; },
      set(value) { this.$store.commit({ type: 'updateContactForm', item: 'phone', value }); },
    },
    message: {
      get() { return this.$store.state.contactForm.message; },
      set(value) { this.$store.commit({ type: 'updateContactForm', item: 'message', value }); },
    },

    heading() {
      return {
        'Work with us': "Let's work together",
        'Ask a question': 'Ask us a question',
        'Just say hi': 'Hey there!',
      }[this.mode];
    },
    messageBoxLabel() {
      return {
        'Work with us': 'Project details',
        'Ask a question': 'Your question',
        'Just say hi': 'Your message',
      }[this.mode];
    },
  },

  data: () => ({
    submitResetTimeout: undefined,
    mode: 'Work with us',
    hasAttempted: false,
  }),


  methods: {
    /* eslint-disable brace-style */
    async submit() {
      if (this.$refs.submit.state !== 'static') return;

      // Show loading
      this.$refs.submit.state = 'loading';

      // Send request to back-end
      const result = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only some properties of this
        body: JSON.stringify(pick(this, ['name', 'email', 'phone', 'message', 'mode'])),
      });

      // If request succeeded
      if (result.status === 200) {
        this.$refs.submit.state = 'completed';
        await delay(1500);
        this.reset();
      }
      // If server rejected request
      else {
        this.$refs.submit.state = 'failed';
        await delay(1500);
        // Record that the user has attempted to submit the form once
        // This will enable as-you-type validation on the whole form
        this.hasAttempted = true;
        this.$refs.submit.state = 'static';
      }
    },
    /* eslint-enable brace-style */

    // Clear the form
    reset() {
      this.hasAttempted = false;
      this.$refs.submit.state = 'static';
      this.name = '';
      this.email = '';
      this.phone = '';
      this.message = '';
    },
  },
};
