export default () => {
  const userButtonOpen = document.querySelector('.header__top-user');
  const userList = document.querySelector('.header__top-user-list');
  const userOverlay = document.querySelector('.user-overlay');

  const userListOpen = () => {
    userList.classList.add('header__top-user-list--active');
    userOverlay.classList.add('user-overlay--active');
  };

  const userListClose = () => {
    userList.classList.remove('header__top-user-list--active');
    userOverlay.classList.remove('user-overlay--active');
  };

  userButtonOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!userList.classList.contains('header__top-user-list--active')) {
      userListOpen();
    } else {
      userListClose();
    }
  });

  userOverlay.addEventListener('click', userListClose);
};
