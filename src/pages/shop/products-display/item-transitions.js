import { delay } from '../../../helpers';


const leaveDuration = 0.35;
const enterDuration = 0.35;

const stagger = 0.075 * 1000;

// Old items leaving
export async function leave(el, done) {
  const el2 = el.getElementsByClassName('transform-wrapper')[0];
  const goingRight = this.categoryIndex > this.categories.indexOf(this.prevCategory);

  // Stagger delay
  const oldProducts = this.$store.state.products
    .filter(p => p.categories.includes(this.prevCategory));
  await delay(goingRight
    ? stagger * el.dataset.index // leftmost out first
    : stagger * (oldProducts.length - 1 - el.dataset.index)); // rightmost out first

  // Before
  el2.style.transition = `transform ${leaveDuration}s, opacity ${leaveDuration}s`;
  el2.style.pointerEvents = 'none';

  // Animate
  el2.style.transform = `translateX(${goingRight ? '-' : ''}50%)`;
  el2.style.opacity = 0;

  // End
  await delay(leaveDuration * 1000);
  done();
}


//
// New items coming in
//


// Before
export async function beforeEnter(el) {
  const el2 = el.getElementsByClassName('transform-wrapper')[0];
  const goingRight = this.categoryIndex > this.categories.indexOf(this.prevCategory);

  el2.style.opacity = 0;
  el2.style.pointerEvents = 'none';
  el2.style.transform = `translateX(${goingRight ? '' : '-'}50%)`;
  el2.style.transition = `transform ${enterDuration}s, opacity ${enterDuration}s`;
}

export async function enter(el, done) {
  const el2 = el.getElementsByClassName('transform-wrapper')[0];
  const goingRight = this.categoryIndex > this.categories.indexOf(this.prevCategory);

  // Wait for old items to leave
  const oldProducts = this.$store.state.products
    .filter(p => p.categories.includes(this.prevCategory));
  if (oldProducts.length) await delay((leaveDuration * 400) + (stagger * oldProducts.length) + 750);

  // Stagger delay
  await delay(goingRight
    ? stagger * el.dataset.index
    : stagger * (this.categoryProducts.length - 1 - el.dataset.index));

  // Animate
  el2.style.opacity = 1;
  el2.style.transform = '';

  await delay(enterDuration * 1000);
  el2.style.pointerEvents = '';
  el2.style.transition = '';
  done();
}
