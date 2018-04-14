import textSplit from './textSplit';

window.textSplit = textSplit;
window.addEventListener('load', () => {
  textSplit.setup();
});
