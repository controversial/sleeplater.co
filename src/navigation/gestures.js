// Easy functions for scroll and swipe gestures for going up and down in navigation


export class ScrollHandler {
  constructor(upFunc, downFunc) {
    this.upFunc = upFunc;
    this.downFunc = downFunc;
    this.lastScrollNav = 0;
  }

  onWheel(e) {
    if (Math.abs(e.deltaY) > 15 && new Date() - this.lastScrollNav > 650) {
      this[e.deltaY > 0 ? 'downFunc' : 'upFunc']();
      this.lastScrollNav = new Date();
    }
  }
}

export class SwipeHandler {
  constructor(upFunc, downFunc) {
    this.upFunc = upFunc;
    this.downFunc = downFunc;
  }

  onTouchStart(e) {
    if (e.touches.length > 1) return;
    this.touchStartPosition = [e.touches[0].clientX, e.touches[0].clientY];
  }

  onTouchMove(e) {
    if (e.touches.length > 1) return;
    const pos = [e.touches[0].clientX, e.touches[0].clientY];
    const delta = [pos[0] - this.touchStartPosition[0], pos[1] - this.touchStartPosition[1]];

    if (Math.abs(delta[1]) > 20 && this.canTouchNav) {
      this[delta[1] > 0 ? 'upFunc' : 'downFunc']();
      this.canTouchNav = false;
    }
  }

  onTouchEnd() {
    this.canTouchNav = true;
  }
}
