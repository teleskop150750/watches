{
  const body = document.querySelector('.body');
  const headerTopUser = document.querySelector('.header__top-user');
  const headerTopUserList = document.querySelector('.header__top-user-list');

  const headerBottomOpenNav = document.querySelector('.header__bottom-open-nav');
  const headerBottomNavHeaderBack = document.querySelector('.header__bottom-nav-header-back');

  const headerBottomNav = document.querySelector('.header__bottom-nav');
  const headerBottomNavOverlay = document.querySelector('.header__bottom-nav-overlay');

  const headerBottomSearch = document.querySelector('.header__bottom-search');
  const headerBottomForm = document.querySelector('.header__bottom-form');
  const headerBottomFormInput = document.querySelector('.header__bottom-form-input');
  const headerOverlay = document.querySelector('.header-overlay');

  const headerTopUserListOpen = () => {
    headerTopUserList.classList.add('header__top-user-list--active');
  };

  const headerTopUserListClose = () => {
    headerTopUserList.classList.remove('header__top-user-list--active');
  };

  const headerBottomNavOpen = () => {
    headerBottomNav.classList.add('header__bottom-nav--active');
    headerBottomNavOverlay.classList.add('header__bottom-nav-overlay--active');
  };

  const headerBottomNavClose = () => {
    headerBottomNav.classList.remove('header__bottom-nav--active');
    headerBottomNavOverlay.classList.remove('header__bottom-nav-overlay--active');
  };

  const headerBottomFormOpen = () => {
    headerOverlay.classList.add('header-overlay--active');
    headerBottomForm.classList.add('header__bottom-form--active');
    headerBottomFormInput.focus();
  };

  const headerBottomFormClose = () => {
    headerOverlay.classList.remove('header-overlay--active');
    headerBottomForm.classList.remove('header__bottom-form--active');
    headerBottomForm.reset();
    headerBottomFormInput.blur();
  };

  body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('header__top-user-list--active')
      && !e.target.classList.contains('header__top-user-list-item-link')) {
      headerTopUserListClose();
    }
    if (!e.target.classList.contains('header__bottom-nav--active')
    && e.target.classList.contains('header__bottom-nav-overlay')) {
      headerBottomNavClose();
    }

    if (!e.target.classList.contains('header__bottom-form-input')
    && e.target.classList.contains('header-overlay')) {
      headerBottomFormClose();
    }
  });

  headerTopUser.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!headerTopUserList.classList.contains('header__top-user-list--active')) {
      headerTopUserListOpen();
    } else {
      headerTopUserListClose();
    }
  });

  headerBottomOpenNav.addEventListener('click', (e) => {
    e.stopPropagation();
    headerBottomNavOpen();
  });

  headerBottomNavHeaderBack.addEventListener('click', (e) => {
    e.stopPropagation();
    headerBottomNavClose();
  });

  headerBottomSearch.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!headerBottomForm.classList.contains('header__bottom-form--active')) {
      headerBottomFormOpen();
    } else {
      headerBottomFormClose();
    }
  });
}
