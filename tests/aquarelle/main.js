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


let startTime;
const easeOutSin = x => Math.sin(0.5 * Math.PI * x);

// Play aquarelle animation from start to finish over a given duration *with easing*, necessary
// because Aquarelle does not offer easing out of the box. This works on forcably stopped Aquarelle
// instances (see below cancelAnimationFrame). Very much a hack but it works.
function animate() {
  if (!startTime) startTime = Date.now();

  if ((Date.now() - startTime) < aqua.options.duration) {
    // 0 to 1
    const progress = easeOutSin((Date.now() - startTime) / aqua.options.duration);
    aqua.render((progress - aqua.progress) * (aqua.options.duration / 1000));
    requestAnimationFrame(animate);
  } else {
    aqua.render(1 - aqua.progress);
  }
}

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

  animate();
});
