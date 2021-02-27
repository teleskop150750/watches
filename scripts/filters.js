import { body } from './globalVars.js';
import heightToggle from './heightToggle.js';
import nouislider from '../libs/noUiSlider/nouislider.js';
import createRandeSlider from './createRandeSlider.js';
import filterPrice, { setRangeSlider } from './filter-price.js';
import pageLock from './pageLock.js';
import pageUnlock from './pageUnlock.js';

const clearPriceSlider = (slider, inputsArr) => {
  const inputs = inputsArr;
  inputs[0].value = 0;
  inputs[1].value = 50000;
  setRangeSlider(slider, 0, 0);
  setRangeSlider(slider, 1, 50000);
};

export default () => {
  const filtersOpenButton = document.querySelector('.products__header-button--filters');
  const filtersCloseButton = document.querySelector('.filters__close');
  const filtersWrapper = document.querySelector('.filters');
  const filtersInner = document.querySelector('.filters__inner');
  const filtersOverlay = document.querySelector('.filters-overlay');

  const filtersOpen = () => {
    pageLock(body);
    filtersWrapper.classList.add('filters--active');
    filtersInner.classList.add('filters__inner--active');
    filtersOverlay.classList.add('filters-overlay--active');
    filtersCloseButton.focus();
  };

  const filtersClose = () => {
    filtersInner.classList.remove('filters__inner--active');
    filtersOverlay.classList.remove('filters-overlay--active');

    const transitionendHandler = () => {
      filtersOpenButton.focus();
      filtersWrapper.classList.remove('filters--active');
      pageUnlock(body);
      filtersInner.removeEventListener('transitionend', transitionendHandler);
    };

    filtersInner.addEventListener('transitionend', transitionendHandler);
  };

  filtersOpenButton.addEventListener('click', filtersOpen);
  filtersOverlay.addEventListener('click', filtersClose);
  filtersCloseButton.addEventListener('click', filtersClose);

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

  const clearButtons = [];
  clearButtons.push(document.querySelector('.filters__clear'));
  clearButtons.push(document.querySelector('.filters__footer-button--cleaer'));

  clearButtons.forEach((clearButton) => {
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
  });
};
