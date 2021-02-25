/* eslint-disable no-unused-vars */
export default class HeightToggle {
  target = null;

  button = null;

  opening = '';

  open = '';

  beforeSlideUp = () => { };

  beforeSlideDown = () => { };

  init() {
    this.button.addEventListener('click', this.slideToggle);
  }

  constructor(options = {}) {
    this.extend(options);
  }

  extend(options) {
    Object.entries(options).forEach(([k, v]) => {
      this[k] = v;
    });
  }

  /* SLIDE UP */
  slideUp() {
    this.beforeSlideUp();
    this.target.style.height = `${this.target.offsetHeight}px`;
    this.target.style.height = `${this.target.offsetHeight}px`;
    this.target.classList.remove(this.open);
    this.target.classList.add(this.opening);
    this.target.style.height = 0;
    const transitionendHandler = () => {
      this.target.style.removeProperty('height');
      this.target.classList.remove(this.opening);
      this.target.removeEventListener('transitionend', transitionendHandler);
      this.button.addEventListener('click', this.slideToggle);
    };
    this.target.addEventListener('transitionend', transitionendHandler);
  }

  /* SLIDE DOWN */
  slideDown() {
    this.beforeSlideDown();
    this.target.classList.add(this.opening);
    this.target.style.height = `${this.target.scrollHeight}px`;
    const transitionendHandler = () => {
      this.target.style.removeProperty('height');
      this.target.classList.add(this.open);
      this.target.classList.remove(this.opening);
      this.target.removeEventListener('transitionend', transitionendHandler);
      this.button.addEventListener('click', this.slideToggle);
    };
    this.target.addEventListener('transitionend', transitionendHandler);
  }

  /* TOOGLE */
  slideToggle = () => {
    this.button.removeEventListener('click', this.slideToggle);
    if (this.target.classList.contains(this.open)) {
      this.slideUp();
    } else {
      this.slideDown();
    }
  }
}
