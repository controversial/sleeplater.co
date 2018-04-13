/* global Aquarelle */
const aqua = new Aquarelle('image2.jpg', 'mask2.png', {
  autoplay: true,
  duration: 4000,

  fromAmplitude: 20,
  toAmplitude: 0,
  fromFrequency: 5,
  toFrequency: 5,

  fromOffset: -385,
  toOffset: 50,
});

aqua.addEventListener('created', () => {
  // Stop aquarelle
  // Aquarelle starts a requestAnimationFrame render loop as soon as the library is loaded, which is
  // both performance-heavy and inflexible. Here we stop that loop, and we call
  // Aquarelle.prototype.render ourselves so that we can control the animation more precisely in our
  // own render loop.
  const currentFrame = requestAnimationFrame(() => {});
  cancelAnimationFrame(currentFrame - 1);

  // Add aquarelle to DOM
  const canvas = aqua.getCanvas();
  document.body.appendChild(canvas);
});
