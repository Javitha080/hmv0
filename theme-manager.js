/**
 * Comprehensive Theme Manager for Dark/Light Mode
 * Handles theme switching, persistence, and error recovery
 */

class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.isInitialized = false;
    this.observers = [];
    this.errorCount = 0;
    this.maxRetries = 3;
    
    // Theme configuration
    this.themes = {
      light: {
        name: 'light',
        class: '',
        icon: 'ri-moon-line',
        mobileIcon: 'fas fa-moon',
        title: 'Switch to Dark Mode'
      },
      dark: {
        name: 'dark',
        class: 'dark',
        icon: 'ri-sun-line',
        mobileIcon: 'fas fa-sun',
        title: 'Switch to Light Mode'
      }
    };
    
    this.init();
  }

  /**
   * Initialize theme manager
   */
  init() {
    try {
      console.log('Initializing Theme Manager...');
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.setup();
        });
      } else {
        this.setup();
      }
    } catch (error) {
      this.handleError('Initialization failed', error);
    }
  }

  /**
   * Setup theme manager
   */
  setup() {
    try {
      // Load saved theme
      this.loadSavedTheme();
      
      // Setup toggle buttons
      this.setupToggleButtons();
      
      // Apply theme to all sections
      this.applyThemeToAllSections();
      
      // Setup observers
      this.setupMutationObserver();
      
      // Setup system theme detection
      this.setupSystemThemeDetection();
      
      this.isInitialized = true;
      console.log('Theme Manager initialized successfully');
      
      // Dispatch initialization event
      this.dispatchThemeEvent('themeManagerInitialized', {
        theme: this.currentTheme
      });
      
    } catch (error) {
      this.handleError('Setup failed', error);
    }
  }

  /**
   * Load saved theme from localStorage
   */
  loadSavedTheme() {
    try {
      const savedTheme = localStorage.getItem('darkMode');
      
      // Handle different storage formats for backward compatibility
      if (savedTheme === 'enabled' || savedTheme === 'true' || savedTheme === 'dark') {
        this.currentTheme = 'dark';
      } else if (savedTheme === 'disabled' || savedTheme === 'false' || savedTheme === 'light') {
        this.currentTheme = 'light';
      } else {
        // Auto-detect system preference
        this.currentTheme = this.getSystemTheme();
      }
      
      // Apply the theme immediately
      this.applyTheme(this.currentTheme, false);
      
    } catch (error) {
      this.handleError('Failed to load saved theme', error);
      this.currentTheme = 'light'; // Fallback to light theme
    }
  }

  /**
   * Get system theme preference
   */
  getSystemTheme() {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    } catch (error) {
      this.handleError('Failed to detect system theme', error);
      return 'light';
    }
  }

  /**
   * Setup system theme detection
   */
  setupSystemThemeDetection() {
    try {
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Listen for system theme changes
        const handleSystemThemeChange = (e) => {
          // Only auto-switch if user hasn't manually set a preference
          if (!localStorage.getItem('darkMode')) {
            const newTheme = e.matches ? 'dark' : 'light';
            this.setTheme(newTheme);
          }
        };
        
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handleSystemThemeChange);
        } else {
          // Fallback for older browsers
          mediaQuery.addListener(handleSystemThemeChange);
        }
      }
    } catch (error) {
      this.handleError('Failed to setup system theme detection', error);
    }
  }

  /**
   * Setup toggle buttons
   */
  setupToggleButtons() {
    try {
      // Desktop toggle
      const desktopToggle = document.getElementById('darkModeToggle');
      if (desktopToggle) {
        this.setupToggleButton(desktopToggle, 'desktop');
      }
      
      // Mobile toggle
      const mobileToggle = document.getElementById('mobileDarkModeToggle');
      if (mobileToggle) {
        this.setupToggleButton(mobileToggle, 'mobile');
      }
      
      // Update button states
      this.updateToggleButtons();
      
    } catch (error) {
      this.handleError('Failed to setup toggle buttons', error);
    }
  }

  /**
   * Setup individual toggle button
   */
  setupToggleButton(button, type) {
    try {
      // Remove existing event listeners
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
      
      // Add new event listener
      newButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
      
      // Add keyboard support
      newButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTheme();
        }
      });
      
      // Ensure proper ARIA attributes
      newButton.setAttribute('role', 'button');
      newButton.setAttribute('tabindex', '0');
      
    } catch (error) {
      this.handleError(`Failed to setup ${type} toggle button`, error);
    }
  }

  /**
   * Toggle between themes
   */
  toggleTheme() {
    try {
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    } catch (error) {
      this.handleError('Failed to toggle theme', error);
    }
  }

  /**
   * Set specific theme
   */
  setTheme(themeName, saveToStorage = true) {
    try {
      if (!this.themes[themeName]) {
        throw new Error(`Invalid theme: ${themeName}`);
      }
      
      const oldTheme = this.currentTheme;
      this.currentTheme = themeName;
      
      // Apply theme
      this.applyTheme(themeName, saveToStorage);
      
      // Update UI elements
      this.updateToggleButtons();
      
      // Apply theme to all sections
      this.applyThemeToAllSections();
      
      // Dispatch theme change event
      this.dispatchThemeEvent('themeChanged', {
        oldTheme,
        newTheme: themeName
      });
      
      console.log(`Theme changed from ${oldTheme} to ${themeName}`);
      
    } catch (error) {
      this.handleError('Failed to set theme', error);
    }
  }

  /**
   * Apply theme to document
   */
  applyTheme(themeName, saveToStorage = true) {
    try {
      const theme = this.themes[themeName];
      const html = document.documentElement;
      
      // Remove all theme classes
      Object.values(this.themes).forEach(t => {
        if (t.class) {
          html.classList.remove(t.class);
        }
      });
      
      // Add new theme class
      if (theme.class) {
        html.classList.add(theme.class);
      }
      
      // Save to localStorage
      if (saveToStorage) {
        localStorage.setItem('darkMode', themeName === 'dark' ? 'enabled' : 'disabled');
      }
      
      // Update CSS custom properties
      this.updateCSSVariables(themeName);
      
    } catch (error) {
      this.handleError('Failed to apply theme', error);
    }
  }

  /**
   * Update CSS custom properties for theme
   */
  updateCSSVariables(themeName) {
    try {
      const root = document.documentElement;
      
      if (themeName === 'dark') {
        root.style.setProperty('--bg-primary', '#1a1a1a');
        root.style.setProperty('--bg-secondary', '#2d2d2d');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#e5e5e5');
        root.style.setProperty('--border-color', '#404040');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.5)');
      } else {
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8f9fa');
        root.style.setProperty('--text-primary', '#333333');
        root.style.setProperty('--text-secondary', '#666666');
        root.style.setProperty('--border-color', '#e0e0e0');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
      }
    } catch (error) {
      this.handleError('Failed to update CSS variables', error);
    }
  }

  /**
   * Update toggle button states
   */
  updateToggleButtons() {
    try {
      const theme = this.themes[this.currentTheme];
      
      // Update desktop toggle
      const desktopIcon = document.getElementById('darkModeIcon');
      if (desktopIcon) {
        this.updateIcon(desktopIcon, theme.icon, theme.title);
      }
      
      // Update mobile toggle
      const mobileIcon = document.getElementById('mobileDarkModeIcon');
      if (mobileIcon) {
        this.updateIcon(mobileIcon, theme.mobileIcon, theme.title);
      }
      
      // Update toggle button attributes
      const toggles = document.querySelectorAll('#darkModeToggle, #mobileDarkModeToggle');
      toggles.forEach(toggle => {
        toggle.setAttribute('aria-label', theme.title);
        toggle.setAttribute('title', theme.title);
      });
      
    } catch (error) {
      this.handleError('Failed to update toggle buttons', error);
    }
  }

  /**
   * Update icon classes
   */
  updateIcon(iconElement, iconClass, title) {
    try {
      if (!iconElement) return;
      
      // Clear existing classes
      iconElement.className = '';
      
      // Add new icon class
      if (iconClass.includes(' ')) {
        // Multiple classes (e.g., "fas fa-sun")
        iconClass.split(' ').forEach(cls => {
          if (cls.trim()) {
            iconElement.classList.add(cls.trim());
          }
        });
      } else {
        // Single class
        iconElement.classList.add(iconClass);
      }
      
      iconElement.setAttribute('title', title);
      
    } catch (error) {
      this.handleError('Failed to update icon', error);
    }
  }

  /**
   * Apply theme to all sections
   */
  applyThemeToAllSections() {
    try {
      // Apply to header
      this.applyThemeToHeader();
      
      // Apply to navigation
      this.applyThemeToNavigation();
      
      // Apply to hero section
      this.applyThemeToHero();
      
      // Apply to content sections
      this.applyThemeToSections();
      
      // Apply to footer
      this.applyThemeToFooter();
      
      // Apply to forms
      this.applyThemeToForms();
      
      // Apply to cards
      this.applyThemeToCards();
      
      // Apply to modals and overlays
      this.applyThemeToModals();
      
    } catch (error) {
      this.handleError('Failed to apply theme to sections', error);
    }
  }

  /**
   * Apply theme to header
   */
  applyThemeToHeader() {
    try {
      const header = document.querySelector('header');
      if (header) {
        if (this.currentTheme === 'dark') {
          header.classList.add('dark:bg-gray-900', 'dark:text-white');
        }
      }
    } catch (error) {
      this.handleError('Failed to apply theme to header', error);
    }
  }

  /**
   * Apply theme to navigation
   */
  applyThemeToNavigation() {
    try {
      const navLinks = document.querySelectorAll('nav a, .nav-link');
      navLinks.forEach(link => {
        if (this.currentTheme === 'dark') {
          link.classList.add('dark:text-gray-300', 'dark:hover:text-white');
        }
      });
    } catch (error) {
      this.handleError('Failed to apply theme to navigation', error);
    }
  }

  /**
   * Apply theme to hero section
   */
  applyThemeToHero() {
    try {
      const hero = document.querySelector('.hero, #hero');
      if (hero) {
        if (this.currentTheme === 'dark') {
          hero.classList.add('dark:bg-gray-900', 'dark:text-white');
        }
      }
    } catch (error) {
      this.handleError('Failed to apply theme to hero', error);
    }
  }

  /**
   * Apply theme to content sections
   */
  applyThemeToSections() {
    try {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        if (this.currentTheme === 'dark') {
          section.classList.add('dark:bg-gray-800', 'dark:text-white');
        }
      });
    } catch (error) {
      this.handleError('Failed to apply theme to sections', error);
    }
  }

  /**
   * Apply theme to footer
   */
  applyThemeToFooter() {
    try {
      const footer = document.querySelector('footer');
      if (footer) {
        if (this.currentTheme === 'dark') {
          footer.classList.add('dark:bg-gray-900', 'dark:text-white');
        }
      }
    } catch (error) {
      this.handleError('Failed to apply theme to footer', error);
    }
  }

  /**
   * Apply theme to forms
   */
  applyThemeToForms() {
    try {
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        if (this.currentTheme === 'dark') {
          input.classList.add('dark:bg-gray-700', 'dark:text-white', 'dark:border-gray-600');
        }
      });
      
      const buttons = document.querySelectorAll('button:not(#darkModeToggle):not(#mobileDarkModeToggle)');
      buttons.forEach(button => {
        if (this.currentTheme === 'dark') {
          button.classList.add('dark:bg-gray-700', 'dark:text-white', 'dark:hover:bg-gray-600');
        }
      });
    } catch (error) {
      this.handleError('Failed to apply theme to forms', error);
    }
  }

  /**
   * Apply theme to cards
   */
  applyThemeToCards() {
    try {
      const cards = document.querySelectorAll('.card, .staff-card, .news-card, .gallery-item');
      cards.forEach(card => {
        if (this.currentTheme === 'dark') {
          card.classList.add('dark:bg-gray-800', 'dark:text-white', 'dark:border-gray-700');
        }
      });
    } catch (error) {
      this.handleError('Failed to apply theme to cards', error);
    }
  }

  /**
   * Apply theme to modals and overlays
   */
  applyThemeToModals() {
    try {
      const modals = document.querySelectorAll('.modal, .overlay, .dropdown');
      modals.forEach(modal => {
        if (this.currentTheme === 'dark') {
          modal.classList.add('dark:bg-gray-800', 'dark:text-white', 'dark:border-gray-700');
        }
      });
    } catch (error) {
      this.handleError('Failed to apply theme to modals', error);
    }
  }

  /**
   * Setup mutation observer to handle dynamically added content
   */
  setupMutationObserver() {
    try {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                this.applyThemeToNewElement(node);
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
    } catch (error) {
      this.handleError('Failed to setup mutation observer', error);
    }
  }

  /**
   * Apply theme to newly added elements
   */
  applyThemeToNewElement(element) {
    try {
      if (this.currentTheme === 'dark') {
        // Apply dark theme classes to new elements
        if (element.matches('input, textarea, select')) {
          element.classList.add('dark:bg-gray-700', 'dark:text-white', 'dark:border-gray-600');
        } else if (element.matches('button:not(#darkModeToggle):not(#mobileDarkModeToggle)')) {
          element.classList.add('dark:bg-gray-700', 'dark:text-white', 'dark:hover:bg-gray-600');
        } else if (element.matches('.card, .staff-card, .news-card, .gallery-item')) {
          element.classList.add('dark:bg-gray-800', 'dark:text-white', 'dark:border-gray-700');
        }
        
        // Apply to child elements
        const childInputs = element.querySelectorAll('input, textarea, select');
        childInputs.forEach(input => {
          input.classList.add('dark:bg-gray-700', 'dark:text-white', 'dark:border-gray-600');
        });
        
        const childButtons = element.querySelectorAll('button:not(#darkModeToggle):not(#mobileDarkModeToggle)');
        childButtons.forEach(button => {
          button.classList.add('dark:bg-gray-700', 'dark:text-white', 'dark:hover:bg-gray-600');
        });
      }
    } catch (error) {
      this.handleError('Failed to apply theme to new element', error);
    }
  }

  /**
   * Dispatch theme-related events
   */
  dispatchThemeEvent(eventName, detail) {
    try {
      const event = new CustomEvent(eventName, {
        detail: detail,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(event);
    } catch (error) {
      this.handleError('Failed to dispatch theme event', error);
    }
  }

  /**
   * Handle errors with retry logic
   */
  handleError(message, error) {
    this.errorCount++;
    console.error(`Theme Manager Error: ${message}`, error);
    
    // Attempt recovery for critical errors
    if (this.errorCount <= this.maxRetries) {
      console.log(`Attempting recovery (${this.errorCount}/${this.maxRetries})...`);
      
      setTimeout(() => {
        try {
          if (!this.isInitialized) {
            this.setup();
          } else {
            this.applyTheme(this.currentTheme, false);
            this.updateToggleButtons();
          }
        } catch (recoveryError) {
          console.error('Recovery failed:', recoveryError);
        }
      }, 1000 * this.errorCount);
    } else {
      console.error('Max retries exceeded. Theme manager may not function properly.');
    }
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Check if theme manager is initialized
   */
  isReady() {
    return this.isInitialized;
  }

  /**
   * Force refresh theme
   */
  refresh() {
    try {
      this.applyTheme(this.currentTheme, false);
      this.updateToggleButtons();
      this.applyThemeToAllSections();
    } catch (error) {
      this.handleError('Failed to refresh theme', error);
    }
  }

  /**
   * Clean up observers and event listeners
   */
  destroy() {
    try {
      this.observers.forEach(observer => {
        observer.disconnect();
      });
      this.observers = [];
      this.isInitialized = false;
    } catch (error) {
      console.error('Failed to destroy theme manager:', error);
    }
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Make it globally available
window.themeManager = themeManager;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}

// Listen for theme events from other scripts
document.addEventListener('themeChanged', (event) => {
  console.log('Theme changed:', event.detail);
});

// Provide backward compatibility
window.toggleDarkMode = () => {
  themeManager.toggleTheme();
};

window.setDarkMode = (enabled) => {
  themeManager.setTheme(enabled ? 'dark' : 'light');
};