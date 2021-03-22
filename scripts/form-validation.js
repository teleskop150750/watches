import CustomValidation from './form/CustomValidation.js';
import { firstnameValidityChecks } from './form/params.js';

export default () => {
  const firstnameInput = document.querySelector('firstname');

  firstnameInput.CustomValidation = new CustomValidation(firstnameInput);
  firstnameInput.CustomValidation.validityChecks = firstnameValidityChecks;

  /* ----------------------------

  Event Listeners

  ---------------------------- */

  const form = document.querySelector('.user-form');
  const inputs = document.querySelectorAll('.user-form__input');
  const submit = form.querySelector('.user-form__button');

  const validate = (e) => {
    e.preventDefault();
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].CustomValidation.checkInput();
    }
  };

  submit.addEventListener('click', validate);
  form.addEventListener('submit', validate);
};
