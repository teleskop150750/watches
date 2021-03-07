import productSlider, { productSliderHandler } from './scripts/productSlider.js';
import quantity from './scripts/quantity.js';
import tabbed from './scripts/tabbed.js';
import review from './scripts/review.js';
// eslint-disable-next-line import/no-named-as-default
import Swiper from './libs/swiper/swiper.js';
import singleSlider from './scripts/singleSlider.js';

productSlider.init();
productSliderHandler();

const zoomSlider = new Swiper('.zoom-slider', {
  init: false,
  slidesPerView: 1,

  wrapperClass: 'product-slider__wrapper',
  slideClass: 'product-slider__slide',
  slideActiveClass: 'product-slider__slide--active',
  slidePrevClass: 'product-slider__slide--prev',
  slideNextClass: 'product-slider__slide--next',
  slideDuplicateClass: 'product-slider__slide-duplicate',
  slideDuplicateActiveClass: 'product-slider__slide-duplicate--active',

  pagination: {
    el: '.product-slider__pagination',
    bulletClass: 'product-slider__pagination-bullet',
    bulletActiveClass: 'product-slider__pagination-bullet--active',
    clickable: true,
  },
});
zoomSlider.init();

tabbed();
review();
const viewed = new Swiper('.slider-viewed', singleSlider);
const related = new Swiper('.slider-related', singleSlider);
viewed.init();
related.init();

quantity();
