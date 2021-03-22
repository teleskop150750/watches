function CustomValidation(input) {
  this.invalidities = [];
  this.validityChecks = [];

  // add reference to the input node
  this.inputNode = input;

  // trigger method to attach the listener
  this.registerListener();
}

CustomValidation.prototype = {
  addInvalidity(message) {
    this.invalidities.push(message);
  },
  getInvalidities() {
    return this.invalidities.join('. \n');
  },
  checkValidity(input) {
    for (let i = 0; i < this.validityChecks.length; i++) {
      const isInvalid = this.validityChecks[i].isInvalid(input);
      if (isInvalid) {
        this.addInvalidity(this.validityChecks[i].invalidityMessage);
      }

      const requirementElement = this.validityChecks[i].element;

      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add('invalid');
          requirementElement.classList.remove('valid');
        } else {
          requirementElement.classList.remove('invalid');
          requirementElement.classList.add('valid');
        }
      } // end if requirementElement
    } // end for
  },
  checkInput() { // checkInput now encapsulated
    this.inputNode.CustomValidation.invalidities = [];
    this.checkValidity(this.inputNode);

    if (this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '') {
      this.inputNode.setCustomValidity('');
    } else {
      const message = this.inputNode.CustomValidation.getInvalidities();
      this.inputNode.setCustomValidity(message);
    }
  },
  registerListener() { // register the listener here
    const CustomValidation = this;

    this.inputNode.addEventListener('keyup', () => {
      CustomValidation.checkInput();
    });
  },

};

export { CustomValidation as default };
