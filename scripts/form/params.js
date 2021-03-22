export const firstnameValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 1;
    },
    invalidityMessage: 'Имя должно быть от 1 до 64 символов',
    element: document.querySelector('label[for="firstname"] .user-form__error'),
  },
  {
    isInvalid(input) {
      return input.value.length > 64;
    },
    invalidityMessage: 'Имя должно быть от 1 до 64 символов',
    element: document.querySelector('label[for="firstname"] .user-form__error'),
  },
];

export const usedrnameValidityChecks = [
  {
    isInvalid(input) {
      return input.value.length < 3;
    },
    invalidityMessage: 'This input needs to be at least 3 characters',
    element: document.querySelector('label[for="username"] .input-requirements li:nth-child(1)'),
  },
  {
    isInvalid(input) {
      const illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
      return !!illegalCharacters;
    },
    invalidityMessage: 'Only letters and numbers are allowed',
    element: document.querySelector('label[for="username"] .input-requirements li:nth-child(2)'),
  },
];
