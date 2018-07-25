// Return a promise that resolves after a given time (useful for await)
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Return a copy of an object that contains only some specified keys from the first object
export function pick(object, keys) {
  const out = {};
  keys.forEach((k) => { out[k] = object[k]; });
  return out;
}


// Given an array, return a copy without duplicates
export function uniq(arr) {
  return arr.filter((item, i) => arr.indexOf(item) === i);
}


// Clamp a number to a given range
export function clamp(num, min = 0, max = Infinity) {
  return Math.max(Math.min(num, max), min);
}


// Format a price to a round dollar amount, adding 2 decimal places if necessary (or if
// forceDecimal is set to true)
export function formatPrice(price, forceDecimal = false) {
  const roundedToCent = (Math.round(price * 100) / 100);
  // If the price in dollars has a non-zero cent value, always display it. If the number is an
  // even dollar amount, only include cents if forceDecimal is true.
  return (Math.floor(roundedToCent) === roundedToCent && !forceDecimal)
    ? roundedToCent.toFixed(0)
    : roundedToCent.toFixed(2);
}


// Given an element full of text, move each "line" of the wrapped text into its own div
export function splitWrappedLines(el) {
  // Wrap each word in a span
  el.innerHTML = el.innerText
    .split(/\s/)
    .map(word => `<span>${word}</span>`)
    .join(' ');
  const words = [...el.getElementsByTagName('span')];
  const tops = []; // Array of numbers, each the offsetTop of an element
  const lines = []; // Array of div elements (created on the fly)

  // Detect which word spans belong to which lines by detecting unique Y-positions
  words.forEach((w) => {
    const top = w.offsetTop;
    // New line is necessary
    if (!tops.includes(top)) {
      tops.push(top);
      lines.push([]);
    }

    lines[tops.indexOf(top)].push(w.innerText);
  });

  // Create a div for each line
  const lineElements = lines.map((l) => {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = l.join(' ');
    return line;
  });

  // Remove old word spans
  words.forEach(w => el.removeChild(w));

  // Put new "line" divs into the container
  lineElements.forEach(line => el.appendChild(line));
}
