import { pick, delay } from '../../helpers';

// Send request to development server if running locally
let base;
if (['localhost', '0.0.0.0'].includes(window.location.hostname)) base = 'http://0.0.0.0:3000';
if (window.location.hostname.includes('now.sh')) base = 'https://sleeplater-api.now.sh';
else base = 'https://api.sleeplater.co';

// Send request to development server if running locally
const url = `${base}/contact`;


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

    valid() {
      const validatableChildren = this.$children.filter(c => typeof c.valid !== 'undefined');
      const validChildren = this.$children.filter(c => c.valid);
      return validatableChildren.length === validChildren.length;
    },
  },

  data: () => ({
    submitResetTimeout: undefined,
    mode: 'Work with us',
    buttonState: 'static',
    hasAttempted: false,
  }),


  methods: {
    /* eslint-disable brace-style */
    async submit() {
      // You can only press the "submit" button, can't submit while it's in a "loading,"
      // "completed," or "failed" state
      if (this.buttonState !== 'static') return;

      // If any inputs are invalid reveal that and stop
      if (!this.valid) {
        this.buttonState = 'failed';
        await delay(1500);
        this.hasAttempted = true;
        this.buttonState = 'static';
        return;
      }

      // Show loading
      this.buttonState = 'loading';

      // Send request to back-end
      const result = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only some properties of this
        body: JSON.stringify(pick(this, ['name', 'email', 'phone', 'message', 'mode'])),
      });

      // If request succeeded
      if (result.status === 200) {
        this.buttonState = 'completed';
        await delay(1500);
        this.reset();
      }
      // If server rejected request
      else {
        this.buttonState = 'failed';
        await delay(1500);
        // Record that the user has attempted to submit the form once
        // This will enable as-you-type validation on the whole form
        this.hasAttempted = true;
        this.buttonState = 'static';
      }
    },
    /* eslint-enable brace-style */

    // Clear the form
    reset() {
      this.hasAttempted = false;
      this.buttonState = 'static';
      this.name = '';
      this.email = '';
      this.phone = '';
      this.message = '';
    },
  },
};
