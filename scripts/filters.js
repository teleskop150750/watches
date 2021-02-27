import heightToggle from './heightToggle.js';
import nouislider from '../libs/noUiSlider/nouislider.js';
import createRandeSlider from './createRandeSlider.js';
import filterPrice, { setRangeSlider } from './filter-price.js';

const clearPriceSlider = (slider, inputsArr) => {
  const inputs = inputsArr;
  inputs[0].value = 0;
  inputs[1].value = 50000;
  setRangeSlider(slider, 0, 0);
  setRangeSlider(slider, 1, 50000);
};

export default () => {
  let priceSlider = document.querySelector('.filter-price__slider');
  const filterPriceInputs = [...document.querySelectorAll('.filter-price__input')];
  const noUiSlider = nouislider();
  priceSlider = createRandeSlider(noUiSlider, priceSlider, 1000, 0, 50000);
  filterPrice(priceSlider, filterPriceInputs);

  const filters = [...document.querySelectorAll('.filter')];

  const filterToggle = function filterToggle(button, filter) {
    const filterBody = filter.querySelector('.filter__body');
    heightToggle(button, filterBody, filter, 'filter--hidden');
  };

  const checkShow = (checks) => {
    checks.forEach((check) => {
      check.classList.remove('check--hidden');
    });
  };

  const checkHide = (checks) => {
    checks.forEach((check, i) => {
      if (i > 5) {
        check.classList.add('check--hidden');
      }
    });
  };

  const checkToggleAll = (buttonShowAll, checks) => {
    const hiddenСhecks = checks.filter((check) => check.classList.contains('check--hidden'));
    if (hiddenСhecks.length > 0) {
      checkShow(hiddenСhecks);
      // eslint-disable-next-line no-param-reassign
      buttonShowAll.textContent = 'Скрыть';
    } else {
      checkHide(checks);
      // eslint-disable-next-line no-param-reassign
      buttonShowAll.textContent = 'Показать ещё';
    }
  };

  const checkInputHandler = (checks, filter) => {
    let array = checks;
    array = array.filter((item) => item.checked);
    if (array.length > 0) {
      filter.classList.add('filter--check');
    } else {
      filter.classList.remove('filter--check');
    }
  };

  filters.forEach((filter) => {
    const filterButton = filter.querySelector('.filter__toggle');
    const checks = [...filter.querySelectorAll('.check')];
    const checksInput = [...filter.querySelectorAll('.check__input')];
    const buttonShowAll = filter.querySelector('.filter__show-all');

    filterToggle(filterButton, filter);

    checksInput.forEach((checkInput) => {
      checkInput.addEventListener('change', () => {
        checkInputHandler(checksInput, filter);
      });
    });

    checkHide(checks);

    buttonShowAll.addEventListener('click', () => {
      checkToggleAll(buttonShowAll, checks);
    });
  });

  const clearButton = document.querySelector('.filters__clear');
  clearButton.addEventListener('click', () => {
    clearPriceSlider(priceSlider, filterPriceInputs);

    filters.forEach((filter) => {
      filter.classList.remove('filter--check');
      const checksInput = [...filter.querySelectorAll('.check__input')];

      checksInput.forEach((checkInput) => {
        const input = checkInput;
        input.checked = false;
      });
    });
  });
};
