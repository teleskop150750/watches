export default () => {
  const [minus, plus] = document.querySelectorAll('.quantity__button');
  const input = document.querySelector('.quantity__input');

  minus.addEventListener('click', () => {
    if (+input.value > 1) {
      input.value = +input.value - 1;
    }
  });

  plus.addEventListener('click', () => {
    if (+input.value < 10) {
      input.value = +input.value + 1;
    }
  });

  input.addEventListener('change', () => {
    if (+input.value < 1) {
      input.value = 1;
    }

    if (+input.value > 10) {
      input.value = 10;
    }
  });
};
