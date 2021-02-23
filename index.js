// eslint-disable-next-line import/no-named-as-default
import Swiper from './libs/swiper/swiper.js';

const mainSlider = new Swiper('.main-slider', {
  init: false,
  slidesPerView: 1,

  wrapperClass: 'main-slider__inner',
  slideClass: 'main-slider__slide',
  slideActiveClass: 'main-slider__slide--active',
  slidePrevClass: 'main-slider__slide--prev',
  slideNextClass: 'main-slider__slide--next',
  slideDuplicateClass: 'main-slider__slide-duplicate',
  slideDuplicateActiveClass: 'main-slider__slide-duplicate--active',

  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },

  loop: true,
  speed: 3000,
  autoplay: {
    delay: 500,
  },
});

mainSlider.init();

const breakpoint = window.matchMedia('(min-width: 1180px)');
let brandsSlider;

const enableSwiper = () => {
  brandsSlider = new Swiper('.brands-slider', {
    init: false,
    slidesPerView: 1,
    spaceBetween: 50,

    wrapperClass: 'brands-slider__wrapper',
    slideClass: 'brands-slider__slide',
    slideActiveClass: 'brands-slider__slide--active',
    slidePrevClass: 'brands-slider__slide--prev',
    slideNextClass: 'brands-slider__slide--next',
    slideDuplicateClass: 'brands-slider__slide-duplicate',
    slideDuplicateActiveClass: 'brands-slider__slide-duplicate--active',

    loop: true,

    pagination: {
      el: '.brands-slider__pagination',
      bulletClass: 'brands-slider__pagination-bullet',
      bulletActiveClass: 'brands-slider__pagination-bullet--active',
      clickable: true,
    },

    breakpoints: {
      780: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1140: {
        slidesPerView: 3,
      },
    },
  });

  brandsSlider.init();
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    if (brandsSlider !== undefined) {
      brandsSlider.destroy(true, true);
    }

    return;
  }

  enableSwiper();
};

breakpoint.addEventListener('change', () => {
  breakpointChecker();
});

breakpointChecker();
