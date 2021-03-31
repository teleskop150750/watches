export default (func, ms) => {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      // eslint-disable-next-line prefer-rest-params
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    // eslint-disable-next-line prefer-rest-params
    func.apply(this, arguments);
    isThrottled = true;
    // eslint-disable-next-line func-names
    // eslint-disable-next-line prefer-arrow-callback
    setTimeout(function f() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        // eslint-disable-next-line no-multi-assign
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
};
