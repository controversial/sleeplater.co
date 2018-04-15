import textSplit from './textSplit';

window.textSplit = textSplit;
// Set up as soon as possible
document.addEventListener('DOMContentLoaded', () => textSplit.setup());
// Adjust widths again when fonts are loaded just in case
window.addEventListener('load', () => textSplit.setup());
// Complete progress bar when page loads
window.addEventListener('load', () => setTimeout(() => { textSplit.progress = 1; }, 500));
