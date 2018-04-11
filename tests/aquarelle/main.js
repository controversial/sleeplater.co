/* global Aquarelle */
const aqua = new Aquarelle('image.jpg', 'mask.png', {
  autoplay: true,
  duration: 4000,

  fromAmplitude: 20,
  toAmplitude: 0,
  fromFrequency: 5,
  toFrequency: 5,

  fromOffset: -30,
  toOffset: 20,
});

aqua.addEventListener('created', () => {
  const canvas = aqua.getCanvas();
  document.body.appendChild(canvas);
});
