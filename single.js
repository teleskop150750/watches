import breadcrumbs from './scripts/breadcrumbs.js';
import productSlider, { productSliderHandler } from './scripts/single/productSlider.js';
import quantity from './scripts/quantity.js';
import tabbed from './scripts/single/tabbed.js';
import review from './scripts/single/review.js';
// eslint-disable-next-line import/no-named-as-default
import Swiper from './libs/swiper/swiper.js';
import singleSlider from './scripts/single/singleSlider.js';

breadcrumbs();

productSlider.init();
productSliderHandler();

tabbed();
review();
const viewed = new Swiper('.slider-viewed', singleSlider);
const related = new Swiper('.slider-related', singleSlider);
viewed.init();
related.init();

quantity();
