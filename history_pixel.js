/**
 * Google Pixel-inspired JavaScript for history.html
 * Features modern interactions, animations, and user-friendly functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('History page loaded - initializing Google Pixel UI...');
  
  // Initialize all components
  initHeader();
  initMobileMenu();
  initDarkMode();
  initTimelineAnimations();
  initRippleEffects();
  initGalleryCarousel();
  initSmoothScroll();
  initBackToTop();
  initLazyLoading();
  initImageZoom();
});

/**
 * Header Behavior
 * Adds shadow and reduces size on scroll
 */
function initHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add shadow and reduce size when scrolling down
    if (currentScrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });
}

/**
 * Mobile Menu Functionality
 * Handles the mobile menu toggle and animations
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuItems = document.querySelectorAll('#mobileMenu a');
  
  if (!menuToggle || !mobileMenu) return;
  
  menuToggle.addEventListener('click', () => {
    // Toggle menu visibility
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
    
    // Toggle menu icon
    menuToggle.classList.toggle('active');
    
    // Animate menu items
    menuItems.forEach((item, index) => {
      if (mobileMenu.classList.contains('open')) {
        item.style.transitionDelay = `${0.1 + index * 0.05}s`;
        item.style.transform = 'translateY(0)';
        item.style.opacity = '1';
      } else {
        item.style.transitionDelay = '0s';
        item.style.transform = 'translateY(20px)';
        item.style.opacity = '0';
      }
    });
  });
  
  // Close menu when clicking on a link
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuToggle.classList.remove('active');
      
      menuItems.forEach(item => {
        item.style.transitionDelay = '0s';
        item.style.transform = 'translateY(20px)';
        item.style.opacity = '0';
      });
    });
  });
}

/**
 * Dark Mode Toggle
 * Handles dark mode toggle and saves preference
 */
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = document.getElementById('darkModeIcon');
  
  if (!darkModeToggle || !darkModeIcon) return;
  
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply the saved theme or device preference
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    darkModeIcon.classList.replace('fa-moon', 'fa-sun');
  }
  
  // Toggle dark mode on click
  darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    
    // Update icon
    if (document.documentElement.classList.contains('dark')) {
      darkModeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      darkModeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
    
    // Add ripple effect
    addRippleEffect(darkModeToggle, event);
  });
}

/**
 * Timeline Animations
 * Uses Intersection Observer to animate timeline items
 */
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineLine = document.getElementById('timelineLine');
  
  if (timelineItems.length === 0) return;
  
  // Animate timeline line when timeline section is visible
  if (timelineLine) {
    const timelineSection = document.getElementById('timelineSection');
    
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineLine.style.transform = 'scaleY(1)';
          lineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (timelineSection) {
      lineObserver.observe(timelineSection);
    }
  }
  
  // Animate timeline items when they enter viewport
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  
  timelineItems.forEach(item => itemObserver.observe(item));
}

/**
 * Material Design Ripple Effect
 * Adds ripple effect to buttons and interactive elements
 */
function initRippleEffects() {
  const rippleElements = document.querySelectorAll('.pixel-btn, .carousel-item, .timeline-dot, #darkModeToggle');
  
  rippleElements.forEach(element => {
    element.addEventListener('click', (event) => {
      addRippleEffect(element, event);
    });
  });
}

function addRippleEffect(element, event) {
  const rect = element.getBoundingClientRect();
  const x = event ? event.clientX - rect.left : rect.width / 2;
  const y = event ? event.clientY - rect.top : rect.height / 2;
  
  const ripple = document.createElement('span');
  ripple.classList.add('ripple-effect');
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  
  element.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

/**
 * Gallery Carousel
 * Handles the carousel navigation and auto-play
 */
let currentSlide = 0;
let carouselInterval;

function initGalleryCarousel() {
  const carousel = document.getElementById('eraCarousel');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('[onclick="prevSlide()"]');
  const nextBtn = document.querySelector('[onclick="nextSlide()"]');
  
  if (!carousel || items.length === 0) return;
  
  // Replace inline onclick handlers with event listeners
  if (prevBtn) {
    prevBtn.removeAttribute('onclick');
    prevBtn.addEventListener('click', prevSlide);
  }
  
  if (nextBtn) {
    nextBtn.removeAttribute('onclick');
    nextBtn.addEventListener('click', nextSlide);
  }
  
  // Add touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }
  
  // Start auto-play
  startCarouselAutoPlay();
  
  // Pause auto-play on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    startCarouselAutoPlay();
  });
  
  // Initial update
  updateCarousel();
}

function startCarouselAutoPlay() {
  clearInterval(carouselInterval);
  carouselInterval = setInterval(() => {
    nextSlide();
  }, 5000);
}

function updateCarousel() {
  const carousel = document.getElementById('eraCarousel');
  const items = document.querySelectorAll('.carousel-item');
  
  if (!carousel || items.length === 0) return;
  
  // Calculate item width based on responsive design
  let itemWidth;
  if (window.innerWidth < 640) {
    // Mobile: full width
    itemWidth = carousel.parentElement.offsetWidth;
  } else if (window.innerWidth < 1024) {
    // Tablet: half width
    itemWidth = carousel.parentElement.offsetWidth / 2;
  } else {
    // Desktop: third width
    itemWidth = carousel.parentElement.offsetWidth / 3;
  }
  
  // Add gap
  itemWidth += 16;
  
  // Update transform
  carousel.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
}

function nextSlide() {
  const items = document.querySelectorAll('.carousel-item');
  if (items.length === 0) return;
  
  currentSlide = (currentSlide + 1) % items.length;
  updateCarousel();
}

function prevSlide() {
  const items = document.querySelectorAll('.carousel-item');
  if (items.length === 0) return;
  
  currentSlide = (currentSlide - 1 + items.length) % items.length;
  updateCarousel();
}

// Update carousel on window resize
window.addEventListener('resize', () => {
  updateCarousel();
});

/**
 * Smooth Scroll
 * Adds smooth scrolling to anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Back to Top Button
 * Shows/hides back to top button and handles click
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Lazy Loading
 * Lazy loads images for better performance
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (lazyImages.length === 0) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

/**
 * Image Zoom
 * Adds zoom effect to images on click
 */
function initImageZoom() {
  const images = document.querySelectorAll('.img-container img');
  
  images.forEach(img => {
    img.addEventListener('click', () => {
      // Create modal
      const modal = document.createElement('div');
      modal.classList.add('image-modal');
      
      // Create image element
      const modalImg = document.createElement('img');
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      
      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.classList.add('modal-close');
      
      // Append elements
      modal.appendChild(modalImg);
      modal.appendChild(closeBtn);
      document.body.appendChild(modal);
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      
      // Add animation
      setTimeout(() => {
        modal.classList.add('open');
      }, 10);
      
      // Close modal on click
      modal.addEventListener('click', () => {
        modal.classList.remove('open');
        setTimeout(() => {
          document.body.removeChild(modal);
          document.body.style.overflow = '';
        }, 300);
      });
    });
  });
}

// Add this to the window object to make it accessible from HTML
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;