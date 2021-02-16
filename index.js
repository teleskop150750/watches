const mySwiper = new Swiper('.index-top-slider', {
  // Optional parameters
  init: false,
  wrapperClass: 'index-top-slider__wrapper',
  slideClass: 'index-top-slider__slide',
  slideActiveClass: 'index-top-slider__slide--active',
  effect: 'fade',
  loop: true,
  fadeEffect: {
    crossFade: true,
  },

  // loop: true,
  speed: 3000,
  autoplay: {
    delay: 500,
  },
});

mySwiper.init();
