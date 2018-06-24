import { delay } from '../../../helpers';


const leaveDuration = 0.35;
const enterDuration = 0.35;


// Old items leaving
export async function leave(el, done) {
  // Delay
  await delay(0 * el.dataset.index);

  // Before
  el.style.transition = `transform ${leaveDuration}s, opacity ${leaveDuration}s`;
  el.style.pointerEvents = 'none';

  // Animate
  const initialTransform = el.style.transform;
  el.style.transform = `${initialTransform} translateX(-50%)`;
  el.style.opacity = 0;

  // End
  await delay(leaveDuration * 1000);
  done();
}


//
// New items coming in
//


// Before
export async function beforeEnter(el) {
  el.style.opacity = 0;
  el.style.pointerEvents = 'none';
  el.dataset.initialTransform = el.style.transform;
  el.style.transform = `${el.dataset.initialTransform} translateX(50%)`;
  el.style.transition = `transform ${enterDuration}s, opacity ${enterDuration}s`;
}

export async function enter(el, done) {
  // Wait for old items to leave
  const oldProducts = this.products.filter(p => p.categories.includes(this.prevCategory));
  if (oldProducts.length) await delay(450 + (0 * oldProducts.length));

  // Animate
  el.style.opacity = 1;
  el.style.transform = el.dataset.initialTransform;

  await delay(enterDuration * 1000);
  el.style.pointerEvents = '';
  el.style.transition = '';
  done();
}
