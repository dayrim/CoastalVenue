import { Swiper, Pagination } from 'swiper/dist/js/swiper.esm.js';
window.addEventListener('DOMContentLoaded', function() {
  Swiper.use([Pagination]);
  const homeSwiper = new Swiper('.home-swiper', {
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
  const promotionSwiper = new Swiper('.promotions-swiper', {
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
    allowTouchMove: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
        spaceBetween: 0,
        initialSlide: 2
      },
      480: {
        slidesPerView: 2,
        allowTouchMove: true,
        spaceBetween: 10,
        initialSlide: 2
      },
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
        if (this.params.slidesPerView > 2) {
          this.slides[this.activeIndex].classList.add('slide-arrow');
          this.slides[this.activeIndex + this.params.slidesPerView - 1].classList.add('slide-arrow');
        }
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
      }
    }
  });
  const aboutSwiper = new Swiper('.about-swiper', {
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
  const retreatSwiper = new Swiper('.retreat-swiper', {
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
      320: {
        slidesPerView: 1,
        allowTouchMove: true,
        initialSlide: 2,
        spaceBetween: 0
      },
      480: {
        slidesPerView: 2,
        allowTouchMove: true,
        initialSlide: 2,
        spaceBetween: 10
      },
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
        if (this.params.slidesPerView > 2) {
          this.slides[this.activeIndex].classList.add('slide-arrow');
          this.slides[this.activeIndex + this.params.slidesPerView - 1].classList.add('slide-arrow');
        }
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
  const gallerySwiper = new Swiper('.gallery-swiper', {
    loop: false,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function(index, className) {
        return '<div class="' + className + '"></div>';
      }
    }
  });
  promotionSwiper.slideReset();
  retreatSwiper.slideReset();
  promotionSwiper.update();
  retreatSwiper.update();
});
