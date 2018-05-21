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
  }),

  methods: {
    submit() {
      clearTimeout(this.submitResetTimeout);
      this.$refs.submit.state = 'loading';
      const url = ['localhost', '0.0.0.0'].includes(window.location.hostname)
        ? 'http://0.0.0.0:3000/'
        : 'https://contact-form.now.sh/';
      const { name, email, phone, message, mode } = this; // eslint-disable-line object-curly-newline, max-len

      // Send request to backend

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, mode }), // eslint-disable-line object-curly-newline, max-len
      })
        .then((r) => {
          if (r.status === 200) this.$refs.submit.state = 'completed';
          else this.$refs.submit.state = 'failed';
          // Return to normal "submit" button after a short delay
          this.submitResetTimeout = setTimeout(() => { this.$refs.submit.state = 'static'; }, 1500);
        });
    },
  },
};
