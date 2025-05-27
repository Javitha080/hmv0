/**
 * Google Pixel-inspired JavaScript for index.html
 * Features modern interactions, animations, and user-friendly functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components and functionality
  initWelcomeScreen();
  initSkeletonLoader();
  initHeader();
  initMobileMenu();
  initRippleEffect();
  initSmoothScroll();
  initAnimations();
  initBackToTop();
  initDarkMode();
  initTestimonialSlider();
  initCounterAnimation();
});

/**
 * Welcome Screen Functionality
 * Handles the initial welcome screen animation and transition
 */
function initWelcomeScreen() {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const enterButton = document.getElementById('enterButton');
  const mainContent = document.getElementById('mainContent');
  const skeletonLoader = document.getElementById('skeletonLoader');
  
  if (!welcomeScreen || !enterButton || !mainContent || !skeletonLoader) return;
  
  // Show welcome screen initially
  welcomeScreen.style.display = 'flex';
  mainContent.style.display = 'none';
  skeletonLoader.style.display = 'none';
  
  // Handle enter button click
  enterButton.addEventListener('click', () => {
    // Fade out welcome screen
    welcomeScreen.classList.add('fade-out');
    
    // Show skeleton loader
    skeletonLoader.style.display = 'flex';
    
    // Simulate loading time
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    
    const progressInterval = setInterval(() => {
      progress += 1;
      if (progressBar) progressBar.style.width = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        
        // Hide skeleton loader and show main content
        setTimeout(() => {
          skeletonLoader.style.display = 'none';
          mainContent.style.display = 'block';
          mainContent.classList.remove('hidden');
          
          // Trigger animations for main content
          initAnimations();
        }, 200);
      }
    }, 20);
  });
}

/**
 * Skeleton Loader Animation
 * Creates a smooth loading experience before content is displayed
 */
function initSkeletonLoader() {
  const skeletonLoader = document.getElementById('skeletonLoader');
  if (!skeletonLoader) return;
  
  // Animate loading dots
  const loadingDots = document.querySelectorAll('.loading-dot');
  if (loadingDots.length) {
    loadingDots.forEach((dot, index) => {
      dot.style.animationDelay = `${index * 0.2}s`;
    });
  }
  
  // Initialize particles background if present
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    createParticles(particlesContainer, 50);
  }
}

/**
 * Create particle elements for background effect
 */
function createParticles(container, count) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random positioning and size
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.width = `${Math.random() * 6 + 2}px`;
    particle.style.height = particle.style.width;
    
    // Random animation duration and delay
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
  }
}

/**
 * Header Functionality
 * Handles header state changes on scroll
 */
function initHeader() {
  const header = document.querySelector('.pixel-header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile Menu Functionality
 * Handles mobile menu toggle and interactions
 */
function initMobileMenu() {
  const mobileMenuButton = document.querySelector('.pixel-mobile-menu-button');
  const mobileMenu = document.querySelector('.pixel-mobile-menu');
  
  if (!mobileMenuButton || !mobileMenu) return;
  
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    
    // Toggle aria-expanded for accessibility
    const isExpanded = mobileMenu.classList.contains('open');
    mobileMenuButton.setAttribute('aria-expanded', isExpanded);
    
    // Change icon based on state
    const icon = mobileMenuButton.querySelector('i');
    if (icon) {
      if (isExpanded) {
        icon.className = 'ri-close-line';
      } else {
        icon.className = 'ri-menu-line';
      }
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.remove('open');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      
      const icon = mobileMenuButton.querySelector('i');
      if (icon) icon.className = 'ri-menu-line';
    }
  });
  
  // Close mobile menu when window is resized to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileMenu.classList.remove('open');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      
      const icon = mobileMenuButton.querySelector('i');
      if (icon) icon.className = 'ri-menu-line';
    }
  });
}

/**
 * Material Design Ripple Effect
 * Adds interactive ripple effect to buttons and clickable elements
 */
function initRippleEffect() {
  const buttons = document.querySelectorAll('.pixel-button, .pixel-nav-item a, .pixel-mobile-nav-item a');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('pixel-ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/**
 * Smooth Scroll Functionality
 * Enables smooth scrolling to anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get header height for offset
        const header = document.querySelector('.pixel-header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Calculate position to scroll to
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash without scrolling
        history.pushState(null, null, targetId);
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.pixel-mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          const mobileMenuButton = document.querySelector('.pixel-mobile-menu-button');
          mobileMenu.classList.remove('open');
          if (mobileMenuButton) {
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuButton.querySelector('i');
            if (icon) icon.className = 'ri-menu-line';
          }
        }
      }
    });
  });
}

