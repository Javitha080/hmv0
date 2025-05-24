// Enhanced News Filter Functionality with Error Handling
function initializeNewsFilters() {
  try {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const newsCards = document.querySelectorAll(".news-card");
    
    if (filterButtons.length === 0 || newsCards.length === 0) {
      console.warn('News filter elements not found, skipping initialization');
      return;
    }
    
    filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute("data-category");
        
        newsCards.forEach((card) => {
          const shouldShow = category === "all" || card.classList.contains(category);
          
          if (shouldShow) {
            card.style.display = "block";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
    
    console.log('News filters initialized successfully');
  } catch (error) {
    console.error('Error initializing news filters:', error);
  }
}

document.querySelectorAll("[data-category]").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    document.querySelectorAll(".news-card").forEach((card) => {
      card.style.display =
        category === "all" || card.classList.contains(category)
          ? "block"
          : "none";
    });
  });
});

// Custom Cursor Glow
const cursorGlow = document.getElementById("cursorGlow");
if (cursorGlow) {
  document.addEventListener("mousemove", (e) => {
    cursorGlow.style.opacity = "0.7";
    cursorGlow.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.addEventListener("mouseleave", () => {
    cursorGlow.style.opacity = "0";
  });
}

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  // Throttle function to limit how often the scroll event fires
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Throttled scroll handler
  const handleScroll = throttle(() => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }, 100);

  window.addEventListener("scroll", handleScroll);

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Use GSAP for smoother scrolling
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: 0,
        autoKill: false,
      },
      ease: "power2.inOut",
    });
  });
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeIcon = document.getElementById("darkModeIcon");

// Check for saved dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  document.documentElement.classList.add("dark");
  darkModeIcon.classList.remove("ri-moon-line");
  darkModeIcon.classList.add("ri-sun-line");
}

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "disabled");
    darkModeIcon.classList.remove("ri-sun-line");
    darkModeIcon.classList.add("ri-moon-line");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "enabled");
    darkModeIcon.classList.remove("ri-moon-line");
    darkModeIcon.classList.add("ri-sun-line");
  }
});

// Enhanced Mobile Menu Logic with Error Handling
function initializeMobileMenu() {
  try {
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuIcon = mobileMenuButton ? mobileMenuButton.querySelector("i") : null;
    
    if (!mobileMenuButton || !mobileMenu) {
      console.warn('Mobile menu elements not found, skipping initialization');
      return;
    }
    
    let isMenuOpen = false;
    let isAnimating = false;
    
    // Function to open mobile menu
    function openMobileMenu() {
      if (isAnimating || isMenuOpen) return;
      
      isAnimating = true;
      isMenuOpen = true;
      
      mobileMenu.classList.add("active");
      mobileMenu.setAttribute('aria-hidden', 'false');
      
      if (menuIcon) {
        menuIcon.classList.remove("ri-menu-line");
        menuIcon.classList.add("ri-close-line");
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Set focus to first menu item
      const firstLink = mobileMenu.querySelector('.mobile-nav-link');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
      
      setTimeout(() => {
        isAnimating = false;
      }, 300);
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
      if (isAnimating || !isMenuOpen) return;
      
      isAnimating = true;
      isMenuOpen = false;
      
      mobileMenu.classList.remove("active");
      mobileMenu.setAttribute('aria-hidden', 'true');
      
      if (menuIcon) {
        menuIcon.classList.remove("ri-close-line");
        menuIcon.classList.add("ri-menu-line");
      }
      
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Return focus to menu button
      mobileMenuButton.focus();
      
      setTimeout(() => {
        isAnimating = false;
      }, 300);
    }
    
    // Toggle mobile menu
    mobileMenuButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (isMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
    
    // Close menu when clicking on mobile nav links
    const mobileNavLinks = mobileMenu.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Allow navigation to proceed
        setTimeout(() => {
          closeMobileMenu();
        }, 100);
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        isMenuOpen &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuButton.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
      }
    });
    
    // Close menu on window resize (desktop view)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
      }
    });
    
    // Initialize ARIA attributes
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.setAttribute('aria-controls', 'mobileMenu');
    
    console.log('Mobile menu initialized successfully');
  } catch (error) {
    console.error('Error initializing mobile menu:', error);
  }
}

