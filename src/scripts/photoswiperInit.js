import PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

window.addEventListener('DOMContentLoaded', function() {
  var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
      var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

      for (var i = 0; i < numNodes; i++) {
        figureEl = thumbElements[i];

        if (figureEl.nodeType !== 1) {
          continue;
        }
        linkEl = figureEl.children[0];
        size = linkEl.getAttribute('data-size').split('x');
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };

        if (figureEl.children.length > 1) {
          item.title = figureEl.children[1].innerHTML;
        }
        if (linkEl.children.length > 0) {
          item.msrc = linkEl.children[0].getAttribute('src');
        }
        item.el = figureEl;
        items.push(item);
      }
      return items;
    };
    var closest = function closest(el, fn) {
      return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      var eTarget = e.target || e.srcElement;

      var clickedListItem = closest(eTarget, function(el) {
        return el.tagName && el.tagName.toUpperCase() === 'LI';
      });

      if (!clickedListItem) {
        return;
      }
      var listElements = [];
      var count = 0;
      var index;

      clickedListItem.parentNode.parentNode.parentNode.childNodes.forEach(slide => {
        if (slide.className && slide.className.includes('swiper-slide') && !slide.className.includes('duplicate')) {
          slide.childNodes.forEach(grid => {
            if (grid.className && grid.className.includes('grid-container')) {
              grid.childNodes.forEach(element => {
                if (element.nodeType === 1) {
                  listElements.push(element);
                  if (element === clickedListItem) {
                    index = count;
                  }
                  count++;
                }
              });
            }
          });
        }
      });

      var clickedGallery = clickedListItem.parentNode;

      if (index >= 0) {
        openPhotoSwipe(index, clickedGallery);
      }
      return false;
    };
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
        links = [],
        options,
        gallery,
        items;

      galleryElement.parentNode.parentNode.childNodes.forEach(slide => {
        if (slide.className && slide.className.includes('swiper-slide') && !slide.className.includes('duplicate')) {
          slide.childNodes.forEach(grid => {
            if (grid.className && grid.className.includes('grid-container')) {
              parseThumbnailElements(grid).forEach(link => {
                links = links.concat(link);
              });
            }
          });
        }
      });

      items = parseThumbnailElements(galleryElement);
      options = {
        closeEl: true,
        captionEl: false,
        fullscreenEl: true,
        zoomEl: true,
        shareEl: false,
        arrowEl: true,
        preloaderEl: true,
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

        getThumbBoundsFn: function(index) {
          var thumbnail = links[index].el.getElementsByTagName('div')[0],
            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        }
      };

      if (fromURL) {
        if (options.galleryPIDs) {
          for (var j = 0; j < links.length; j++) {
            if (links[j].pid == index) {
              options.index = j;
              break;
            }
          }
        } else {
          options.index = parseInt(index, 10) - 1;
        }
      } else {
        options.index = parseInt(index, 10);
      }
      if (isNaN(options.index)) {
        return;
      }

      if (disableAnimation) {
        options.showAnimationDuration = 0;
      }
      gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, links, options);
      gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
      openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
  };
  initPhotoSwipeFromDOM('.my-gallery');
});
