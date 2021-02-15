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
  // slidesPerView: 1,

  // If we need pagination
  // pagination: {
  //   el: '.slider__pagination',
  //   bulletClass: 'slider__bullet',
  //   bulletActiveClass: 'slider__bullet--active',
  //   clickable: true,
  // },

});

mySwiper.init();
