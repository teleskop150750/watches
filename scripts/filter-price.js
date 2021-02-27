export const setRangeSlider = (slider, i, value) => {
  const arr = [null, null];
  arr[i] = value;
  slider.noUiSlider.set(arr);
};

export default (priceSlider, pticeInputs) => {
  const inputs = pticeInputs;
  priceSlider.noUiSlider.on('update', (values, handle) => {
    inputs[handle].value = Math.round(values[handle]);
  });

  inputs.forEach((input, index) => {
    input.addEventListener('change', (e) => {
      setRangeSlider(priceSlider, index, e.currentTarget.value);
    });
  });
};