/**
 * Scroll Animations
 * Adds fade-in animations to elements as they enter the viewport
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in');
  
  // Initial check for elements in viewport
  checkElementsInViewport(animatedElements);
  
  // Check on scroll
  window.addEventListener('scroll', () => {
    checkElementsInViewport(animatedElements);
  });
}

/**
 * Check if elements are in viewport and add visible class
 */
function checkElementsInViewport(elements) {
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150; // How far from the top before the element becomes visible
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

/**
 * Back to Top Button Functionality
 * Shows/hides the back to top button based on scroll position
 */
function initBackToTop() {
  const backToTopButton = document.querySelector('.pixel-back-to-top');
  if (!backToTopButton) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  // Scroll to top when clicked
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Dark Mode Toggle Functionality
 * Handles dark mode toggle and persists user preference
 */
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (!darkModeToggle) return;
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.classList.add('dark');
    updateDarkModeIcon(true);
  }
  
  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    updateDarkModeIcon(isDarkMode);
  });
}

/**
 * Update dark mode icon based on current state
 */
function updateDarkModeIcon(isDarkMode) {
  const darkModeIcon = document.getElementById('darkModeIcon');
  if (!darkModeIcon) return;
  
  if (isDarkMode) {
    darkModeIcon.className = 'ri-sun-line';
    darkModeIcon.setAttribute('aria-label', 'Switch to light mode');
  } else {
    darkModeIcon.className = 'ri-moon-line';
    darkModeIcon.setAttribute('aria-label', 'Switch to dark mode');
  }
}

/**
 * Testimonial Slider Functionality
 * Creates an interactive testimonial slider
 */
function initTestimonialSlider() {
  const testimonialContainer = document.querySelector('.pixel-testimonial-slider');
  if (!testimonialContainer) return;
  
  const testimonials = testimonialContainer.querySelectorAll('.pixel-testimonial-card');
  const prevButton = testimonialContainer.querySelector('.pixel-slider-prev');
  const nextButton = testimonialContainer.querySelector('.pixel-slider-next');
  
  if (testimonials.length <= 1 || !prevButton || !nextButton) return;
  
  let currentIndex = 0;
  
  // Show initial testimonial
  updateTestimonialDisplay();
  
  // Previous button click
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonialDisplay();
  });
  
  // Next button click
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonialDisplay();
  });
  
  // Auto-advance testimonials
  let autoAdvance = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonialDisplay();
  }, 5000);
  
  // Pause auto-advance on hover
  testimonialContainer.addEventListener('mouseenter', () => {
    clearInterval(autoAdvance);
  });
  
  testimonialContainer.addEventListener('mouseleave', () => {
    autoAdvance = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateTestimonialDisplay();
    }, 5000);
  });
  
  // Update testimonial display
  function updateTestimonialDisplay() {
    testimonials.forEach((testimonial, index) => {
      if (index === currentIndex) {
        testimonial.style.display = 'block';
        testimonial.classList.add('active');
      } else {
        testimonial.style.display = 'none';
        testimonial.classList.remove('active');
      }
    });
  }
}

/**
 * Counter Animation for Stats Section
 * Animates number counters when they come into view
 */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.pixel-stat-number');
  if (!statNumbers.length) return;
  
  let counted = false;
  
  // Function to animate counters
  function animateCounters() {
    if (counted) return;
    
    const statsSection = document.querySelector('.pixel-stats');
    if (!statsSection) return;
    
    const statsSectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (statsSectionTop < windowHeight * 0.75) {
      statNumbers.forEach(statNumber => {
        const target = parseInt(statNumber.getAttribute('data-target'), 10);
        const duration = 2000; // Animation duration in milliseconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            statNumber.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            statNumber.textContent = target;
          }
        };
        
        updateCounter();
      });
      
      counted = true;
    }
  }
  
  // Check on scroll
  window.addEventListener('scroll', animateCounters);
  
  // Initial check
  animateCounters();
}

/**
 * Custom Cursor Effect
 * Creates a custom cursor glow effect that follows the mouse
 */
function initCustomCursor() {
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursorGlow) return;
  
  document.addEventListener('mousemove', e => {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
}