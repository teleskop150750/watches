import removePadding from './removePadding.js';

export default (body) => {
  body.classList.remove('page__body--lock');
  removePadding();
  body.classList.remove('js-scroll');
};
