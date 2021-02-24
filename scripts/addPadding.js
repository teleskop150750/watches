export default () => {
  const items = document.querySelectorAll('.js-scroll');
  items.forEach((el) => {
    const item = el;
    const { paddingRight } = getComputedStyle(item);
    item.style.paddingRight = `${parseFloat(paddingRight) + window.innerWidth - document.documentElement.clientWidth}px`;
  });
};
