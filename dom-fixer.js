/**
 * DOM Fixer and Enhancement Script
 * Fixes common DOM issues and enhances website functionality
 */

class DOMFixer {
  constructor() {
    this.fixedElements = new Set();
    this.observers = [];
    this.init();
  }

  /**
   * Initialize DOM fixes
   */
  init() {
    console.log('Initializing DOM Fixer...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.runFixes();
      });
    } else {
      this.runFixes();
    }
  }

  /**
   * Run all DOM fixes
   */
  runFixes() {
    try {
      // Core fixes
      this.fixMissingElements();
      this.fixBrokenLinks();
      this.fixImageErrors();
      this.fixFormElements();
      this.fixAccessibility();
      // this.fixMobileMenu();
      // this.fixScrollBehavior();
      // this.fixDarkModeToggle();
      
      // Enhancement fixes
      this.enhanceNavigation();
      this.enhanceInteractivity();
      this.fixLayoutIssues();
      
      // Set up observers
      this.setupMutationObserver();
      this.setupIntersectionObserver();
      
      console.log('DOM fixes completed successfully');
    } catch (error) {
      console.error('Error during DOM fixes:', error);
    }
  }

  /**
   * Fix missing essential elements
   */
  fixMissingElements() {
    // Ensure main content wrapper exists
    if (!document.getElementById('mainContent')) {
      const mainContent = document.createElement('div');
      mainContent.id = 'mainContent';
      mainContent.className = 'main-content';
      
      // Wrap existing content
      const body = document.body;
      while (body.firstChild) {
        mainContent.appendChild(body.firstChild);
      }
      body.appendChild(mainContent);
    }

    // Ensure back to top button exists
    if (!document.getElementById('scrollToTop')) {
      const backToTop = document.createElement('button');
      backToTop.id = 'scrollToTop';
      backToTop.className = 'scroll-to-top fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg opacity-0 transition-all duration-300 z-50';
      backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
      backToTop.setAttribute('aria-label', 'Scroll to top');
      document.body.appendChild(backToTop);
    }

    // Ensure cursor glow element exists
    if (!document.getElementById('cursorGlow')) {
      const cursorGlow = document.createElement('div');
      cursorGlow.id = 'cursorGlow';
      cursorGlow.className = 'cursor-glow fixed pointer-events-none z-50 w-8 h-8 bg-primary/20 rounded-full blur-md opacity-0 transition-opacity duration-300';
      document.body.appendChild(cursorGlow);
    }
  }

  /**
   * Fix broken or empty links
   */
  fixBrokenLinks() {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Fix empty or invalid hrefs
      if (!href || href === '#' || href === '') {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          console.warn('Clicked on placeholder link:', link);
        });
        
        // Add visual indicator for placeholder links
        if (!link.classList.contains('social-icon-container')) {
          link.style.cursor = 'not-allowed';
          link.title = 'Link not yet implemented';
        }
      }
      
      // Fix external links
      if (href && (href.startsWith('http') || href.startsWith('www'))) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }

  /**
   * Fix image loading errors
   */
  fixImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading attribute if missing
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }
      
      // Handle image load errors
      img.addEventListener('error', () => {
        console.warn('Image failed to load:', img.src);
        
        // Create placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500';
        placeholder.style.width = img.style.width || '100%';
        placeholder.style.height = img.style.height || '200px';
        placeholder.innerHTML = '<i class="fas fa-image text-2xl"></i>';
        
        img.parentNode.replaceChild(placeholder, img);
      });
    });
  }

  /**
   * Fix form elements
   */
  fixFormElements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Add novalidate to prevent browser validation conflicts
      form.setAttribute('novalidate', 'true');
      
      // Fix form inputs
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        // Add required ARIA attributes
        if (!input.hasAttribute('aria-label') && !input.hasAttribute('aria-labelledby')) {
          const label = form.querySelector(`label[for="${input.id}"]`);
          if (label) {
            input.setAttribute('aria-labelledby', label.id || `label-${input.id}`);
          } else {
            input.setAttribute('aria-label', input.placeholder || input.name || 'Input field');
          }
        }
      });
    });
  }

  /**
   * Fix accessibility issues
   */
  fixAccessibility() {
    // Fix missing alt attributes
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
      img.alt = 'Image';
    });

    // Fix buttons without proper labels
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        button.setAttribute('aria-label', 'Button');
      }
    });

    // Fix links without proper labels
    const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
    links.forEach(link => {
      if (!link.textContent.trim() && !link.querySelector('img[alt]')) {
        link.setAttribute('aria-label', 'Link');
      }
    });

    // Add skip navigation link
    if (!document.querySelector('.skip-nav')) {
      const skipNav = document.createElement('a');
      skipNav.href = '#mainContent';
      skipNav.className = 'skip-nav sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded z-50';
      skipNav.textContent = 'Skip to main content';
      document.body.insertBefore(skipNav, document.body.firstChild);
    }
  }

  /**
   * Fix mobile menu functionality
   */
  // fixMobileMenu() {
  //   const mobileMenuButton = document.getElementById('mobileMenuButton');
  //   const mobileMenu = document.getElementById('mobileMenu');
  //
  //   if (mobileMenuButton && mobileMenu) {
  //     // Ensure proper ARIA attributes
  //     mobileMenuButton.setAttribute('aria-expanded', 'false');
  //     mobileMenuButton.setAttribute('aria-controls', 'mobileMenu');
  //     mobileMenu.setAttribute('aria-hidden', 'true');
  //
  //     // Fix menu toggle functionality
  //     mobileMenuButton.addEventListener('click', (e) => {
  //       e.preventDefault();
  //       const isOpen = mobileMenu.classList.contains('active');
  //
  //       if (isOpen) {
  //         mobileMenu.classList.remove('active');
  //         mobileMenuButton.setAttribute('aria-expanded', 'false');
  //         mobileMenu.setAttribute('aria-hidden', 'true');
  //         document.body.style.overflow = '';
  //       } else {
  //         mobileMenu.classList.add('active');
  //         mobileMenuButton.setAttribute('aria-expanded', 'true');
  //         mobileMenu.setAttribute('aria-hidden', 'false');
  //         document.body.style.overflow = 'hidden';
  //       }
  //     });
  //
  //     // Close menu when clicking outside
  //     document.addEventListener('click', (e) => {
  //       if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
  //         mobileMenu.classList.remove('active');
  //         mobileMenuButton.setAttribute('aria-expanded', 'false');
  //         mobileMenu.setAttribute('aria-hidden', 'true');
  //         document.body.style.overflow = '';
  //       }
  //     });
  //
  //     // Close menu on escape key
  //     document.addEventListener('keydown', (e) => {
  //       if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
  //         mobileMenu.classList.remove('active');
  //         mobileMenuButton.setAttribute('aria-expanded', 'false');
  //         mobileMenu.setAttribute('aria-hidden', 'true');
  //         document.body.style.overflow = '';
  //         mobileMenuButton.focus();
  //       }
  //     });
  //   }
  // }

  /**
   * Fix scroll behavior
   */
  // fixScrollBehavior() {
  //   // Ensure smooth scrolling is enabled
  //   document.documentElement.style.scrollBehavior = 'smooth';
  //
  //   // Fix back to top button
  //   const backToTop = document.getElementById('scrollToTop');
  //   if (backToTop) {
  //     window.addEventListener('scroll', () => {
  //       if (window.scrollY > 500) {
  //         backToTop.style.opacity = '1';
  //         backToTop.style.transform = 'translateY(0)';
  //       } else {
  //         backToTop.style.opacity = '0';
  //         backToTop.style.transform = 'translateY(20px)';
  //       }
  //     });
  //
  //     backToTop.addEventListener('click', (e) => {
  //       e.preventDefault();
  //       window.scrollTo({ top: 0, behavior: 'smooth' });
  //     });
  //   }
  // }

  /**
   * Fix dark mode toggle
   */
  // fixDarkModeToggle() {
  //   const darkModeToggle = document.getElementById('darkModeToggle');
  //   const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
  //
  //   const toggleDarkMode = () => {
  //     const isDark = document.documentElement.classList.toggle('dark');
  //     localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  //
  //     // Update icons
  //     const icons = document.querySelectorAll('#darkModeIcon, #mobileDarkModeIcon');
  //     icons.forEach(icon => {
  //       if (isDark) {
  //         icon.className = 'fas fa-sun';
  //       } else {
  //         icon.className = 'fas fa-moon';
  //       }
  //     });
  //   };
  //
  //   if (darkModeToggle) {
  //     darkModeToggle.addEventListener('click', toggleDarkMode);
  //   }
  //
  //   if (mobileDarkModeToggle) {
  //     mobileDarkModeToggle.addEventListener('click', toggleDarkMode);
  //   }
  //
  //   // Initialize dark mode from localStorage
  //   if (localStorage.getItem('darkMode') === 'enabled') {
  //     document.documentElement.classList.add('dark');
  //     const icons = document.querySelectorAll('#darkModeIcon, #mobileDarkModeIcon');
  //     icons.forEach(icon => {
  //       icon.className = 'fas fa-sun';
  //     });
  //   }
  // }

  /**
   * Enhance navigation functionality
   */
  enhanceNavigation() {
    // Add active state management
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
      });
    });
    
    // Enhance dropdown menus (Now commented out as this is handled by header.js)
    // const dropdowns = document.querySelectorAll('.nav-item');
    // dropdowns.forEach(dropdown => {
    //   const menu = dropdown.querySelector('.dropdown-menu');
    //   if (menu) {
    //     dropdown.addEventListener('mouseenter', () => {
    //       menu.style.opacity = '1';
    //       menu.style.visibility = 'visible';
    //       menu.style.transform = 'translateY(0)';
    //     });
    //
    //     dropdown.addEventListener('mouseleave', () => {
    //       menu.style.opacity = '0';
    //       menu.style.visibility = 'hidden';
    //       menu.style.transform = 'translateY(-10px)';
    //     });
    //   }
    // });
  }

  /**
   * Enhance interactivity
   */
  enhanceInteractivity() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.staff-card, .news-card, .gallery-item');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (!button.disabled) {
          button.style.opacity = '0.7';
          button.style.cursor = 'wait';
          
          setTimeout(() => {
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
          }, 2000);
        }
      });
    });
  }

  /**
   * Fix layout issues
   */
  fixLayoutIssues() {
    // Fix container overflow issues
    const containers = document.querySelectorAll('.container, .max-w-7xl');
    containers.forEach(container => {
      container.style.overflowX = 'hidden';
    });
    
    // Fix image aspect ratios
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.style.objectFit) {
        img.style.objectFit = 'cover';
      }
    });
    
    // Fix flex layout issues
    const flexContainers = document.querySelectorAll('.flex');
    flexContainers.forEach(container => {
      if (!container.style.minHeight && container.children.length === 0) {
        container.style.minHeight = '1px';
      }
    });
  }

  /**
   * Set up mutation observer to watch for DOM changes
   */
  setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.fixNewElement(node);
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    this.observers.push(observer);
  }

  /**
   * Set up intersection observer for lazy loading and animations
   */
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Trigger lazy loading for images (Now commented out to rely on native loading='lazy')
          // const images = entry.target.querySelectorAll('img[data-src]');
          // images.forEach(img => {
          //   img.src = img.dataset.src;
          //   img.removeAttribute('data-src');
          // });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    this.observers.push(observer);
  }

  /**
   * Fix newly added elements
   */
  fixNewElement(element) {
    // Fix images
    const images = element.querySelectorAll ? element.querySelectorAll('img') : [];
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }
      if (!img.alt) {
        img.alt = 'Image';
      }
    });
    
    // Fix links
    const links = element.querySelectorAll ? element.querySelectorAll('a') : [];
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('http') || href.startsWith('www'))) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }

  /**
   * Clean up observers
   */
  destroy() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers = [];
  }
}

// Initialize DOM fixer
const domFixer = new DOMFixer();

// Make it globally available
window.domFixer = domFixer;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DOMFixer;
}