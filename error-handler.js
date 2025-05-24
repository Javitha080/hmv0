/**
 * Global Error Handler and Recovery System
 * Catches and handles runtime errors, provides fallbacks
 */

class ErrorHandler {
  constructor() {
    this.errors = [];
    this.maxErrors = 50;
    this.init();
  }

  /**
   * Initialize error handling
   */
  init() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: new Date().toISOString()
      });
    });

    // Promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled promise rejection',
        reason: event.reason,
        timestamp: new Date().toISOString()
      });
    });

    // Resource loading error handler
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.handleResourceError(event);
      }
    }, true);

    console.log('Error handler initialized');
  }

  /**
   * Handle JavaScript errors
   */
  handleError(errorInfo) {
    this.logError(errorInfo);
    this.attemptRecovery(errorInfo);
  }

  /**
   * Handle resource loading errors
   */
  handleResourceError(event) {
    const target = event.target;
    const errorInfo = {
      type: 'resource',
      element: target.tagName,
      source: target.src || target.href,
      timestamp: new Date().toISOString()
    };

    this.logError(errorInfo);

    // Attempt to recover based on resource type
    if (target.tagName === 'IMG') {
      this.recoverImage(target);
    } else if (target.tagName === 'SCRIPT') {
      this.recoverScript(target);
    } else if (target.tagName === 'LINK') {
      this.recoverStylesheet(target);
    }
  }

  /**
   * Log error information
   */
  logError(errorInfo) {
    this.errors.push(errorInfo);
    
    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.error('Error caught:', errorInfo);
    }
  }

  /**
   * Attempt error recovery
   */
  attemptRecovery(errorInfo) {
    switch (errorInfo.type) {
      case 'javascript':
        this.recoverJavaScriptError(errorInfo);
        break;
      case 'promise':
        this.recoverPromiseError(errorInfo);
        break;
    }
  }

  /**
   * Recover from JavaScript errors
   */
  recoverJavaScriptError(errorInfo) {
    // Common recovery strategies
    if (errorInfo.message.includes('GSAP') || errorInfo.message.includes('gsap')) {
      this.recoverGSAPError();
    } else if (errorInfo.message.includes('undefined') && errorInfo.message.includes('function')) {
      this.recoverUndefinedFunction(errorInfo);
    } else if (errorInfo.message.includes('Cannot read property')) {
      this.recoverPropertyError(errorInfo);
    }
  }

  /**
   * Recover from promise errors
   */
  recoverPromiseError(errorInfo) {
    console.warn('Promise rejection handled:', errorInfo.message);
    // Add specific recovery logic for promise rejections
  }

  /**
   * Recover failed images
   */
  recoverImage(img) {
    // Create placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 rounded';
    placeholder.style.width = img.style.width || getComputedStyle(img).width || '100%';
    placeholder.style.height = img.style.height || getComputedStyle(img).height || '200px';
    placeholder.innerHTML = '<i class="fas fa-image text-2xl opacity-50"></i>';
    placeholder.title = 'Image failed to load';
    
    // Replace the broken image
    if (img.parentNode) {
      img.parentNode.replaceChild(placeholder, img);
    }
  }

  /**
   * Recover failed scripts
   */
  recoverScript(script) {
    const src = script.src;
    console.warn(`Script failed to load: ${src}`);
    
    // Try to load from CDN alternatives or provide fallbacks
    if (src.includes('gsap')) {
      this.loadGSAPFallback();
    } else if (src.includes('three')) {
      this.loadThreeFallback();
    }
  }

  /**
   * Recover failed stylesheets
   */
  recoverStylesheet(link) {
    console.warn(`Stylesheet failed to load: ${link.href}`);
    
    // Create basic fallback styles
    const fallbackStyles = document.createElement('style');
    fallbackStyles.textContent = `
      .fallback-styles {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .fallback-styles * {
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(fallbackStyles);
    document.body.classList.add('fallback-styles');
  }

  /**
   * Recover GSAP errors
   */
  recoverGSAPError() {
    if (typeof gsap === 'undefined') {
      this.loadGSAPFallback();
    }
  }

  /**
   * Load GSAP fallback
   */
  loadGSAPFallback() {
    // Create minimal GSAP-like object for basic functionality
    if (typeof gsap === 'undefined') {
      window.gsap = {
        to: (target, vars) => {
          // Simple CSS transition fallback
          const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
          elements.forEach(el => {
            if (el && el.style) {
              Object.keys(vars).forEach(prop => {
                if (prop !== 'duration' && prop !== 'ease') {
                  el.style[prop] = vars[prop];
                }
              });
            }
          });
        },
        from: (target, vars) => this.to(target, vars),
        set: (target, vars) => this.to(target, vars),
        timeline: () => ({
          to: this.to,
          from: this.from,
          set: this.set
        })
      };
      
      // ScrollTrigger fallback
      window.ScrollTrigger = {
        create: () => {},
        refresh: () => {},
        update: () => {}
      };
      
      console.log('GSAP fallback loaded');
    }
  }

  /**
   * Load Three.js fallback
   */
  loadThreeFallback() {
    if (typeof THREE === 'undefined') {
      window.THREE = {
        Scene: function() { return {}; },
        PerspectiveCamera: function() { return {}; },
        WebGLRenderer: function() { 
          return {
            setSize: () => {},
            render: () => {},
            domElement: document.createElement('canvas')
          };
        }
      };
      console.log('Three.js fallback loaded');
    }
  }

  /**
   * Recover undefined function errors
   */
  recoverUndefinedFunction(errorInfo) {
    // Extract function name from error message
    const match = errorInfo.message.match(/([a-zA-Z_$][a-zA-Z0-9_$]*) is not a function/);
    if (match) {
      const functionName = match[1];
      
      // Create a no-op function as fallback
      if (typeof window[functionName] === 'undefined') {
        window[functionName] = function() {
          console.warn(`Fallback function called: ${functionName}`);
        };
      }
    }
  }

  /**
   * Recover property access errors
   */
  recoverPropertyError(errorInfo) {
    // Log the error for debugging
    console.warn('Property access error recovered:', errorInfo.message);
  }

  /**
   * Get error statistics
   */
  getErrorStats() {
    const stats = {
      total: this.errors.length,
      byType: {},
      recent: this.errors.slice(-10)
    };
    
    this.errors.forEach(error => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1;
    });
    
    return stats;
  }

  /**
   * Clear error log
   */
  clearErrors() {
    this.errors = [];
  }

  /**
   * Check if critical errors exist
   */
  hasCriticalErrors() {
    return this.errors.some(error => 
      error.type === 'javascript' && 
      (error.message.includes('ReferenceError') || error.message.includes('TypeError'))
    );
  }

  /**
   * Perform health check
   */
  healthCheck() {
    const issues = [];
    
    // Check for missing essential elements
    if (!document.getElementById('mainContent')) {
      issues.push('Missing main content container');
    }
    
    // Check for broken navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) {
        issues.push(`Broken navigation link: ${link.getAttribute('href')}`);
      }
    });
    
    // Check for missing scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      if (script.src && !script.src.startsWith('http') && !script.src.startsWith('//')) {
        // Local script - check if it loaded
        const filename = script.src.split('/').pop();
        if (filename && !this.isScriptLoaded(filename)) {
          issues.push(`Script may not have loaded: ${filename}`);
        }
      }
    });
    
    return {
      healthy: issues.length === 0,
      issues: issues,
      errorCount: this.errors.length,
      criticalErrors: this.hasCriticalErrors()
    };
  }

  /**
   * Check if a script has loaded successfully
   */
  isScriptLoaded(filename) {
    // This is a simple heuristic - in a real implementation,
    // you might track script loading more precisely
    return !this.errors.some(error => 
      error.type === 'resource' && 
      error.source && 
      error.source.includes(filename)
    );
  }
}

// Initialize error handler
const errorHandler = new ErrorHandler();

// Make it globally available
window.errorHandler = errorHandler;

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ErrorHandler;
}

// Perform initial health check after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    const health = errorHandler.healthCheck();
    if (!health.healthy) {
      console.warn('Website health check found issues:', health.issues);
    } else {
      console.log('Website health check passed');
    }
  }, 2000);
});