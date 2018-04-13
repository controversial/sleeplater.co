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
  const canvas = aqua.getCanvas();
  document.body.appendChild(canvas);
});
