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

export function clamp(num, min, max) {
  return Math.max(Math.min(num, max), min);
}