// Floating Labels
const floatingLabels = document.querySelectorAll(
  ".relative input, .relative textarea"
);
floatingLabels.forEach((input) => {
  const label = input.nextElementSibling;
  input.addEventListener("focus", () => {
    label.classList.add("floating-label-active");
  });
  input.addEventListener("blur", () => {
    if (!input.value) label.classList.remove("floating-label-active");
  });
  if (input.value) label.classList.add("floating-label-active");
});

// GSAP Scroll Animations
function initGSAPAnimations() {
  // Clear any existing ScrollTriggers to prevent duplicates
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Society section specific animations with markers for debugging
  const societyElements = document.querySelectorAll("#society .animate");
  societyElements.forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset",
        // Force refresh on scroll direction change
        onEnter: () => ScrollTrigger.refresh(),
        onLeaveBack: () => ScrollTrigger.refresh(),
        scrub: 0.5, // Smooth animation tied to scroll position
      },
    });
  });

  // General animations for other sections
  gsap.utils.toArray(".animate:not(#society .animate)").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reset",
      },
    });
  });
}

// Tilt Effect for Cards
function initTiltEffects() {
  // Check if VanillaTilt is defined before using it
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
      max: 5,
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      scale: 1.02,
    });
  } else {
    console.warn("VanillaTilt library not loaded. Tilt effects disabled.");
  }
}

// Define initScrollAnimations function that's missing in Gallery Section.js
function initScrollAnimations() {
  // Simple implementation of scroll animations for gallery items
  const animatedItems = document.querySelectorAll(".gallery-item");
  animatedItems.forEach((item) => {
    // Reset initial state
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    // Create observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition =
              "opacity 0.6s ease, transform 0.6s ease";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(item);
  });
}

// Three.js Particle Background for Welcome Screen
function initWelcomeParticles() {
  // Check for both possible container IDs
  const container =
    document.getElementById("heroParticles") ||
    document.getElementById("particles-js");
  if (!container) {
    console.warn("Particles container not found");
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(0.1, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xe74c3c,
    transparent: true,
    opacity: 0.6,
  });

  const particles = [];
  for (let i = 0; i < 100; i++) {
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10
    );
    scene.add(sphere);
    particles.push(sphere);
  }

  camera.position.z = 5;

  function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);
    particles.forEach((p) => {
      p.position.y -= 0.01;
      if (p.position.y < -10) p.position.y = 10;
    });
    renderer.render(scene, camera);
  }

  animateThreeJS();

  // Add resize handler
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Loader Logic
document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const skeletonLoader = document.getElementById("skeletonLoader");
  const mainContent = document.getElementById("mainContent");
  const enterButton = document.getElementById("enterButton");

  // Handle enter button click
  if (enterButton) {
    enterButton.addEventListener("click", () => {
      welcomeScreen.classList.add("fade-out");
      skeletonLoader.classList.add("active");

      setTimeout(() => {
        skeletonLoader.classList.remove("active");
        mainContent.classList.remove("hidden");
        // Initialize animations after content is visible
        initGSAPAnimations();
        initTiltEffects();
        initWelcomeParticles();
        initTypedText();
      }, 2000);
    });
  } else {
    // Fallback automatic transition if button doesn't exist
    setTimeout(() => {
      welcomeScreen.classList.add("fade-out");
      skeletonLoader.classList.add("active");

      setTimeout(() => {
        skeletonLoader.classList.remove("active");
        mainContent.classList.remove("hidden");
        // Initialize animations after content is visible
        initGSAPAnimations();
        initTiltEffects();
        initWelcomeParticles();
        initTypedText();
      }, 2000);
    }, 4000);
  }
});

