import { body } from './globalVars.js';
import pageLock from './pageLock.js';
import pageUnlock from './pageUnlock.js';

export default () => {
  const navMobileButtonOpen = document.querySelector('.header__bottom-open-nav');
  const navMobileButtonClose = document.querySelector('.header__bottom-nav-mobile-header-back');
  const navMobile = document.querySelector('.header__bottom-nav-mobile');
  const navOverlay = document.querySelector('.nav-mobile-overlay');

  const linksSubmenu = document.querySelectorAll('.menu-mobile__link-submenu');
  const menuBackButtons = document.querySelectorAll('.menu-mobile__back');

  const navMobileOpen = () => {
    pageLock(body);
    navMobile.classList.add('header__bottom-nav-mobile--active');
    navOverlay.classList.add('nav-mobile-overlay--active');
    navMobileButtonClose.focus();
  };

  const navMobileClose = () => {
    navMobile.classList.remove('header__bottom-nav-mobile--active');
    navOverlay.classList.remove('nav-mobile-overlay--active');
    const menuActive = navMobile.querySelectorAll('.menu-mobile__list--active');
    menuActive.forEach((item) => {
      item.classList.remove('menu-mobile__list--active');
    });
    navMobileButtonOpen.focus();
    pageUnlock(body);
  };

  navMobileButtonOpen.addEventListener('click', () => {
    navMobileOpen();
  });

  navMobileButtonClose.addEventListener('click', (e) => {
    navMobileClose();
    e.target.blur();
  });

  navOverlay.addEventListener('click', navMobileClose);

  const submenuOpen = (linkSubmenu) => {
    const menuItem = linkSubmenu.closest('.menu-mobile__item');
    const submenu = menuItem.querySelector('.menu-mobile__list');
    submenu.classList.add('menu-mobile__list--active');
  };

  const submenuHide = (e) => {
    const submenu = e.target;

    submenu.classList.remove('menu-mobile__list--active');
    submenu.classList.remove('menu-mobile__list--hiding');
    submenu.removeEventListener('transitionend', submenuHide);
  };

  const submenuClose = (menuBackButton) => {
    const submenu = menuBackButton.closest('.menu-mobile__list');
    submenu.classList.add('menu-mobile__list--hiding');
    submenu.addEventListener('transitionend', submenuHide);
    menuBackButton.blur();
  };

  linksSubmenu.forEach((linkSubmenu) => {
    linkSubmenu.addEventListener('click', function f() {
      submenuOpen(this);
    });
  });

  menuBackButtons.forEach((menuBackButton) => {
    menuBackButton.addEventListener('click', function f() {
      submenuClose(this);
    });
  });
};
