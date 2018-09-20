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
import 'aos/dist/aos.css';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import { Swiper, Pagination } from 'swiper/dist/js/swiper.esm.js';
import SmoothScroll from 'smooth-scroll';
import AOS from 'aos';
import Lodash from 'lodash';
import PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
var isInViewport = function(elem) {
  console.log('isInViewport');
  console.log('isInViewport');
  var bounding = elem.getBoundingClientRect();
  console.log(
    bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
  console.log(bounding.top, bounding.left, bounding.bottom, bounding.right);
  console.log(window.innerHeight, window.innerWidth, document.documentElement.clientHeight, document.documentElement.clientWidth);
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
var checkNavbarVibility = function() {
  var ballroom = document.getElementById('ballroom');
  if (isInViewport(ballroom)) {
    console.log('Ballroom');
    window.history.pushState('Ballroom', 'Ballroom', '/#ballroom');
  }
  if (document.body.scrollTop > window.innerHeight / 2 || document.documentElement.scrollTop > window.innerHeight / 2) {
    document.getElementById('header-nav-wrap').style.top = '0';
  } else {
    document.getElementById('header-nav-wrap').style.top = '-500px';
  }
};

window.addEventListener('scroll', Lodash.throttle(checkNavbarVibility, 500, { leading: true, trailing: true }));
window.addEventListener('DOMContentLoaded', function() {
  // const bg = document.querySelector('.swiper-container');
  // const windowWidth = window.innerWidth / 5;
  // const windowHeight = window.innerHeight / 5;

  // bg.addEventListener('mousemove', e => {
  //   const mouseX = e.clientX / windowWidth;
  //   const mouseY = e.clientY / windowHeight;

  //   bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
  // });// Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btns = document.querySelectorAll('.learn-more');
  console.log(btns);
  // Get the <span> element that closes the modal

  // When the user clicks on the button, open the modal

  btns.forEach(function(elem) {
    elem.addEventListener('click', function() {
      modal.style.display = 'block';
      console.log('Meh');
    });
  });

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
  // When the user clicks anywhere outside of the modal, close it

  Swiper.use([Pagination]);
  var scroll = new SmoothScroll('a[href*="#"]', {
    updateURL: true // Update the URL on scroll
  });

  var homeSwiper = new Swiper('.home-swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function(index, className) {
        return '<div class="' + className + '"></div>';
      }
    }
  });
  Swiper.use([Pagination]);
  var promotionsSwiper = new Swiper('.promotions-swiper', {
    loop: true,
    spaceBetween: 15,

    slidesPerView: 5,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function(index, className) {
        return '<div class="' + className + '"></div>';
      }
    },
    allowTouchMove: false,
    breakpoints: {
      // when window width is <= 320px
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
        spaceBetween: 0
      },
      // when window width is <= 480px
      480: {
        slidesPerView: 2,
        allowTouchMove: true,
        spaceBetween: 10
      },
      // when window width is <= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 15
      }
    },
    on: {
      init: function(event) {
        this.slides[this.activeIndex].classList.add('slide-arrow');
        this.slides[this.activeIndex + this.params.slidesPerView - 1].classList.add('slide-arrow');
        console.log('On init slides: ' + this.params.slidesPerView);
      },
      transitionStart: function(event) {
        var i;
        if (this.params.slidesPerView > 2) {
          this.slides[this.previousIndex].classList.remove('slide-arrow');
          this.slides[this.previousIndex + this.params.slidesPerView - 1].classList.remove('slide-arrow');

          this.slides[this.activeIndex].classList.add('slide-arrow');
          this.slides[this.activeIndex + this.params.slidesPerView - 1].classList.add('slide-arrow');
        } else {
          for (i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.remove('slide-arrow');
          }
        }
      },
      click: function(event) {
        console.log('Swiper clicked');

        console.log(promotionsSwiper.slides);
        //console.log(promotionsSwiper.realIndex);
        console.log(promotionsSwiper.activeIndex);
        console.log(event.srcElement.offsetParent.dataset.swiperSlideIndex);
        console.log(promotionsSwiper.slides[promotionsSwiper.activeIndex]);
        console.log(event.srcElement.offsetParent);
        console.log(event.srcElement.offsetParent === promotionsSwiper.slides[promotionsSwiper.activeIndex]);
        var i;
        for (i = 0; i < this.slides.length; i++) {
          if (this.slides[i] === event.srcElement.offsetParent) {
            console.log('This is the guy: ' + i);
            if (this.slides[i] === this.slides[this.activeIndex]) {
              this.slidePrev();
            } else if (this.slides[i] === this.slides[this.activeIndex + this.params.slidesPerView - 1]) {
              this.slideNext();
            }
          }
        }
        // console.log(promotionsSwiper.activeIndex);
        // console.log(promotionsSwiper.realIndex);
        // console.log(event);
        // console.log(Object.keys(event.srcElement.offsetParent));
        // console.log(typeof event.srcElement.offsetParent);
        // console.log(event.srcElement.offsetParent.keys);

        // console.log(event.srcElement.offsetParent.className.includes('swiper-slide-active'));
        // console.log(typeof event.srcElement.offsetParent.className);

        // if (event.srcElement.offsetParent.className.includes('swiper-slide-active')) {
        //   console.log(event.srcElement.offsetParent.className.includes('swiper-slide-active'));
        //   promotionsSwiper.slidePrev();
        // } else if (event.srcElement.offsetParent.className.includes('swiper-slide-duplicate-prev')) {
        //   console.log(event.srcElement.offsetParent.className.includes('swiper-slide-duplicate-prev'));
        //   promotionsSwiper.slideNext();
        // }
      }
    }
  });
  Swiper.use([Pagination, Pagination]);
  var aboutSwiper = new Swiper('.about-swiper', {
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function(index, className) {
        return '<div class="' + className + '"></div>';
      }
    }
  });
  Swiper.use([Pagination]);
  var retreatsSwiper = new Swiper('.retreat-swiper', {
    loop: true,
    spaceBetween: 15,

    slidesPerView: 5,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function(index, className) {
        return '<div class="' + className + '"></div>';
      }
    },
    breakpoints: {
      // when window width is <= 320px
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
        spaceBetween: 0
      },
      // when window width is <= 480px
      480: {
        slidesPerView: 2,
        allowTouchMove: true,
        spaceBetween: 10
      },
      // when window width is <= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 15
      }
    },
    on: {
      init: function(event) {
        this.slides[this.activeIndex].classList.add('slide-arrow');
        this.slides[this.activeIndex + this.params.slidesPerView - 1].classList.add('slide-arrow');
      },
      transitionStart: function(event) {
        var i;
        if (this.params.slidesPerView > 2) {
          this.slides[this.previousIndex].classList.remove('slide-arrow');
          this.slides[this.previousIndex + this.params.slidesPerView - 1].classList.remove('slide-arrow');

          this.slides[this.activeIndex].classList.add('slide-arrow');
          this.slides[this.activeIndex + this.params.slidesPerView - 1].classList.add('slide-arrow');
        } else {
          for (i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.remove('slide-arrow');
          }
        }
      },
      click: function(event) {
        var i;
        // console.log('Prev index:', this.previousIndex);

        // console.log('Suggested PREV index:', this.previousIndex + this.params.slidesPerView - 1);
        // console.log('Active index:', this.activeIndex);
        // console.log('Suggested Last index:', this.activeIndex + this.params.slidesPerView - 1);
        // console.log('Clicked index:', this.clickedIndex);
        // if (this.clickedIndex !== this.activeIndex + this.params.slidesPerView - 1) {
        //   for (i = 0; i < this.slides.length; i++) {
        //     if (i <= this.activeIndex || i >= this.activeIndex + this.params.slidesPerView - 1) {
        //       console.log('Slide number:', i, ' is white');
        //     } else {
        //       console.log('Slide number:', i, ' is black');
        //     }
        //   }
        // }

        for (i = 0; i < this.slides.length; i++) {
          if (this.slides[i] === event.srcElement.offsetParent) {
            if (this.slides[i] === this.slides[this.activeIndex]) {
              this.slidePrev();
            } else if (this.slides[i] === this.slides[this.activeIndex + this.params.slidesPerView - 1]) {
              this.slideNext();
            }
          }
        }
      }
    }
  });
  Swiper.use([Pagination]);
  var gallerySwiper = new Swiper('.gallery-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 55,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function(index, className) {
        return '<div class="' + className + '"></div>';
      }
    }
  });
  // 2 of 2 : PHOTOSWIPE
  var initPhotoSwipeFromDOM = function(gallerySelector) {
    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

      for (var i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i]; // <figure> element

        // include only element nodes
        if (figureEl.nodeType !== 1) {
          continue;
        }

        linkEl = figureEl.children[0]; // <a> element

        size = linkEl.getAttribute('data-size').split('x');

        // create slide object
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };

        if (figureEl.children.length > 1) {
          // <figcaption> content
          item.title = figureEl.children[1].innerHTML;
        }

        if (linkEl.children.length > 0) {
          // <img> thumbnail element, retrieving thumbnail url
          item.msrc = linkEl.children[0].getAttribute('src');
        }

        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
      }

      return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);

      var eTarget = e.target || e.srcElement;

      // find root element of slide
      var clickedListItem = closest(eTarget, function(el) {
        return el.tagName && el.tagName.toUpperCase() === 'LI';
      });

      if (
        !clickedListItem ||
        clickedListItem.className.includes('swiper-slide-active') ||
        clickedListItem.className.includes('swiper-slide-duplicate-prev')
      ) {
        return;
      }

      // find index of clicked item by looping through all child nodes
      // alternatively, you may define index via data- attribute
      var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

      for (var i = 0; i < numChildNodes; i++) {
        if (childNodes[i].nodeType !== 1) {
          continue;
        }

        if (childNodes[i] === clickedListItem) {
          index = nodeIndex;
          break;
        }
        nodeIndex++;
      }

      if (index >= 0) {
        // open PhotoSwipe if valid index found
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
      var hash = window.location.hash.substring(1),
        params = {};

      if (hash.length < 5) {
        return params;
      }

      var vars = hash.split('&');
      for (var i = 0; i < vars.length; i++) {
        if (!vars[i]) {
          continue;
        }
        var pair = vars[i].split('=');
        if (pair.length < 2) {
          continue;
        }
        params[pair[0]] = pair[1];
      }

      if (params.gid) {
        params.gid = parseInt(params.gid, 10);
      }

      return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
      var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;

      items = parseThumbnailElements(galleryElement);

      // define options (if needed)

      options = {
        /* "showHideOpacity" uncomment this If dimensions of your small thumbnail don't match dimensions of large image */
        //showHideOpacity:true,

        // Buttons/elements
        closeEl: true,
        captionEl: true,
        fullscreenEl: true,
        zoomEl: true,
        shareEl: true,
        counterEl: false,
        arrowEl: true,
        preloaderEl: true,
        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

        getThumbBoundsFn: function(index) {
          // See Options -> getThumbBoundsFn section of documentation for more info
          var thumbnail = items[index].el.getElementsByTagName('div')[0], // find thumbnail
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      };

      // PhotoSwipe opened from URL
      if (fromURL) {
        if (options.galleryPIDs) {
          // parse real index when custom PIDs are used
          // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
          for (var j = 0; j < items.length; j++) {
            if (items[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          // in URL indexes start from 1
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }

      // exit if index not found
      if (isNaN(options.index)) {
        return;
      }

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }

      // Pass data to PhotoSwipe and initialize it
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();

      /* EXTRA CODE (NOT FROM THE CORE) - UPDATE SWIPER POSITION TO THE CURRENT ZOOM_IN IMAGE (BETTER UI) */

      // photoswipe event: Gallery unbinds events
      // (triggers before closing animation)
      gallery.listen('unbindEvents', function() {
        // This is index of current photoswipe slide
        var getCurrentIndex = gallery.getCurrentIndex();
        // Update position of the slider
        //promotionsSwiper.slideTo(getCurrentIndex, false);
      });
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
  };

  // execute above function
  initPhotoSwipeFromDOM('.my-gallery');

  console.log(scroll);

  AOS.init({
    //offset: 120, // offset (in px) from the original trigger point
    //delay: 500, // values from 0 to 3000, with step 50ms
    duration: 1000
  });
});
