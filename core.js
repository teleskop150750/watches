{
  const body = document.querySelector('.body');
  const userButtonOpen = document.querySelector('.header__top-user');
  const userList = document.querySelector('.header__top-user-list');

  const navMobileButtonOpen = document.querySelector('.header__bottom-open-nav');
  const navMobileButtonClose = document.querySelector('.header__bottom-nav-mobile-header-back');

  const navMobile = document.querySelector('.header__bottom-nav-mobile');
  const navOverlay = document.querySelector('.header__bottom-nav-mobile-overlay');
  const linksSubmenu = document.querySelectorAll('.menu-mobile__link-submenu');

  const menuBackButtons = document.querySelectorAll('.menu-mobile__back');

  const searchButtonOpen = document.querySelector('.header__bottom-search');
  const search = document.querySelector('.header__bottom-form');
  const searchInput = document.querySelector('.header__bottom-form-input');
  const headerOverlay = document.querySelector('.header-overlay');

  const addPadding = (item) => {
    const el = item;
    const { paddingRight } = getComputedStyle(item);
    el.style.paddingRight = `${parseFloat(paddingRight) + window.innerWidth - document.documentElement.clientWidth}px`;
  };

  const removePadding = (item) => {
    const el = item;
    const { paddingRight } = getComputedStyle(item);
    el.style.paddingRight = `${parseFloat(paddingRight) - (window.innerWidth - document.documentElement.clientWidth)}px`;
  };

  const pageLock = () => {
    addPadding(body);
    body.classList.add('body--lock');
  };

  const pageOnLock = () => {
    body.classList.remove('body--lock');
    removePadding(body);
  };

  const userListOpen = () => {
    userList.classList.add('header__top-user-list--active');
  };

  const userListClose = () => {
    userList.classList.remove('header__top-user-list--active');
  };

  const navMobileOpen = () => {
    pageLock();
    navMobile.classList.add('header__bottom-nav-mobile--active');
    navOverlay.classList.add('header__bottom-nav-mobile-overlay--active');
  };

  const navMobileClose = () => {
    navMobile.classList.remove('header__bottom-nav-mobile--active');
    navOverlay.classList.remove('header__bottom-nav-mobile-overlay--active');
    const menuActive = navMobile.querySelectorAll('.menu-mobile__list--active');
    menuActive.forEach((item) => {
      item.classList.remove('menu-mobile__list--active');
    });

    pageOnLock();
  };

  const searchOpen = () => {
    pageLock();

    headerOverlay.classList.add('header-overlay--active');
    search.classList.add('header__bottom-form--active');
    searchInput.focus();
  };

  const searchClose = () => {
    headerOverlay.classList.remove('header-overlay--active');
    search.classList.remove('header__bottom-form--active');
    search.reset();
    searchInput.blur();

    pageOnLock();
  };

  const submenuOpen = (linkSubmenu) => {
    const menuItem = linkSubmenu.closest('.menu-mobile__item');
    const submenu = menuItem.querySelector('.menu-mobile__list');
    submenu.classList.add('menu-mobile__list--active');
  };

  const submenuClose = (menuBackButton) => {
    const submenu = menuBackButton.closest('.menu-mobile__list');
    submenu.classList.remove('menu-mobile__list--active');
    menuBackButton.blur();
  };

  body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('header__top-user-list--active')
      && !e.target.classList.contains('header__top-user-list-item-link')) {
      userListClose();
    }
    if (!e.target.classList.contains('header__bottom-nav-mobile--active')
      && e.target.classList.contains('header__bottom-nav-mobile-overlay')) {
      navMobileClose();
    }

    if (!e.target.classList.contains('header__bottom-form-input')
      && e.target.classList.contains('header-overlay')) {
      searchClose();
    }
  });

  userButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!userList.classList.contains('header__top-user-list--active')) {
      userListOpen();
    } else {
      userListClose();
    }
  });

  navMobileButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    navMobileOpen();
  });

  navMobileButtonClose.addEventListener('click', (e) => {
    e.stopPropagation();
    navMobileClose();
    e.target.blur();
  });

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

  searchButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!search.classList.contains('header__bottom-form--active')) {
      searchOpen();
    } else {
      searchClose();
    }
  });
}
