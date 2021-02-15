{
  const body = document.querySelector('.body');
  const headerTopUser = document.querySelector('.header__top-user');
  const headerTopUserList = document.querySelector('.header__top-user-list');

  const headerBottomSearch = document.querySelector('.header__bottom-search');
  const headerBottomForm = document.querySelector('.header__bottom-form');
  const headerBottomFormInput = document.querySelector('.header__bottom-form-input');
  const headerOverlay = document.querySelector('.header-overlay');

  body.addEventListener('click', (e) => {
    if (!e.target.classList.contains('header__top-user-list') && headerTopUserList.classList.contains('header__top-user-list--active')) {
      headerTopUserList.classList.remove('header__top-user-list--active');
    }
    if (!e.target.classList.contains('header__bottom-form') && headerBottomForm.classList.contains('header__bottom-form--active')) {
      headerOverlay.classList.remove('header-overlay--active');
      headerBottomForm.classList.remove('header__bottom-form--active');
      headerBottomFormInput.blur();
    }
  });

  headerTopUser.addEventListener('click', (e) => {
    e.stopPropagation();
    headerTopUserList.classList.toggle('header__top-user-list--active');
  });

  headerBottomSearch.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!headerBottomForm.classList.contains('header__bottom-form--active')) {
      headerOverlay.classList.add('header-overlay--active');
      headerBottomForm.classList.add('header__bottom-form--active');
      headerBottomFormInput.focus();
    } else {
      headerOverlay.classList.remove('header-overlay--active');
      headerBottomForm.classList.remove('header__bottom-form--active');
      headerBottomFormInput.blur();
    }
  });
}
