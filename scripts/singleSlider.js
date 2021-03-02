// eslint-disable-next-line import/no-named-as-default
import Swiper from '../libs/swiper/swiper.js';

export const viewed = new Swiper('.slider-viewed', {
  init: false,
  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: true,
  loopedSlides: 4,

  wrapperClass: 'single-slider__wrapper',
  slideClass: 'single-slider__slide',
  slideActiveClass: 'single-slider__slide--active',
  slidePrevClass: 'single-slider__slide--prev',
  slideNextClass: 'single-slider__slide--next',
  slideDuplicateClass: 'single-slider__slide-duplicate',
  slideDuplicateActiveClass: 'single-slider__slide-duplicate--active',

  navigation: {
    prevEl: '.single-slider__button-prev',
    nextEl: '.single-slider__button-next',
  },
});

export const related = new Swiper('.slider-related', {
  init: false,
  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: true,
  loopedSlides: 4,

  wrapperClass: 'single-slider__wrapper',
  slideClass: 'single-slider__slide',
  slideActiveClass: 'single-slider__slide--active',
  slidePrevClass: 'single-slider__slide--prev',
  slideNextClass: 'single-slider__slide--next',
  slideDuplicateClass: 'single-slider__slide-duplicate',
  slideDuplicateActiveClass: 'single-slider__slide-duplicate--active',

  navigation: {
    prevEl: '.single-slider__button-prev',
    nextEl: '.single-slider__button-next',
  },
});