// Init Functions
function initTypedText() {
  const typedElement = document.getElementById("typedText");
  const cursorContainer = document.querySelector(".typing-cursor-container");

  if (!typedElement) {
    console.warn("TypeIt element (#typedText) not found in DOM.");
    return;
  }

  // Ensure the element is visible with a fade-in effect
  setTimeout(() => {
    typedElement.style.opacity = '1';
    if (cursorContainer) {
      cursorContainer.classList.add('active');
    }
  }, 800);

  // Create a more realistic typing animation with TypeIt
  const typeItInstance = new TypeIt("#typedText", {
    strings: [
      "Welcome To Homagama Maha Vidyalaya",
      "හෝමාගම මහා විද්‍යාලයට සාදරයෙන් පිළිගනිමු",
      "ஹோமாகம மகா வித்தியாலயத்திற்கு வரவேற்கிறோம்",
    ],
    speed: 40, // Natural human typing speed
    deleteSpeed: 10, // Natural backspacing speed
    lifeLike: true, // Adds human-like randomness to typing
    cursor: false,
    breakLines: false,
    waitUntilVisible: true,
    loop: true,
    loopDelay: 2000, // Pause before looping
    startDelay: 800, // Initial delay before typing starts
    html: true,
    afterStep: (instance) => {
      // Animate the cursor line to follow typing progress
      if (cursorContainer) {
        const textWidth = typedElement.offsetWidth;
        const progress = typedElement.textContent.length / 300; // Approximate max length
        const cursorLine = cursorContainer.querySelector('.typing-cursor-line');
        if (cursorLine) {
          cursorLine.style.width = `${Math.min(100, progress * 100)}%`;
        }
      }
    },
    afterComplete: (instance) => {
      // Add a pause before deleting
      return instance.pause(15000);
    },
    afterString: (step, instance) => {
      // Add a pause after each string is typed
      return instance.pause(800);
    }
  }).go();
 
  

  return typeItInstance;
}
function initGSAPAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".glassmorphism, .tilt-effect").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

function initTiltEffects() {
  // Check if VanillaTilt is defined before using it
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
      max: 5,
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      scale: 1.02,
    });
  } else {
    console.warn("VanillaTilt library not loaded. Tilt effects disabled.");
  }
}

// Define initScrollAnimations function that's missing in Gallery Section.js
function initScrollAnimations() {
  // Simple implementation of scroll animations for gallery items
  const animatedItems = document.querySelectorAll(".gallery-item");
  animatedItems.forEach((item) => {
    // Reset initial state
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    // Create observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition =
              "opacity 0.6s ease, transform 0.6s ease";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(item);
  });
}

// Enhanced Script Error Handling
function handleScriptError(event) {
  console.error("Script failed to load:", event.target.src);
  
  // Attempt to reload critical scripts
  const src = event.target.src;
  if (src.includes('gsap') || src.includes('three') || src.includes('router')) {
    console.log('Attempting to reload critical script:', src);
    setTimeout(() => {
      const newScript = document.createElement('script');
      newScript.src = src;
      newScript.onerror = () => console.error('Failed to reload script:', src);
      document.head.appendChild(newScript);
    }, 2000);
  }
}

// Comprehensive DOM and Component Initialization
class WebsiteInitializer {
  constructor() {
    this.initialized = false;
    this.components = new Map();
    this.retryCount = 0;
    this.maxRetries = 3;
    
    this.init();
  }
  
