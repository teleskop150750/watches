import breadcrumbs from './scripts/breadcrumbs.js';

breadcrumbs();

const userMenuButtons = [...document.querySelectorAll('.user-menu__item-toggle')];
const userSections = [...document.querySelectorAll('.user-section')];
userMenuButtons.forEach((userMenuButton, i) => {
  userMenuButton.addEventListener('click', () => {
    userSections.forEach((userSection) => {
      userSection.classList.remove('user-section--active');
    });
    userSections[i].classList.add('user-section--active');

    userMenuButtons.forEach((button) => {
      button.classList.remove('user-menu__item--active');
    });
    userMenuButtons[i].classList.add('user-menu__item--active');
  });
});
