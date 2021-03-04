export default () => {
  const addPeviewText = document.querySelector('.add-review__text');

  const addFormFooter = (form) => {
    let html = '';
    html = `<div class="add-review__footer">
  <button class="add-review__footer-button add-review__footer-button--cancel" type="reset">отмена</button>
  <button class="add-review__footer-button add-review__footer-button--add" type="submit">оставить отзыв</button>
</div>`;
    form.insertAdjacentHTML('beforeend', html);
  };

  const addPeviewTextFocusHandler = (e) => {
    const textarea = e.target;
    const form = textarea.closest('.add-review__form');
    addFormFooter(form);
    addPeviewText.removeEventListener('focus', addPeviewTextFocusHandler);
  };

  addPeviewText.addEventListener('focus', addPeviewTextFocusHandler);

  const menuButtons = document.querySelectorAll('.review__menu-button');

  const closeMenu = (menuOverlay, menu) => {
    menuOverlay.classList.remove('review__menu-overlay--active');
    menu.classList.remove('review__menu-list--active');
  };

  const cancelButtonHahder = (content, contentText, text, menuFooter) => {
    content.classList.remove('review__content--active');
    // eslint-disable-next-line no-param-reassign
    contentText.setAttribute('contenteditable', false);
    // eslint-disable-next-line no-param-reassign
    contentText.textContent = text;
    menuFooter.remove();
  };

  const saveButtonHahder = (content, contentText, text, menuFooter) => {
    if (contentText.textContent !== text) {
      content.classList.remove('review__content--active');
      // eslint-disable-next-line no-param-reassign
      contentText.setAttribute('contenteditable', false);
      // eslint-disable-next-line no-param-reassign
      menuFooter.remove();
    }
  };

  const addContentFocus = (contentText, content) => {
    contentText.setAttribute('contenteditable', true);
    contentText.focus();
    content.classList.add('review__content--active');
  };

  const addReviewFooter = (review) => {
    let html = '';
    html = `<div class="review__footer">
  <button class="review__footer-button review__footer-button--cancel" type="button">отмена</button>
  <button class="review__footer-button review__footer-button--save" type="button">сохранить</button>
</div>`;
    review.insertAdjacentHTML('beforeend', html);
  };

  const editButtonHandler = (e) => {
    const editButton = e.target;
    const review = editButton.closest('.review');
    const menuOverlay = review.querySelector('.review__menu-overlay');
    const menu = review.querySelector('.review__menu-list');
    closeMenu(menuOverlay, menu);
    const content = review.querySelector('.review__content');
    const contentText = content.querySelector('.review__content-text');
    const text = contentText.textContent;
    addReviewFooter(review, contentText, text);
    addContentFocus(contentText, content);

    const menuFooter = review.querySelector('.review__footer');

    const cancelButton = review.querySelector('.review__footer-button--cancel');
    cancelButton.addEventListener('click', () => {
      cancelButtonHahder(content, contentText, text, menuFooter);
    });

    const saveButton = review.querySelector('.review__footer-button--save');
    saveButton.addEventListener('click', () => {
      saveButtonHahder(content, contentText, text, menuFooter);
    });

    editButton.removeEventListener('click', editButtonHandler);
  };

  const deleteButtonButtonHandler = (e) => {
    const button = e.target;
    const review = button.closest('.review');
    review.remove();
  };

  const openMenu = (e) => {
    const button = e.target;
    const review = button.closest('.review');

    const menuFooter = review.querySelector('.review__footer');
    if (menuFooter === null) {
      const menuOverlay = review.querySelector('.review__menu-overlay');
      const menu = review.querySelector('.review__menu-list');
      menuOverlay.classList.add('review__menu-overlay--active');
      menu.classList.add('review__menu-list--active');

      menuOverlay.addEventListener('click', () => {
        closeMenu(menuOverlay, menu);
      });

      const editButton = menu.querySelector('.review__menu-list-button--edit');
      editButton.addEventListener('click', editButtonHandler);

      const deleteButton = menu.querySelector('.review__menu-list-button--delete');
      deleteButton.addEventListener('click', deleteButtonButtonHandler);
    }
  };

  menuButtons.forEach((button) => {
    button.addEventListener('click', openMenu);
  });
};
