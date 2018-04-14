const textSplit = {
  elem: document.getElementById('main-title'),

  setup() {
    [...this.elem.querySelectorAll('h1 > span')].forEach((child) => {
      const text = child.textContent;
      child.innerHTML = '';
      [...text].forEach((letter, i) => {
        const span = document.createElement('span');
        span.innerHTML = letter;
        span.classList.add(['sleep', 'later'][i % 2]); // class "sleep" for items 0, 2, 4 etc; "later" for 1, 3, 5 etc
        span.style.transitionDelay = `${Math.floor(i / 2) / 20}s`; // Letters animate in pairs, each pair 1/20 of a second apart
        child.appendChild(span);
      });
      // Kerning adjustment
      // Tries to find a balance between letters looking
      // properly-kerned while collapsed and letters looking
      // properly-kerned while expanded. Moves the width of each
      // letter closer to the average width of all letters by a
      // specified amount (0 has no effect, 1 has complete effect)
      const spans = [...child.childNodes];
      const letterWidths = spans.map(span => span.offsetWidth);
      const averageWidth = letterWidths.reduce((a, b) => a + b) / letterWidths.length;
      const amount = 0.5;
      spans.forEach((elem) => {
        const adjustedWidth = (elem.offsetWidth * (1 - amount)) + (averageWidth * amount);
        elem.style.width = `${adjustedWidth / parseFloat(getComputedStyle(elem).fontSize)}em`;
      });
    });
  },

  expand() { this.elem.classList.add('expanded'); },
  collapse() { this.elem.classList.remove('expanded'); },
  toggle() { this.elem.classList.toggle('expanded'); },
};

window.addEventListener('load', () => {
  textSplit.setup();

  textSplit.elem.addEventListener('click', () => textSplit.toggle());
});
