{
  const body = document.querySelector('.body');
  const userButtonOpen = document.querySelector('.header__top-user');
  const userList = document.querySelector('.header__top-user-list');

  const navButtonOpen = document.querySelector('.header__bottom-open-nav');
  const navButtonClose = document.querySelector('.header__bottom-nav-header-back');

  const nav = document.querySelector('.header__bottom-nav');
  const navOverlay = document.querySelector('.header__bottom-nav-overlay');
  const linksSubmenu = document.querySelectorAll('.menu__link-submenu');

  const searchButtonOpen = document.querySelector('.header__bottom-search');
  const search = document.querySelector('.header__bottom-form');
  const searchInput = document.querySelector('.header__bottom-form-input');
  const headerOverlay = document.querySelector('.header-overlay');

  const userListOpen = () => {
    userList.classList.add('header__top-user-list--active');
  };

  const userListClose = () => {
    userList.classList.remove('header__top-user-list--active');
  };

  const navOpen = () => {
    body.classList.add('body--lock');
    nav.classList.add('header__bottom-nav--active');
    navOverlay.classList.add('header__bottom-nav-overlay--active');
  };

  const navClose = () => {
    nav.classList.remove('header__bottom-nav--active');
    navOverlay.classList.remove('header__bottom-nav-overlay--active');
    body.classList.close('body--lock');
  };

  const searchOpen = () => {
    headerOverlay.classList.add('header-overlay--active');
    search.classList.add('header__bottom-form--active');
    searchInput.focus();
  };

  const searchClose = () => {
    headerOverlay.classList.remove('header-overlay--active');
    search.classList.remove('header__bottom-form--active');
    search.reset();
    searchInput.blur();
  };

  const submenuOpen = (linkSubmenu) => {
    const menuItem = linkSubmenu.closest('.menu__item');
    const submenu = menuItem.querySelector('.menu__list');
    submenu.classList.add('menu__list--active');
  };

  body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('header__top-user-list--active')
      && !e.target.classList.contains('header__top-user-list-item-link')) {
      userListClose();
    }
    if (!e.target.classList.contains('header__bottom-nav--active')
    && e.target.classList.contains('header__bottom-nav-overlay')) {
      navClose();
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

  navButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    navOpen();
  });

  navButtonClose.addEventListener('click', (e) => {
    e.stopPropagation();
    navClose();
  });

  searchButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!search.classList.contains('header__bottom-form--active')) {
      searchOpen();
    } else {
      searchClose();
    }
  });


  linksSubmenu.forEach((linkSubmenu) => {
    linkSubmenu.addEventListener('click', function f() {
      submenuOpen(this);
    });
  });
}
