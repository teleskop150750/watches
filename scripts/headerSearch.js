import { body } from './globalVars.js';
import pageLock from './pageLock.js';
import pageUnlock from './pageUnlock.js';

export default () => {
  const searchButtonOpen = document.querySelector('.header__bottom-search-button');
  const search = document.querySelector('.header__bottom-search');
  const searchInput = document.querySelector('.header__bottom-search-input');
  const searchOverlay = document.querySelector('.search-overlay');

  const searchOpen = () => {
    pageLock(body);
    const addFocus = () => {
      search.removeEventListener('transitionend', addFocus);
      searchInput.focus();
    };
    search.addEventListener('transitionend', addFocus);

    searchOverlay.classList.add('search-overlay--active');
    search.classList.add('header__bottom-search--active');
  };

  const searchClose = () => {
    search.reset();
    searchInput.blur();

    setTimeout(() => {
      searchOverlay.classList.remove('search-overlay--active');
      search.classList.remove('header__bottom-search--active');
      pageUnlock(body);
    }, 280);
  };

  searchButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!search.classList.contains('header__bottom-search--active')) {
      searchOpen();
    } else {
      searchClose();
    }
  });

  searchOverlay.addEventListener('click', searchClose);
};
