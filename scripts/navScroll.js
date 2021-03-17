import throttle from './throttle.js';

export default () => {
  const header = document.querySelector('.header');
  let headerHeight = header.offsetHeight;
  let headerTop = document.querySelector('.header__top').offsetHeight;
  let headerLogo = document.querySelector('.header__logo-wrapper').offsetHeight || 0;
  const navbar = document.querySelector('.header__bottom');
  const navbarContainer = document.querySelector('.header__bottom-container');
  let navbarHeight = navbar.offsetHeight;
  let navbarOffset = headerTop + headerLogo;

  let updateVars = () => {
    headerHeight = header.offsetHeight;
    headerTop = document.querySelector('.header__top').offsetHeight;
    headerLogo = document.querySelector('.header__logo-wrapper').offsetHeight || 0;
    navbarHeight = navbar.offsetHeight;
    navbarOffset = headerTop + headerLogo;
  };

  updateVars = throttle(updateVars, 1000);
  window.addEventListener('resize', updateVars);

  let scrollPrev = 0;
  let pathStart = 0;
  let pathEnd = 0;
  let path = 0;
  let timeStart = 0;
  let timeEnd = 0;
  let time = 0;
  let isUp = false;
  let isDown = false;

  const vClear = (direction) => {
    pathStart = 0;
    pathEnd = 0;
    path = 0;
    timeStart = 0;
    timeEnd = 0;
    time = 0;
    if (direction) {
      isUp = false;
      isDown = true;
    } else {
      isUp = true;
      isDown = false;
    }
  };

  let getV = (scrolled, direction, cb) => {
    pathEnd = scrolled;
    path = Math.abs(pathStart - pathEnd);

    timeEnd = new Date().getTime();
    time = timeEnd - timeStart;
    console.log({ path, time });

    if (path > 25 && time < 200) {
      cb();
    }

    if (path > 25 || time > 200) {
      vClear(direction);
    }
  };

  getV = throttle(getV, 50);

  const menuDefault = () => {
    header.style.paddingBottom = '0px';
    navbar.classList.remove('header__bottom--fixed');
    navbar.classList.remove('header__bottom--hide');
    navbar.classList.remove('header__bottom--show');
    navbarContainer.classList.remove('js-scroll');
  };

  const show = () => {
    if (!navbar.classList.contains('header__bottom--show')) {
      navbar.classList.add('header__bottom--show');
      navbarContainer.classList.add('js-scroll');
    } else {
      navbar.classList.remove('header__bottom--hide');
    }
    console.log('SHOW');
  };

  const hide = () => {
    console.log('HIDE');
    navbar.classList.add('header__bottom--hide');
  };

  const scrollHandeler = () => {
    const scrolled = window.pageYOffset;

    if (
      scrolled > headerHeight
      && !navbar.classList.contains('header__bottom--fixed')
    ) {
      console.log('FIXED');
      navbar.classList.add('header__bottom--fixed');
      header.style.paddingBottom = `${navbarHeight}px`;
    } else if (
      scrolled < headerHeight
      && navbar.classList.contains('header__bottom--fixed')
      && !navbar.classList.contains('header__bottom--show')
    ) {
      console.log('убрать FIXED');
      menuDefault();
    } else if (
      scrolled < navbarOffset
      && navbar.classList.contains('header__bottom--show')
    ) {
      console.log('убрать FIXED SHOW');
      menuDefault();
    } else if ((
      scrolled > headerHeight + 300
      && scrolled < scrollPrev
      && !navbar.classList.contains('header__bottom--show')
    ) || (
      scrolled > headerHeight + 300
        && scrolled < scrollPrev
        && navbar.classList.contains('header__bottom--show')
        && navbar.classList.contains('header__bottom--hide')
    )
    ) {
      if (!isUp) {
        timeStart = new Date().getTime();
        pathStart = scrolled;
        isUp = true;
        isDown = false;
      } else {
        getV(scrolled, true, show);
      }
    } else if (
      scrolled > scrollPrev
      && navbar.classList.contains('header__bottom--show')
      && !navbar.classList.contains('header__bottom--hide')
    ) {
      if (!isDown) {
        timeStart = new Date().getTime();
        pathStart = scrolled;
        isDown = true;
        isUp = false;
      } else {
        getV(scrolled, false, hide);
      }
    }

    scrollPrev = scrolled;
  };

  window.addEventListener('scroll', scrollHandeler);
};
