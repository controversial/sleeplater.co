import { delay } from '../../../helpers';


const leaveDuration = 0.35;
const enterDuration = 0.35;

const stagger = 0.075 * 1000;

// Old items leaving
export async function leave(el, done) {
  const goingRight = this.categoryIndex > this.categories.indexOf(this.prevCategory);

  // Stagger delay
  const oldProducts = this.products.filter(p => p.categories.includes(this.prevCategory));
  await delay(goingRight
    ? stagger * el.dataset.index // leftmost out first
    : stagger * (oldProducts.length - 1 - el.dataset.index)); // rightmost out first

  // Before
  el.style.transition = `transform ${leaveDuration}s, opacity ${leaveDuration}s`;
  el.style.pointerEvents = 'none';

  // Animate
  const initialTransform = el.style.transform;
  el.style.transform = `${initialTransform} translateX(${goingRight ? '-' : ''}50%)`;
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
  const goingRight = this.categoryIndex > this.categories.indexOf(this.prevCategory);

  el.style.opacity = 0;
  el.style.pointerEvents = 'none';
  el.dataset.initialTransform = el.style.transform;
  el.style.transform = `${el.dataset.initialTransform} translateX(${goingRight ? '' : '-'}50%)`;
  el.style.transition = `transform ${enterDuration}s, opacity ${enterDuration}s`;
}

export async function enter(el, done) {
  const goingRight = this.categoryIndex > this.categories.indexOf(this.prevCategory);

  // Wait for old items to leave
  const oldProducts = this.products.filter(p => p.categories.includes(this.prevCategory));
  if (oldProducts.length) await delay((leaveDuration * 600) + (stagger * oldProducts.length));

  // Stagger delay
  await delay(goingRight
    ? stagger * el.dataset.index
    : stagger * (this.categoryProducts.length - 1 - el.dataset.index));

  // Animate
  el.style.opacity = 1;
  el.style.transform = el.dataset.initialTransform;

  await delay(enterDuration * 1000);
  el.style.pointerEvents = '';
  el.style.transition = '';
  done();
}
