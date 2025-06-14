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

        filterButtons.forEach(btn => btn.classList.remove('active'));
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

// Enhanced Mobile Menu Logic (Commented out as per previous subtask)
// function initializeMobileMenu() { ... }

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
  if (typeof gsap === 'undefined') {
    console.warn('GSAP library not loaded. Animations disabled.');
    return;
  }
  if (typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP ScrollTrigger plugin not loaded. Scroll-triggered animations disabled.');
    // We can still run immediate animations if ScrollTrigger is missing
  } else {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Kill existing triggers first
  }

  // --- Immediate Animations for #home section ---
  gsap.from("#typedText", {
    opacity: 0,
    y: -20,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2,
  });

  const homeElementsToAnimate = [
    document.querySelector('#home .relative.inline-block p.text-xl'), // Subtitle container's p tag
    ...document.querySelectorAll('#home .flex.flex-wrap.justify-center.gap-6 > a'), // CTA Buttons
    ...document.querySelectorAll('#home .mt-16.flex.flex-wrap.justify-center.gap-8 > div'), // School Stats divs
    document.querySelector('#home .absolute.bottom-10 .glassmorphism') // Glassmorphism Intro Card
  ].filter(el => el);

  homeElementsToAnimate.forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: 0.5 + (i * 0.15) // Staggered delay after typedText
    });
  });

  // --- Scroll-Triggered Animations for other sections ---
  if (typeof ScrollTrigger !== 'undefined') {
    // Society section specific scroll-triggered animations
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
          onEnter: () => ScrollTrigger.refresh(),
          onLeaveBack: () => ScrollTrigger.refresh(),
          scrub: 0.5,
        },
      });
    });

    // Generic scroll-triggered animations for .animate (excluding #society and #home elements handled above)
    gsap.utils.toArray(".animate:not(#society .animate):not(#home .relative.inline-block p.text-xl):not(#home .flex.flex-wrap.justify-center.gap-6 > a):not(#home .mt-16.flex.flex-wrap.justify-center.gap-8 > div)").forEach((el, i) => {
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

    // Generic scroll-triggered animations for .glassmorphism and .tilt-effect (excluding #home elements handled above)
    gsap.utils.toArray(".glassmorphism:not(#home .absolute.bottom-10 .glassmorphism), .tilt-effect").forEach((el) => {
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
  } else {
    // Fallback for non-scroll-triggered elements if ScrollTrigger is not available
    // Make them visible immediately but without scroll effects
    document.querySelectorAll("#society .animate, .animate:not(#home p.text-xl):not(#home .flex.flex-wrap.justify-center.gap-6 > a):not(#home .mt-16.flex.flex-wrap.justify-center.gap-8 > div), .glassmorphism:not(#home .absolute.bottom-10 .glassmorphism), .tilt-effect").forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
    });
  }
}


// Tilt Effect for Cards
function initTiltEffects() {
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
  const animatedItems = document.querySelectorAll(".gallery-item");
  animatedItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
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

// Three.js Particle Background for Hero Section (assumed, based on ID #heroParticles)
function initWelcomeParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) {
    return;
  }

  if (container.dataset.initialized === 'true') {
    return;
  }
  container.dataset.initialized = 'true';

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
    const sphere = new THREE.Mesh(geometry, material.clone());
    sphere.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 5
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

  window.addEventListener("resize", () => {
    if (container.clientWidth > 0 && container.clientHeight > 0) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
  });
}


// Init TypedText Function
function initTypedText() {
  const typedElement = document.getElementById("typedText");
  const cursorContainer = document.querySelector(".typing-cursor-container");

  if (!typedElement) {
    console.warn("TypeIt element (#typedText) not found in DOM.");
    return;
  }
  if (typedElement.dataset.initialized === 'true') return;
  typedElement.dataset.initialized = 'true';


  setTimeout(() => {
    typedElement.style.opacity = '1';
    if (cursorContainer) {
      cursorContainer.classList.add('active');
    }
  }, 800);

  const typeItInstance = new TypeIt("#typedText", {
    strings: [
      "Welcome To Homagama Maha Vidyalaya",
      "හෝමාගම මහා විද්‍යාලයට සාදරයෙන් පිළිගනිමු",
      "ஹோமாகம மகா வித்தியாலயத்திற்கு வரவேற்கிறோம்",
    ],
    speed: 40,
    deleteSpeed: 10,
    lifeLike: true,
    cursor: false,
    breakLines: false,
    waitUntilVisible: true,
    loop: true,
    loopDelay: 2000,
    startDelay: 800,
    html: true,
    afterStep: (instance) => {
      if (cursorContainer) {
        const progress = typedElement.textContent.length / 300;
        const cursorLine = cursorContainer.querySelector('.typing-cursor-line');
        if (cursorLine) {
          cursorLine.style.width = `${Math.min(100, progress * 100)}%`;
        }
      }
    },
    afterComplete: (instance) => instance.pause(15000),
    afterString: (step, instance) => instance.pause(800)
  }).go();

  return typeItInstance;
}

