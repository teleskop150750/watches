// eslint-disable-next-line import/no-named-as-default
import Swiper from '../libs/swiper/swiper.js';
import { body } from './globalVars.js';

const sliderObject = {
  init: false,
  slidesPerView: 1,
  loop: true,

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

  navigation: {
    prevEl: '.product-slider__button-prev',
    nextEl: '.product-slider__button-next',
  },

  breakpoints: {
    900: {
      slidesPerView: 2,
    },
  },
};

const productSlider = new Swiper('.product-slider', sliderObject);

export default productSlider;

export const productSliderHandler = () => {
  const imageHandler = (e) => {
    sliderObject.initialSlide = productSlider.activeIndex - 1;
    sliderObject.zoom = {
      zoomedSlideClass: 'slide-zoomed',
      containerClass: 'product-slider__slide-zoom',
    };
    sliderObject.breakpoints = {};
    sliderObject.navigation = {};

    const image = e.target;
    const sliderWrapper = image.closest('.product-slider__wrapper').cloneNode(true);
    const zoomSlider = document.createElement('div');
    const zoomSliderButtonCloseHtml = `<button class="zoom-slider__close" aria-label="закрыть">
    <span class="zoom-slider__close--liner"></span>
    <span class="zoom-slider__close--liner"></span>
  </button>`;
    const pagination = '<div class="product-slider__pagination"></div>';

    zoomSlider.classList.add('zoom-slider');
    zoomSlider.insertAdjacentHTML('afterbegin', zoomSliderButtonCloseHtml);
    zoomSlider.append(sliderWrapper);
    zoomSlider.insertAdjacentHTML('beforeend', pagination);
    body.append(zoomSlider);
    body.classList.add('page__body--lock');

    const slider = new Swiper('.zoom-slider', sliderObject);
    slider.init();

    const zoomSliderButtonClose = zoomSlider.querySelector('.zoom-slider__close');
    zoomSliderButtonClose.addEventListener('click', () => {
      slider.destroy();
      zoomSlider.remove();
      body.classList.remove('page__body--lock');
    });
  };

  const images = document.querySelectorAll('.product-slider__slide-img');
  images.forEach((img) => {
    img.addEventListener('click', imageHandler);
  });
};
