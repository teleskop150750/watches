export default () => {
  const sortButtonOpen = document.querySelector('.products__header-button--sort');
  const sortList = document.querySelector('.products__sort-list');
  const sortItems = document.querySelectorAll('.products__sort-item-button');
  const sortOverlay = document.querySelector('.products__sort-overlay');

  const sortListOpen = () => {
    sortList.classList.add('products__sort-list--active');
    sortOverlay.classList.add('products__sort-overlay--active');
    sortItems[0].focus();
  };

  const sortListClose = () => {
    sortList.classList.remove('products__sort-list--active');
    sortOverlay.classList.remove('products__sort-overlay--active');
    sortList.querySelector('.products__sort-item-button').blur();
    sortButtonOpen.focus();
  };

  sortButtonOpen.addEventListener('click', () => {
    sortListOpen();
  });

  sortOverlay.addEventListener('click', sortListClose);

  // -------------------------------
  sortItems.forEach((item, i, array) => {
    item.addEventListener('click', (e) => {
      array.forEach((el) => {
        el.classList.remove('products__sort-button--active');
      });
      e.target.classList.add('products__sort-button--active');
      sortListClose();
      sortButtonOpen.textContent = e.target.textContent;
    });
  });
};
