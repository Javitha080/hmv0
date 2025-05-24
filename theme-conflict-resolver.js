/**
 * Theme Conflict Resolver
 * Disables conflicting dark mode implementations to prevent conflicts with the new theme manager
 */

(function() {
  'use strict';
  
  console.log('Theme Conflict Resolver: Initializing...');
  
  // Store original functions that might conflict
  const originalFunctions = {};
  
  // List of conflicting function names to disable
  const conflictingFunctions = [
    'toggleDarkMode',
    'setDarkMode',
    'initDarkModeToggle',
    'updateDarkModeButton',
    'updateMobileDarkModeButton',
    'updateDarkModeIcons'
  ];
  
  // Disable conflicting functions
  function disableConflictingFunctions() {
    conflictingFunctions.forEach(funcName => {
      if (typeof window[funcName] === 'function') {
        originalFunctions[funcName] = window[funcName];
        window[funcName] = function() {
          console.warn(`Theme Conflict Resolver: Disabled conflicting function '${funcName}'. Use themeManager instead.`);
          return false;
        };
      }
    });
  }
  
  // Remove conflicting event listeners
  function removeConflictingEventListeners() {
    try {
      // Remove existing dark mode toggle listeners
      const darkModeToggle = document.getElementById('darkModeToggle');
      const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
      
      if (darkModeToggle) {
        // Clone the element to remove all event listeners
        const newDarkModeToggle = darkModeToggle.cloneNode(true);
        darkModeToggle.parentNode.replaceChild(newDarkModeToggle, darkModeToggle);
        console.log('Theme Conflict Resolver: Removed conflicting listeners from desktop toggle');
      }
      
      if (mobileDarkModeToggle) {
        // Clone the element to remove all event listeners
        const newMobileDarkModeToggle = mobileDarkModeToggle.cloneNode(true);
        mobileDarkModeToggle.parentNode.replaceChild(newMobileDarkModeToggle, mobileDarkModeToggle);
        console.log('Theme Conflict Resolver: Removed conflicting listeners from mobile toggle');
      }
    } catch (error) {
      console.error('Theme Conflict Resolver: Error removing event listeners:', error);
    }
  }
  
  // Override localStorage dark mode handling
  function overrideLocalStorageHandling() {
    try {
      // Intercept localStorage.setItem calls for darkMode
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = function(key, value) {
        if (key === 'darkMode' && window.themeManager && window.themeManager.isReady()) {
          // Let theme manager handle this
          console.log('Theme Conflict Resolver: Redirecting localStorage darkMode to theme manager');
          return;
        }
        return originalSetItem.apply(this, arguments);
      };
    } catch (error) {
      console.error('Theme Conflict Resolver: Error overriding localStorage:', error);
    }
  }
  
  // Disable conflicting CSS class manipulations
  function preventConflictingClassManipulation() {
    try {
      // Monitor for conflicting class changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target;
            if (target === document.documentElement) {
              // Check if this was done by theme manager
              if (!window.themeManager || !window.themeManager.isReady()) {
                return;
              }
              
              // If dark class was added/removed by something other than theme manager
              const hasConflictingChange = target.classList.contains('dark') !== 
                (window.themeManager.getCurrentTheme() === 'dark');
              
              if (hasConflictingChange) {
                console.warn('Theme Conflict Resolver: Detected conflicting theme change, correcting...');
                // Restore correct theme
                setTimeout(() => {
                  if (window.themeManager) {
                    window.themeManager.refresh();
                  }
                }, 100);
              }
            }
          }
        });
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    } catch (error) {
      console.error('Theme Conflict Resolver: Error setting up class monitoring:', error);
    }
  }
  
  // Disable conflicting icon updates
  function preventConflictingIconUpdates() {
    try {
      const iconElements = ['darkModeIcon', 'mobileDarkModeIcon'];
      
      iconElements.forEach(iconId => {
        const icon = document.getElementById(iconId);
        if (icon) {
          // Store original className
          const originalClassName = icon.className;
          
          // Override className setter
          Object.defineProperty(icon, 'className', {
            get: function() {
              return this._className || originalClassName;
            },
            set: function(value) {
              // Only allow theme manager to change icon classes
              if (window.themeManager && window.themeManager.isReady()) {
                this._className = value;
                this.setAttribute('class', value);
              } else {
                console.warn(`Theme Conflict Resolver: Prevented conflicting icon update for ${iconId}`);
              }
            }
          });
        }
      });
    } catch (error) {
      console.error('Theme Conflict Resolver: Error preventing icon updates:', error);
    }
  }
  
  // Main initialization function
  function init() {
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(resolve, 100); // Small delay to let other scripts initialize
        });
      } else {
        setTimeout(resolve, 100);
      }
      
      function resolve() {
        disableConflictingFunctions();
        removeConflictingEventListeners();
        overrideLocalStorageHandling();
        preventConflictingClassManipulation();
        preventConflictingIconUpdates();
        
        console.log('Theme Conflict Resolver: Initialization complete');
        
        // Dispatch event to signal completion
        document.dispatchEvent(new CustomEvent('themeConflictResolverReady'));
      }
    } catch (error) {
      console.error('Theme Conflict Resolver: Initialization failed:', error);
    }
  }
  
  // Restore original functions if needed
  function restore() {
    Object.keys(originalFunctions).forEach(funcName => {
      window[funcName] = originalFunctions[funcName];
    });
    console.log('Theme Conflict Resolver: Original functions restored');
  }
  
  // Make restore function available globally
  window.restoreOriginalThemeFunctions = restore;
  
  // Initialize
  init();
  
})();