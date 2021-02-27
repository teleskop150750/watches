import nouislider from '../libs/noUiSlider/nouislider.js';

const noUiSlider = nouislider();

export default () => {
  const slider = document.querySelector('.filter-price__slider');
  const inputs = document.querySelectorAll('.filter-price__input');

  // eslint-disable-next-line no-undef
  noUiSlider.create(slider, {
    start: [500, 999999],
    connect: true,
    step: 0,
    range: {
      min: [500],
      max: [999999],
    },
  });
};
