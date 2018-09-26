import '../css/fonts.scss';
import '../css/about.scss';
import '../css/ballroom.scss';
import '../css/bay.scss';
import '../css/footer.scss';
import '../css/gallery.scss';
import '../css/header.scss';
import '../css/main.scss';
import '../css/home.scss';
import '../css/promotions.scss';
import '../css/retreat.scss';
import '../css/variables.scss';

import 'swiper/dist/css/swiper.css';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import SmoothScroll from 'smooth-scroll';
import throttle from 'lodash/throttle';
import './swiperInit.js';
import './photoswiperInit.js';

window.addEventListener(
  'scroll',
  throttle(
    function() {
      if (document.body.scrollTop > window.innerHeight / 2 || document.documentElement.scrollTop > window.innerHeight / 2) {
        document.getElementById('header-nav-wrap').style.top = '0';
        document.getElementById('header-nav-wrap').style.opacity = '1';
      } else {
        document.getElementById('header-nav-wrap').style.top = '-500px';
        document.getElementById('header-nav-wrap').style.opacity = '0';
      }
    },
    300,
    { leading: true, trailing: true }
  )
);

window.addEventListener('DOMContentLoaded', function() {
  new SmoothScroll('a[href*="#"]', {
    updateURL: true
  });

  var navElements = document.querySelectorAll('.nav-menu a');
  navElements.forEach(function(navElement) {
    navElement.addEventListener('click', function() {
      let navToggle = document.getElementById('nav-toggle');
      if (navToggle.checked) {
        navToggle.checked = false;
      } else {
        navToggle.checked = true;
      }
    });
  });
  var modal = document.getElementById('myModal');
  var btns = document.querySelectorAll('.learn-more');
  btns.forEach(function(elem) {
    elem.addEventListener('click', function() {
      modal.style.display = 'block';
    });
  });

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
});
