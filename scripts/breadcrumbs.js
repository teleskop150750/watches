import throttle from './core/throttle.js';

const slider = document.querySelector('.breadcrumbs__wrapper');
const sliderTrack = slider.querySelector('.breadcrumbs__list');
const slides = [...slider.querySelectorAll('.breadcrumbs__item')];
const gap = 8;
let posX1 = 0;
let posX2 = 0;
let posY1 = 0;
let posY2 = 0;
let isSwipe = false;
let isScroll = false;
let allowSwipe = true;
let sliderTrackWidth = sliderTrack.offsetWidth;
const slidesWidth = slides.reduce(
  (sum, current) => sum + current.offsetWidth + gap, 0,
) - gap;
let lastTrf = slidesWidth - sliderTrackWidth;

const trfRegExp = /([-0-9.]+(?=px))/;

let updateVars = () => {
  sliderTrackWidth = sliderTrack.offsetWidth;
  lastTrf = slidesWidth - sliderTrackWidth;

  if (sliderTrackWidth < slidesWidth) {
    sliderTrack.style.transform = `translate3d(${-lastTrf}px, 0px, 0px)`;
  } else {
    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  }
};

export default () => {
  updateVars = throttle(updateVars, 100);
  window.addEventListener('resize', updateVars);

  const swipeAction = (e) => {
    const event = e.type.search('touch') === -1 ? e : e.touches[0];

    const style = sliderTrack.style.transform;
    const transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - event.clientX;
    posX1 = event.clientX;

    posY2 = posY1 - event.clientY;
    posY1 = event.clientY;

    if (!isSwipe && !isScroll) {
      const posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0, 0)`;
    }
  };

  const swipeEnd = () => {
    const style = sliderTrack.style.transform;
    const transform = +style.match(trfRegExp)[0];
    if (transform >= 0) {
      sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    }

    if (-transform > lastTrf) {
      sliderTrack.style.transform = `translate3d(${-lastTrf}px, 0px, 0px)`;
    }

    isScroll = false;
    isSwipe = false;
    allowSwipe = true;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderTrack.classList.add('grab');
    sliderTrack.classList.remove('grabbing');
  };

  const swipeStart = (e) => {
    if (sliderTrackWidth < slidesWidth) {
      const event = e.type.search('touch') === -1 ? e : e.touches[0];

      if (allowSwipe) {
        posX1 = event.clientX;
        posY1 = event.clientY;

        sliderTrack.style.transition = '';

        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);

        sliderTrack.classList.remove('grab');
        sliderTrack.classList.add('grabbing');
      }
    }
  };

  if (sliderTrackWidth < slidesWidth) {
    sliderTrack.style.transform = `translate3d(${-lastTrf}px, 0px, 0px)`;
  } else {
    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
  }

  sliderTrack.classList.add('grab');

  sliderTrack.addEventListener('transitionend', () => { allowSwipe = true; });
  slider.addEventListener('touchstart', swipeStart);
  slider.addEventListener('mousedown', swipeStart);
};
