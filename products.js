import sortProducts from './scripts/sort-products.js';
import heightToggle from './scripts/heightToggle.js';

const filters = [...document.querySelectorAll('.filter')];

sortProducts();

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

const checkInputHandler = (checks, filter) => {
  let array = checks;
  array = array.filter((item) => item.checked);
  if (array.length > 0) {
    filter.classList.add('filter--check');
  } else {
    filter.classList.remove('filter--check');
  }
};

const checkShowAll = (buttonShowAll, checks) => {
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
    checkShowAll(buttonShowAll, checks);
  });
});
