import { pick, delay } from '../../helpers';

// Send request to development server if running locally
const url = ['localhost', '0.0.0.0'].includes(window.location.hostname)
  ? 'http://0.0.0.0:3000/contact'
  : 'https://sleeplater-backend.now.sh/contact';


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
    hasAttempted: false,
  }),


  methods: {
    /* eslint-disable brace-style */
    async submit() {
      // You can only press the "submit" button, can't submit while it's in a "loading,"
      // "completed," or "failed" state
      if (this.$refs.submit.state !== 'static') return;

      // If any inputs are invalid reveal that and stop
      if (!this.valid) {
        this.$refs.submit.state = 'failed';
        await delay(1500);
        this.hasAttempted = true;
        this.$refs.submit.state = 'static';
        return;
      }

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
