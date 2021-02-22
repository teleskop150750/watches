function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      // eslint-disable-next-line prefer-rest-params
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // eslint-disable-next-line prefer-rest-params
    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

const body = document.querySelector('.page__body');

const addPadding = () => {
  const items = document.querySelectorAll('.js-scroll');
  items.forEach((el) => {
    const item = el;
    const { paddingRight } = getComputedStyle(item);
    item.style.paddingRight = `${parseFloat(paddingRight) + window.innerWidth - document.documentElement.clientWidth}px`;
  });
};

const removePadding = () => {
  const items = document.querySelectorAll('.js-scroll');
  items.forEach((el) => {
    const item = el;
    const { paddingRight } = getComputedStyle(item);
    item.style.paddingRight = `${parseFloat(paddingRight) - (window.innerWidth - document.documentElement.clientWidth)}px`;
  });
};

const pageLock = () => {
  addPadding();
  body.classList.add('page__body--lock');
};

const pageOnLock = () => {
  body.classList.remove('page__body--lock');
  removePadding();
};

// User
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
  let headerHeight = header.offsetHeight;
  const navbar = document.querySelector('.header__bottom');
  let navbarHeight = navbar.offsetHeight;
  let navbarOffset = offset(navbar);
  let navbarOffsetBottom = navbarOffset + navbarHeight;

  let getHeight = () => {
    console.log(1);

    headerHeight = header.offsetHeight;
    navbarHeight = navbar.offsetHeight;
    navbarOffset = offset(navbar);
    navbarOffsetBottom = navbarOffset + navbarHeight;
  };

  getHeight = throttle(getHeight, 1000);

  window.addEventListener('resize', getHeight);

  let scrollPrev = 0;
  let pathStart = 0;
  let timeStart = 0;
  let timeEnd = 0;
  let time = 0;
  let pathEnd = 0;
  let path = 0;
  let isUp = false;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    if (scrolled > navbarOffsetBottom) {
      navbar.classList.add('header__bottom--fixed');
      header.style.paddingBottom = `${navbarHeight}px`;
    }

    if (navbar.classList.contains('header__bottom--show')) {
      if (scrolled < navbarOffset) {
        header.style.paddingBottom = '0px';
        navbar.classList.remove('header__bottom--fixed');
        navbar.classList.remove('header__bottom--show');
      }
    } else if (scrolled < navbarOffsetBottom) {
      header.style.paddingBottom = '0px';
      navbar.classList.remove('header__bottom--fixed');
      navbar.classList.remove('header__bottom--show');
    }

    // if (scrolled > headerHeight && scrolled > scrollPrev) {
    //   console.log(2);

    //   navbar.classList.remove('header__bottom--show');
    // }

    if (scrolled < scrollPrev) {
      if (!isUp) {
        timeStart = new Date().getTime();
        pathStart = scrolled;
        isUp = true;
      }
      pathEnd = scrolled;
      path = pathStart - pathEnd;

      timeEnd = new Date().getTime();
      time = timeEnd - timeStart;
      if (path > 50 || time > 120) {
        pathStart = 0;
        pathEnd = 0;
        path = 0;

        timeStart = 0;
        timeEnd = 0;
        time = 0;
        isUp = false;
      }
    } else {
      isUp = false;
      pathStart = 0;
      pathEnd = 0;
      path = 0;
    }

    if (scrolled > headerHeight + 300
      && scrolled < scrollPrev
      && path > 40
      && time < 120) {
      setTimeout(() => {
        navbar.classList.add('header__bottom--show');
        navbar.classList.add('js-scroll');
      }, 0);
    }

    if (scrolled > scrollPrev) {
      setTimeout(() => {
        navbar.classList.remove('header__bottom--show');
      }, 0);
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
