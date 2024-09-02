const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');


menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
  function adjustLayout() {
    const bios = document.querySelectorAll('.bio0, .bio1');

    bios.forEach(bio => {
      const image = bio.querySelector('img');
      const text = bio.querySelector('.text');
      const h1 = bio.querySelector('h1');
      const otherText = text ? Array.from(text.children).filter(el => el.tagName !== 'H1') : [];

      if (h1) {
        // Add transition class to the h1 element
        h1.classList.add('transition-h1');
      }
      if (image) {
        image.classList.add('transition-image');
      }

      // Use requestAnimationFrame for smoother updates
      window.requestAnimationFrame(() => {
        if (window.innerWidth <= 768) {
          // Mobile view adjustments
          if (h1 && h1.parentElement !== bio) {
            if (text.contains(h1)) {
              text.removeChild(h1);
            }
            bio.insertBefore(h1, image);
          }

          if (image && image.parentElement !== bio) {
            if (text.contains(image)) {
              text.removeChild(image);
            }
            bio.insertBefore(image, text);
          }

          otherText.forEach(el => {
            if (el.parentElement !== text) {
              text.appendChild(el);
            }
          });
        } else {
          // Desktop view adjustments
          if (h1 && h1.parentElement !== text) {
            if (h1.parentElement === bio) {
              bio.removeChild(h1);
            }
            text.prepend(h1);
          }

          if (image && image.parentElement !== bio) {
            if (text.contains(image)) {
              text.removeChild(image);
            }
            bio.insertBefore(image, text);
          }

          otherText.forEach(el => {
            if (el.parentElement !== text) {
              text.appendChild(el);
            }
          });
        }

        // Remove transition classes after the transition ends
        h1.addEventListener('transitionend', () => {
          h1.classList.remove('transition-h1');
        }, { once: true });
        
        image.addEventListener('transitionend', () => {
          image.classList.remove('transition-image');
        }, { once: true });
      });
    });
  }

  adjustLayout();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      adjustLayout();
    }, 100);
  });
});

