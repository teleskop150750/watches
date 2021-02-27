export default () => {
  const sortButtonOpen = document.querySelector('.products__sort-button');
  const sortList = document.querySelector('.products__sort-list');
  const sortItems = document.querySelectorAll('.products__sort-item-buttom');
  const sortOverlay = document.querySelector('.products__sort-overlay');

  const userListOpen = () => {
    sortList.classList.add('products__sort-list--active');
    sortOverlay.classList.add('products__sort-overlay--active');
    sortItems.focus();
  };

  const userListClose = () => {
    sortList.classList.remove('products__sort-list--active');
    sortOverlay.classList.remove('products__sort-overlay--active');
    sortList.querySelector('.products__sort-item-buttom').blur();
  };

  sortButtonOpen.addEventListener('click', () => {
    userListOpen();
  });

  sortOverlay.addEventListener('click', userListClose);

  // -------------------------------
  sortItems.forEach((item, i, array) => {
    item.addEventListener('click', (e) => {
      if (!e.target.classList.contains('products__sort-button--active')) {
        array.forEach((el) => {
          el.classList.remove('products__sort-button--active');
        });
        e.target.classList.add('products__sort-button--active');
        userListClose();
        sortButtonOpen.textContent = e.target.textContent;
      }
    });
  });
};
