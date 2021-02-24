import addPadding from './addPadding.js';

export default (body) => {
  body.classList.add('js-scroll');
  addPadding();
  body.classList.add('page__body--lock');
};
