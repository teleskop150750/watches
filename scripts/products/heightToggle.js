/* eslint-disable no-param-reassign */
export default (elToggle, elBlock, parent, className) => {
  const toggle = () => {
    if (elBlock.style.height === '0px') {
      elBlock.style.height = `${elBlock.scrollHeight}px`;
      parent.classList.remove(className);
    } else {
      elBlock.style.height = `${elBlock.scrollHeight}px`;
      getComputedStyle(elBlock).getPropertyValue('height');
      elBlock.style.height = '0';
      parent.classList.add(className);
    }
    elToggle.removeEventListener('click', toggle);
  };
  elToggle.addEventListener('click', toggle);
  elBlock.addEventListener('transitionend', () => {
    if (elBlock.style.height !== '0px') {
      elBlock.style.height = 'auto';
    }
    elToggle.addEventListener('click', toggle);
  });
};
