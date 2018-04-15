import loader from './loading';

window.loader = loader;
// Set up as soon as possible
document.addEventListener('DOMContentLoaded', () => loader.setup());
// Adjust widths again when fonts are loaded just in case
window.addEventListener('load', () => loader.setup());
// Complete progress bar when page loads
window.addEventListener('load', () => setTimeout(() => { loader.progress = 1; }, 500));
