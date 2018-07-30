import { delay } from '../../../helpers';


const leaveDuration = 0.35 * 1000;
const enterDuration = 0.35 * 1000;

const leaveStagger = 0.135 * 1000;
const enterStagger = 0.07 * 1000;

// Old items leaving
export async function leave(el, done) {
  const el2 = el.getElementsByClassName('transform-wrapper')[0];
  const goingRight = this.categoryIndex > this.categories.indexOf(this.prevCategory);

  // Stagger delay
  const oldProducts = this.$store.state.products
    .filter(p => p.categories.includes(this.prevCategory));
  await delay(goingRight
    ? leaveStagger * el.dataset.index // leftmost out first
    : leaveStagger * (oldProducts.length - 1 - el.dataset.index)); // rightmost out first

  // Before
  el2.style.transition = `transform ${leaveDuration / 1000}s ease-in, opacity ${leaveDuration / 1000}s ease-in`;
  el2.style.pointerEvents = 'none';

  // Animate
  el2.style.transform = `translateX(${goingRight ? '-' : ''}90%)`;
  el2.style.opacity = 0;

  // End
  await delay(leaveDuration);
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
  el2.style.transform = `translateX(${goingRight ? '' : '-'}80%)`;
  el2.style.transition = `transform ${enterDuration / 1000}s ease-out, opacity ${enterDuration / 1000}s ease-out`;
}

export async function enter(el, done) {
  const el2 = el.getElementsByClassName('transform-wrapper')[0];
  const goingRight = this.categoryIndex > this.categories.indexOf(this.prevCategory);

  // Wait for old items to leave
  const oldProducts = this.$store.state.products
    .filter(p => p.categories.includes(this.prevCategory));
  if (oldProducts.length) {
    // Until start of new title enter
    await delay((leaveStagger * (oldProducts.length + 1)) + 400);
    await delay(400 - (enterStagger * (this.categoryProducts.length - 0.5)));
  }

  // Stagger delay
  await delay(goingRight
    ? enterStagger * el.dataset.index
    : enterStagger * (this.categoryProducts.length - 1 - el.dataset.index));

  // Animate
  el2.style.opacity = 1;
  el2.style.transform = '';

  await delay(enterDuration);
  el2.style.pointerEvents = '';
  el2.style.transition = '';
  done();
}