  async init() {
    try {
      console.log('Starting website initialization...');
      
      // Wait for DOM to be ready
      await this.waitForDOM();
      
      // Initialize core components
      await this.initializeCore();
      
      // Initialize UI components
      await this.initializeUI();
      
      // Initialize interactive features
      await this.initializeFeatures();
      
      // Set up observers and listeners
      this.setupObservers();
      
      // Mark as initialized
      this.initialized = true;
      
      console.log('Website initialization completed successfully');
      
      // Dispatch initialization complete event
      window.dispatchEvent(new CustomEvent('websiteInitialized'));
      
    } catch (error) {
      console.error('Website initialization failed:', error);
      
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`Retrying initialization (${this.retryCount}/${this.maxRetries})...`);
        setTimeout(() => this.init(), 2000 * this.retryCount);
      } else {
        console.error('Max initialization retries exceeded');
        this.fallbackInitialization();
      }
    }
  }
  
  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }
  
  async initializeCore() {
    // Initialize router if available
    if (typeof WebsiteRouter !== 'undefined') {
      try {
        this.components.set('router', new WebsiteRouter());
        console.log('Router initialized');
      } catch (error) {
        console.error('Router initialization failed:', error);
      }
    }
    
    // Initialize DOM fixer if available
    if (typeof DOMFixer !== 'undefined') {
      try {
        this.components.set('domFixer', new DOMFixer());
        console.log('DOM Fixer initialized');
      } catch (error) {
        console.error('DOM Fixer initialization failed:', error);
      }
    }
    
    // Initialize error handler if available
    if (typeof ErrorHandler !== 'undefined') {
      try {
        this.components.set('errorHandler', new ErrorHandler());
        console.log('Error Handler initialized');
      } catch (error) {
        console.error('Error Handler initialization failed:', error);
      }
    }
  }
  
  async initializeUI() {
    // Initialize mobile menu
    try {
      initializeMobileMenu();
      console.log('Mobile menu initialized');
    } catch (error) {
      console.error('Mobile menu initialization failed:', error);
    }
    
    // Initialize dark mode
    try {
      this.initializeDarkMode();
      console.log('Dark mode initialized');
    } catch (error) {
      console.error('Dark mode initialization failed:', error);
    }
    
    // Initialize theme manager if available
    if (typeof ThemeManager !== 'undefined') {
      try {
        this.components.set('themeManager', new ThemeManager());
        console.log('Theme Manager initialized');
      } catch (error) {
        console.error('Theme Manager initialization failed:', error);
      }
    }
  }
  
  async initializeFeatures() {
    // Initialize news filters
    try {
      initializeNewsFilters();
      console.log('News filters initialized');
    } catch (error) {
      console.error('News filters initialization failed:', error);
    }
    
    // Initialize scroll effects
    try {
      this.initializeScrollEffects();
      console.log('Scroll effects initialized');
    } catch (error) {
      console.error('Scroll effects initialization failed:', error);
    }
    
    // Initialize animations
    try {
      this.initializeAnimations();
      console.log('Animations initialized');
    } catch (error) {
      console.error('Animations initialization failed:', error);
    }
  }
  
  initializeDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const darkModeIcon = document.getElementById("darkModeIcon");
    const mobileDarkModeToggle = document.getElementById("mobileDarkModeToggle");
    const mobileDarkModeIcon = document.getElementById("mobileDarkModeIcon");
    
    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      document.documentElement.classList.add("dark");
      if (darkModeIcon) {
        darkModeIcon.classList.remove("ri-moon-line");
        darkModeIcon.classList.add("ri-sun-line");
      }
      if (mobileDarkModeIcon) {
        mobileDarkModeIcon.classList.remove("fa-moon");
        mobileDarkModeIcon.classList.add("fa-sun");
      }
    }
    
    // Toggle function
    const toggleDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", "disabled");
        
        if (darkModeIcon) {
          darkModeIcon.classList.remove("ri-sun-line");
          darkModeIcon.classList.add("ri-moon-line");
        }
        if (mobileDarkModeIcon) {
          mobileDarkModeIcon.classList.remove("fa-sun");
          mobileDarkModeIcon.classList.add("fa-moon");
        }
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("darkMode", "enabled");
        
        if (darkModeIcon) {
          darkModeIcon.classList.remove("ri-moon-line");
          darkModeIcon.classList.add("ri-sun-line");
        }
        if (mobileDarkModeIcon) {
          mobileDarkModeIcon.classList.remove("fa-moon");
          mobileDarkModeIcon.classList.add("fa-sun");
        }
      }
    };
    
    // Add event listeners
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", toggleDarkMode);
    }
    if (mobileDarkModeToggle) {
      mobileDarkModeToggle.addEventListener("click", toggleDarkMode);
    }
  }
  
  initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById("backToTop") || document.getElementById("scrollToTop");
    
    if (backToTopBtn) {
      const handleScroll = this.throttle(() => {
        if (window.scrollY > 500) {
          backToTopBtn.classList.add("show");
          backToTopBtn.style.opacity = "1";
          backToTopBtn.style.visibility = "visible";
        } else {
          backToTopBtn.classList.remove("show");
          backToTopBtn.style.opacity = "0";
          backToTopBtn.style.visibility = "hidden";
        }
      }, 100);
      
      window.addEventListener("scroll", handleScroll);
      
      backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (typeof gsap !== 'undefined') {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: 0, autoKill: false },
            ease: "power2.inOut",
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
    
    // Cursor glow effect
    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow && window.innerWidth > 768) {
      document.addEventListener("mousemove", (e) => {
        cursorGlow.style.opacity = "0.7";
        cursorGlow.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
      });
      
      document.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = "0";
      });
    }
  }
  
  initializeAnimations() {
    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
              entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
              
              // Add animation classes if they exist
              if (entry.target.classList.contains('animate-on-scroll')) {
                entry.target.classList.add('animated');
              }
              
              animationObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      
      // Observe elements that should animate
      const animateElements = document.querySelectorAll(
        '.animate-on-scroll, .fade-in, .slide-up, [data-animate]'
      );
      
      animateElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        animationObserver.observe(el);
      });
    }
  }
  
  setupObservers() {
    // Set up mutation observer for dynamic content
    if ('MutationObserver' in window) {
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                this.processNewElement(node);
              }
            });
          }
        });
      });
      
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }
  
  processNewElement(element) {
    // Process newly added elements
    try {
      // Add lazy loading to images
      const images = element.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        img.loading = 'lazy';
      });
      
      // Add animation classes to new elements
      if (element.classList && element.classList.contains('animate-on-scroll')) {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
      }
      
    } catch (error) {
      console.error('Error processing new element:', error);
    }
  }
  
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  fallbackInitialization() {
    console.log('Running fallback initialization...');
    
    try {
      // Basic mobile menu fallback
      const mobileMenuButton = document.getElementById("mobileMenuButton");
      const mobileMenu = document.getElementById("mobileMenu");
      
      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
          mobileMenu.classList.toggle('active');
        });
      }
      
      // Basic dark mode fallback
      const darkModeToggle = document.getElementById("darkModeToggle");
      if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
          document.documentElement.classList.toggle('dark');
        });
      }
      
      console.log('Fallback initialization completed');
    } catch (error) {
      console.error('Fallback initialization failed:', error);
    }
  }
  
  destroy() {
    // Cleanup method
    this.components.forEach((component, name) => {
      if (component && typeof component.destroy === 'function') {
        try {
          component.destroy();
          console.log(`${name} destroyed`);
        } catch (error) {
          console.error(`Error destroying ${name}:`, error);
        }
      }
    });
    
    this.components.clear();
    this.initialized = false;
  }
}