// Enhanced Script Error Handling
function handleScriptError(event) {
  console.error("Script failed to load:", event.target.src);
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
  }

  async init() {
    try {
      console.log('Starting website initialization (from WebsiteInitializer)...');
      await this.waitForDOM();
      await this.initializeCore();
      await this.initializeUI();
      await this.initializeFeatures();
      this.setupObservers();
      this.initialized = true;
      console.log('Website initialization completed successfully (from WebsiteInitializer)');
      window.dispatchEvent(new CustomEvent('websiteInitialized'));
    } catch (error) {
      console.error('Website initialization failed (from WebsiteInitializer):', error);
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
    if (typeof WebsiteRouter !== 'undefined') { try { this.components.set('router', new WebsiteRouter()); console.log('Router initialized'); } catch (e) { console.error('Router init failed:', e);}}
    if (typeof DOMFixer !== 'undefined') { try { this.components.set('domFixer', new DOMFixer()); console.log('DOM Fixer initialized'); } catch (e) { console.error('DOM Fixer init failed:', e);}}
    if (typeof ErrorHandler !== 'undefined') { try { this.components.set('errorHandler', new ErrorHandler()); console.log('Error Handler initialized'); } catch (e) { console.error('Error Handler init failed:', e);}}
  }

  async initializeUI() {
    try { this.initializeDarkMode(); console.log('Dark mode initialized (from WebsiteInitializer)'); } catch (e) { console.error('Dark mode init failed (from WebsiteInitializer):', e); }
    if (typeof ThemeManager !== 'undefined') { try { this.components.set('themeManager', new ThemeManager()); console.log('Theme Manager initialized'); } catch (e) { console.error('Theme Manager init failed:', e);}}
  }

  async initializeFeatures() {
    try { initializeNewsFilters(); console.log('News filters initialized'); } catch (e) { console.error('News filters init failed:', e);}
    try { this.initializeScrollEffects(); console.log('Scroll effects initialized'); } catch (e) { console.error('Scroll effects init failed:', e);}
  }

  initializeDarkMode() { /* Already commented out */ }

  initializeScrollEffects() {
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
        if (typeof gsap !== 'undefined') gsap.to(window, { duration: 1, scrollTo: { y: 0, autoKill: false }, ease: "power2.inOut"});
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow && window.innerWidth > 768) {
      document.addEventListener("mousemove", (e) => {
        cursorGlow.style.opacity = "0.7";
        cursorGlow.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
      });
      document.addEventListener("mouseleave", () => { cursorGlow.style.opacity = "0"; });
    }
  }

  initializeAnimations() { /* Called from main loader logic */ }

  setupObservers() {
    if ('MutationObserver' in window) {
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) this.processNewElement(node);
            });
          }
        });
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }
  }

  processNewElement(element) {
    try {
      const images = element.querySelectorAll('img:not([loading])');
      images.forEach(img => { img.loading = 'lazy'; });
      if (element.classList && element.classList.contains('animate-on-scroll')) {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
      }
    } catch (e) { console.error('Error processing new element:', e); }
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
      const mobileMenuButton = document.getElementById("mobileMenuButton");
      const mobileMenu = document.getElementById("mobileMenu");
      if (mobileMenuButton && mobileMenu) mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('active'));
      const darkModeToggle = document.getElementById("darkModeToggle");
      if (darkModeToggle) darkModeToggle.addEventListener('click', () => document.documentElement.classList.toggle('dark'));
      console.log('Fallback initialization completed');
    } catch (e) { console.error('Fallback initialization failed:', e); }
  }

  destroy() {
    this.components.forEach((component, name) => {
      if (component && typeof component.destroy === 'function') {
        try { component.destroy(); console.log(`${name} destroyed`); } catch (e) { console.error(`Error destroying ${name}:`, e); }
      }
    });
    this.components.clear();
    this.initialized = false;
  }
}

// Consolidated Loader and Initialization Logic
document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const skeletonLoader = document.getElementById("skeletonLoader");
  const mainContent = document.getElementById("mainContent");
  const enterButton = document.getElementById("enterButton");
  const particlesContainer = document.getElementById("particles");

  if (particlesContainer) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      const animationDuration = Math.random() * 20 + 10;
      particle.style.animationDuration = `${animationDuration}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particlesContainer.appendChild(particle);
    }
  } else {
    console.warn("Skeleton loader particles container (#particles) not found.");
  }

  function showMainContentAndInitialize() {
    if (skeletonLoader) skeletonLoader.classList.remove("active");
    if (mainContent) mainContent.classList.remove("hidden");

    initGSAPAnimations();
    initTiltEffects();
    initWelcomeParticles();
    initTypedText();

    if (typeof initNewsSection === "function") initNewsSection();
    if (typeof initStaffSection === "function") initStaffSection();

    if (!window.websiteInitializerInstance) {
        window.websiteInitializerInstance = new WebsiteInitializer();
        window.websiteInitializerInstance.init();
    }
  }

  if (enterButton) {
    enterButton.addEventListener("click", () => {
      if (welcomeScreen) welcomeScreen.classList.add("fade-out");
      if (skeletonLoader) skeletonLoader.classList.add("active");
      setTimeout(showMainContentAndInitialize, 2000);
    });
  } else {
    if (welcomeScreen) welcomeScreen.classList.add("fade-out");
    if (skeletonLoader) skeletonLoader.classList.add("active");
    setTimeout(showMainContentAndInitialize, 2000);
  }
});

window.addEventListener('beforeunload', () => {
  if (window.websiteInitializerInstance) {
    window.websiteInitializerInstance.destroy();
  }
});
