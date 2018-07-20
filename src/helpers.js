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
