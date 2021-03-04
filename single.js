import tabbed from './scripts/tabbed.js';
import review from './scripts/review.js';
// eslint-disable-next-line import/no-named-as-default
import Swiper from './libs/swiper/swiper.js';
import singleSlider from './scripts/singleSlider.js';

tabbed();
review();

const viewed = new Swiper('.slider-viewed', singleSlider);
const related = new Swiper('.slider-related', singleSlider);
viewed.init();
related.init();
