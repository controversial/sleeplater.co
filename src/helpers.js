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


// Format an address like it should go on a shipping label
// I have no idea how internationally compliant this is
export function formatAddress({ name, streetAddress, city, country, zip, state }) { // eslint-disable-line object-curly-newline, max-len
  return [
    name,
    streetAddress,
    `${city}, ${state} ${zip}`,
    country,
  ].join('\n');
}


// Zip codes for which cash payments are available
export const cashZipCodes = ['12561', '12525', '12528', '12486', '12472', '12548', '12515'];

// Get the shipping cost, in USD, for shipping for a given zip code, country, and number of items
export function getShippingCost(zip, country, itemsCount) {
  // Classify address as local, domestic, canada, or international
  let addressClassification;
  if (country === 'United States' && cashZipCodes.includes(zip.trim())) addressClassification = 'local';
  else if (country === 'United States') addressClassification = 'domestic';
  else if (country === 'Canada') addressClassification = 'canada';
  else addressClassification = 'international';

  // Determine and return shipping cost
  return {
    local: 2,
    domestic: 7.25,
    canada: 14.5,
    ...(itemsCount < 3 ? { international: 25.5 } : { international: 50 }),
  }[addressClassification];
}


// Wrap each word in a span
export function wordWrap(el, deep = true, level = 0) {
  // If it's a text node, replace it with a span for each word
  if (el.nodeType === Node.TEXT_NODE) {
    const newHTML = el.textContent
      .split(/\s/)
      .map(word => `<span class="split-helper-span">${word}</span>`)
      .join(' ');
    const temp = document.createElement('span');
    el.parentNode.replaceChild(temp, el);
    temp.insertAdjacentHTML('beforebegin', newHTML);
    temp.remove();
  // Otherwise recur for each child node
  } else if (level < 1 || deep) {
    [...el.childNodes].forEach(wordWrap, deep, level + 1);
  }
  return el;
}


// Given an element full of text, move each "line" of the wrapped text into its own div
export function splitWrappedLines(el) {
  // Wrap each word in a span
  wordWrap(el, false);
  const words = [...el.children].filter(c => c.tagName === 'SPAN');
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

    lines[tops.indexOf(top)].push(w);
  });

  // Create a div for each line
  const lineElements = lines.map((l) => {
    const line = document.createElement('div');
    line.className = 'line';
    l.forEach((word, i) => {
      line.appendChild(word);
      if (i < l.length - 1) line.appendChild(document.createTextNode(' '));
    });
    return line;
  });

  // Put new "line" divs into the container
  lineElements.forEach(line => el.appendChild(line));
}
