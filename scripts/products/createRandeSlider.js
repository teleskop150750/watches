export default (noUiSlider, slider, step, min, max) => {
  noUiSlider.create(slider, {
    start: [min, max],
    connect: true,
    step,
    range: {
      min: [min],
      max: [max],
    },
  });
  return slider;
};
