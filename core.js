const body = document.querySelector('.page__body');

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
  body.classList.add('page__body--lock');
};

const pageOnLock = () => {
  body.classList.remove('page__body--lock');
  removePadding(body);
};

// Use/r
{
  const userButtonOpen = document.querySelector('.header__top-user');
  const userList = document.querySelector('.header__top-user-list');

  const userListOpen = () => {
    userList.classList.add('header__top-user-list--active');
  };

  const userListClose = () => {
    userList.classList.remove('header__top-user-list--active');
  };

  userButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!userList.classList.contains('header__top-user-list--active')) {
      userListOpen();
    } else {
      userListClose();
    }
  });

  body.addEventListener('click', (e) => {
    if (!e.target.closest('.header__top-user-list--active')
      && userList.classList.contains('header__top-user-list--active')) {
      userListClose();
    }
  });
}

// nav mobile
{
  const navMobileButtonOpen = document.querySelector('.header__bottom-open-nav');
  const navMobileButtonClose = document.querySelector('.header__bottom-nav-mobile-header-back');
  const navMobile = document.querySelector('.header__bottom-nav-mobile');
  const navOverlay = document.querySelector('.header__bottom-nav-mobile-overlay');

  const linksSubmenu = document.querySelectorAll('.menu-mobile__link-submenu');
  const menuBackButtons = document.querySelectorAll('.menu-mobile__back');

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

  navMobileButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    navMobileOpen();
  });

  navMobileButtonClose.addEventListener('click', (e) => {
    e.stopPropagation();
    navMobileClose();
    e.target.blur();
  });

  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('header__bottom-nav-mobile-overlay')) {
      navMobileClose();
    }
  });

  const submenuOpen = (linkSubmenu) => {
    const menuItem = linkSubmenu.closest('.menu-mobile__item');
    const submenu = menuItem.querySelector('.menu-mobile__list');
    submenu.classList.add('menu-mobile__list--active');
  };

  const submenuHide = (e) => {
    console.log(1);
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
}

// nav
{
  const offset = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset;
    return rect.top + scrollTop;
  };

  const header = document.querySelector('.header');
  const navbar = document.querySelector('.header__bottom');
  const navbarHeight = navbar.offsetHeight;
  const navbarOffset = offset(navbar) + navbarHeight;
  let scrollPrev = 0;

  window.addEventListener('scroll', () => {
    console.log(1);

    const scrolled = window.pageYOffset;

    if (scrolled > navbarOffset) {
      navbar.classList.add('header__bottom--fixed');
      header.style.paddingBottom = `${navbarHeight}px`;
    } else {
      header.style.paddingBottom = '0px';
      navbar.classList.remove('header__bottom--fixed');
    }

    if (scrolled > 100 && scrolled > scrollPrev) {
      console.log(2);

      navbar.classList.remove('header__bottom--show');
    } else {
      console.log(3);
      navbar.classList.add('header__bottom--show');
    }

    scrollPrev = scrolled;
  });
}

// search
{
  const searchButtonOpen = document.querySelector('.header__bottom-search-button');
  const search = document.querySelector('.header__bottom-search');
  const searchInput = document.querySelector('.header__bottom-search-input');
  const headerOverlay = document.querySelector('.header-overlay');

  const searchOpen = () => {
    pageLock();

    headerOverlay.classList.add('header-overlay--active');
    search.classList.add('header__bottom-search--active');
    searchInput.focus();
  };

  const searchClose = () => {
    headerOverlay.classList.remove('header-overlay--active');
    search.classList.remove('header__bottom-search--active');
    search.reset();
    searchInput.blur();

    pageOnLock();
  };

  body.addEventListener('click', (e) => {
    if (e.target.classList.contains('header-overlay')) {
      searchClose();
    }
  });

  searchButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!search.classList.contains('header__bottom-search--active')) {
      searchOpen();
    } else {
      searchClose();
    }
  });
}