// Initialize the website when DOM is ready
let websiteInitializer;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    websiteInitializer = new WebsiteInitializer();
  });
} else {
  websiteInitializer = new WebsiteInitializer();
}

// Make initializer globally available
window.websiteInitializer = websiteInitializer;

// Handle page unload
window.addEventListener('beforeunload', () => {
  if (websiteInitializer) {
    websiteInitializer.destroy();
  }
});

// Welcome Particles initialization moved to the unified function above
document.getElementById("enterButton").addEventListener("click", function () {
  const welcomeScreen = document.getElementById("welcomeScreen");
  welcomeScreen.style.opacity = "0";
  setTimeout(() => {
    welcomeScreen.style.display = "none";
  }, 1000);
});
// Create floating particles
document.addEventListener("DOMContentLoaded", function () {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random positioning and animation timing
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = Math.random() * 0.5 + 0.3;

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Different animation duration for each particle
    const animationDuration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${animationDuration}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;

    particlesContainer.appendChild(particle);
  }

  // Simulate loading completion after 6 seconds
  setTimeout(() => {
    const loader = document.getElementById("skeletonLoader");
    loader.style.opacity = 0;
    loader.style.transition = "opacity 1s ease";
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }, 6000);
});

// On DOM Load - Main initialization point for all animations
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all animations in one place
  initWelcomeParticles();
  initTypedText();
  initGSAPAnimations();
  initTiltEffects();

  // Initialize section-specific animations
  if (typeof initNewsSection === "function") initNewsSection();
  if (typeof initStaffSection === "function") initStaffSection();

  // Initialize GSAP animation for typed text
  gsap.from("#typedText", {
    opacity: 0,
    y: -20,
    duration: 1.2,
    ease: "power3.out",
  });
});
// GSAP animation for typed text moved to DOMContentLoaded event
