document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      document.querySelectorAll(".news-card").forEach(card => {
        card.style.display = (category === "all" || card.classList.contains(category)) ? "block" : "none";
      });
    });
  });

    // Custom Cursor Glow
    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow) {
      document.addEventListener("mousemove", e => {
        cursorGlow.style.opacity = '0.7';
        cursorGlow.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
      });

      document.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = '0';
      });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      // Throttle function to limit how often the scroll event fires
      function throttle(func, limit) {
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
      
      // Throttled scroll handler
      const handleScroll = throttle(() => {
        if (window.scrollY > 500) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      }, 100);
      
      window.addEventListener('scroll', handleScroll);
      
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Use GSAP for smoother scrolling
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: 0,
            autoKill: false
          },
          ease: 'power2.inOut'
        });
      });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.documentElement.classList.add('dark');
      darkModeIcon.classList.remove('ri-moon-line');
      darkModeIcon.classList.add('ri-sun-line');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
        darkModeIcon.classList.remove('ri-sun-line');
        darkModeIcon.classList.add('ri-moon-line');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
        darkModeIcon.classList.remove('ri-moon-line');
        darkModeIcon.classList.add('ri-sun-line');
      }
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = mobileMenuButton ? mobileMenuButton.querySelector('i') : null;

    // Function to open mobile menu
    function openMobileMenu() {
      if (!mobileMenu || !menuIcon) return;
      mobileMenu.classList.add('active');
      menuIcon.classList.remove('ri-menu-line');
      menuIcon.classList.add('ri-close-line');
    }

    // Function to close mobile menu
    function closeMobileMenu() {
      if (!mobileMenu || !menuIcon) return;
      mobileMenu.classList.remove('active');
      menuIcon.classList.remove('ri-close-line');
      menuIcon.classList.add('ri-menu-line');
    }

    // Toggle mobile menu
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', () => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    // Close menu when clicking on mobile nav links
    if (mobileMenu) {
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          closeMobileMenu();
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            mobileMenuButton && !mobileMenuButton.contains(e.target)) {
          closeMobileMenu();
        }
      });
    }

    // Floating Labels
    const floatingLabels = document.querySelectorAll('.relative input, .relative textarea');
    floatingLabels.forEach(input => {
      const label = input.nextElementSibling;
      input.addEventListener('focus', () => {
        label.classList.add('floating-label-active');
      });
      input.addEventListener('blur', () => {
        if (!input.value) label.classList.remove('floating-label-active');
      });
      if (input.value) label.classList.add('floating-label-active');
    });


    // GSAP Scroll Animations
    function initGSAPAnimations() {
      // Clear any existing ScrollTriggers to prevent duplicates
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Society section specific animations with markers for debugging
      const societyElements = document.querySelectorAll('#society .animate');
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
            scrub: 0.5 // Smooth animation tied to scroll position
          }
        });
      });
      
      // General animations for other sections
      gsap.utils.toArray('.animate:not(#society .animate)').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reset"
          }
        });
      });
    }

    // Tilt Effect for Cards
    function initTiltEffects() {
      // Check if VanillaTilt is defined before using it
      if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
          max: 5,
          speed: 300,
          glare: true,
          'max-glare': 0.1,
          scale: 1.02
        });
      } else {
        console.warn('VanillaTilt library not loaded. Tilt effects disabled.');
      }
    }
    
    // Define initScrollAnimations function that's missing in Gallery Section.js
    function initScrollAnimations() {
      // Simple implementation of scroll animations for gallery items
      const animatedItems = document.querySelectorAll('.gallery-item');
      animatedItems.forEach(item => {
        // Reset initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        // Create observer
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(item);
      });
    }

    // Three.js Particle Background for Welcome Screen
    function initWelcomeParticles() {
      // Check for both possible container IDs
      const container = document.getElementById('heroParticles') || document.getElementById('particles-js');
      if (!container) {
        console.warn("Particles container not found");
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xe74c3c, transparent: true, opacity: 0.6 });

      const particles = [];
      for (let i = 0; i < 100; i++) {
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10);
        scene.add(sphere);
        particles.push(sphere);
      }

      camera.position.z = 5;

      function animateThreeJS() {
        requestAnimationFrame(animateThreeJS);
        particles.forEach(p => {
          p.position.y -= 0.01;
          if (p.position.y < -10) p.position.y = 10;
        });
        renderer.render(scene, camera);
      }

      animateThreeJS();
      
      // Add resize handler
      window.addEventListener('resize', () => {
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
        enterButton.addEventListener('click', () => {
          welcomeScreen.classList.add('fade-out');
          skeletonLoader.classList.add('active');
          
          setTimeout(() => {
            skeletonLoader.classList.remove('active');
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
          welcomeScreen.classList.add('fade-out');
          skeletonLoader.classList.add('active');
          
          setTimeout(() => {
            skeletonLoader.classList.remove('active');
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
    
      if (!typedElement) {
        console.warn("Typed.js element (#typedText) not found in DOM.");
        return;
      }
    
      // Optional: Add gradient text styling dynamically
      typedElement.classList.add(
        "text-transparent",
        "bg-clip-text",
        "bg-gradient-to-r",
        "from-white",
        "to-gray-300"
      );
    
      new Typed("#typedText", {
        strings: [
          "A Legacy of Excellence",
          "Inspiring Young Minds Since 19XX",
          "Where Learning Meets Innovation"
        ],
        typeSpeed: 50,        // Slower and smoother typing
        backSpeed: 20,        // Smooth backspacing
        backDelay: 1800,      // Slight pause before backspace
        startDelay: 600,      // Delay before first string starts
        loop: true,
        showCursor: true,
        cursorChar: "<span class='cursor-blink'>|</span>",
        autoInsertCss: false, // We'll define custom cursor
        fadeOut: true,
        fadeOutClass: "typed-fade-out",
        fadeOutDelay: 400
      });
    }
    function initGSAPAnimations() {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.glassmorphism, .tilt-effect').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }

    function initTiltEffects() {
      // Check if VanillaTilt is defined before using it
      if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
          max: 5,
          speed: 300,
          glare: true,
          'max-glare': 0.1,
          scale: 1.02
        });
      } else {
        console.warn('VanillaTilt library not loaded. Tilt effects disabled.');
      }
    }
    
    // Define initScrollAnimations function that's missing in Gallery Section.js
    function initScrollAnimations() {
      // Simple implementation of scroll animations for gallery items
      const animatedItems = document.querySelectorAll('.gallery-item');
      animatedItems.forEach(item => {
        // Reset initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        // Create observer
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        
        observer.observe(item);
      });
    }

    // Handle Script Errors
    function handleScriptError(event) {
      console.error("Script failed to load:", event.target.src);
      alert("A critical script failed to load. Please check your internet connection.");
    }

    // Welcome Particles initialization moved to the unified function above
    document.getElementById('enterButton').addEventListener('click', function() {
      const welcomeScreen = document.getElementById('welcomeScreen');
      welcomeScreen.style.opacity = '0';
      setTimeout(() => {
        welcomeScreen.style.display = 'none';
      }, 1000);
    });
        // Create floating particles
        document.addEventListener('DOMContentLoaded', function() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
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
        const loader = document.getElementById('skeletonLoader');
        loader.style.opacity = 0;
        loader.style.transition = 'opacity 1s ease';
        setTimeout(() => {
          loader.style.display = 'none';
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
      if (typeof initNewsSection === 'function') initNewsSection();
      if (typeof initStaffSection === 'function') initStaffSection();
      
      // Initialize GSAP animation for typed text
      gsap.from("#typedText", {
        opacity: 0,
        y: -20,
        duration: 1.2,
        ease: "power3.out"
      });
    });
// GSAP animation for typed text moved to DOMContentLoaded event