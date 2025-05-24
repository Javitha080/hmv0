/**
 * Mobile Menu Conflict Disabler
 * This script runs FIRST to prevent all conflicting mobile menu implementations
 * from initializing and interfering with the professional mobile menu manager.
 */

(function() {
    'use strict';
    
    console.log('Mobile Menu Conflict Disabler: Initializing...');
    
    // Flag to indicate our mobile menu manager is taking control
    window.MOBILE_MENU_MANAGER_ACTIVE = true;
    
    // Store original functions before they get overridden
    const originalAddEventListener = Element.prototype.addEventListener;
    const originalQuerySelector = Document.prototype.querySelector;
    const originalGetElementById = Document.prototype.getElementById;
    
    // List of conflicting scripts and their patterns
    const conflictingPatterns = [
        'mobileMenuButton',
        'mobileMenu',
        'mobile-menu',
        'toggleMobileMenu',
        'openMobileMenu',
        'closeMobileMenu',
        'initMobileMenu',
        'mobileMenuOpen',
        'isMobileMenuOpen'
    ];
    
    // Intercept and block conflicting event listeners
    Element.prototype.addEventListener = function(type, listener, options) {
        // Check if this is a mobile menu related event listener
        if (type === 'click' && this.id === 'mobileMenuButton') {
            // Only allow our mobile menu manager to add listeners
            const stack = new Error().stack;
            if (!stack.includes('mobile-menu-manager.js')) {
                console.warn('Mobile Menu Conflict Disabler: Blocked conflicting click listener on mobileMenuButton');
                return;
            }
        }
        
        // Allow the event listener if it's not conflicting
        return originalAddEventListener.call(this, type, listener, options);
    };
    
    // Override global functions that might conflict
    const globalOverrides = {
        openMobileMenu: () => {
            console.warn('Mobile Menu Conflict Disabler: Blocked openMobileMenu call');
            return false;
        },
        closeMobileMenu: () => {
            console.warn('Mobile Menu Conflict Disabler: Blocked closeMobileMenu call');
            return false;
        },
        toggleMobileMenu: () => {
            console.warn('Mobile Menu Conflict Disabler: Blocked toggleMobileMenu call');
            return false;
        },
        initMobileMenu: () => {
            console.warn('Mobile Menu Conflict Disabler: Blocked initMobileMenu call');
            return false;
        },
        mobileMenuOpen: false,
        isMobileMenuOpen: false
    };
    
    // Apply global overrides
    Object.keys(globalOverrides).forEach(key => {
        Object.defineProperty(window, key, {
            value: globalOverrides[key],
            writable: false,
            configurable: false
        });
    });
    
    // Disable conflicting CSS classes and animations
    const disableConflictingStyles = () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        
        if (mobileMenu) {
            // Remove all conflicting classes
            const conflictingClasses = [
                'pointer-events-none', 'opacity-0', 'scale-y-0', 'transform',
                'translate-x-full', 'translate-y-full', 'hidden', 'invisible',
                'fade-in', 'fade-out', 'slide-in', 'slide-out', 'show', 'open'
            ];
            
            conflictingClasses.forEach(className => {
                mobileMenu.classList.remove(className);
            });
            
            // Reset inline styles
            mobileMenu.style.cssText = '';
        }
        
        if (mobileMenuButton) {
            // Ensure button has correct class
            mobileMenuButton.className = 'mobile-menu-btn';
            mobileMenuButton.style.cssText = '';
        }
    };
    
    // Monitor for DOM changes and disable conflicts
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' || mutation.type === 'childList') {
                // Check if mobile menu elements were modified
                const mobileMenu = document.getElementById('mobileMenu');
                const mobileMenuButton = document.getElementById('mobileMenuButton');
                
                if (mobileMenu || mobileMenuButton) {
                    // Small delay to let conflicting scripts run, then override
                    setTimeout(disableConflictingStyles, 10);
                }
            }
        });
    });
    
    // Start observing when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
            disableConflictingStyles();
        });
    } else {
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
        disableConflictingStyles();
    }
    
    // Intercept script loading and disable conflicting mobile menu code
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
        const element = originalCreateElement.call(this, tagName);
        
        if (tagName.toLowerCase() === 'script') {
            const originalSetAttribute = element.setAttribute;
            element.setAttribute = function(name, value) {
                if (name === 'src' && typeof value === 'string') {
                    // Check if this is a conflicting script
                    const conflictingScripts = [
                        'header.js', 'Main Script.js', 'dom-fixer.js', 'script.js'
                    ];
                    
                    const isConflicting = conflictingScripts.some(script => 
                        value.includes(script)
                    );
                    
                    if (isConflicting) {
                        console.warn(`Mobile Menu Conflict Disabler: Monitoring ${value} for conflicts`);
                    }
                }
                return originalSetAttribute.call(this, name, value);
            };
        }
        
        return element;
    };
    
    // Override localStorage to prevent conflicting state storage
    const originalSetItem = localStorage.setItem;
    const originalGetItem = localStorage.getItem;
    
    localStorage.setItem = function(key, value) {
        if (key.includes('mobileMenu') || key.includes('mobile-menu')) {
            console.warn(`Mobile Menu Conflict Disabler: Blocked localStorage.setItem for ${key}`);
            return;
        }
        return originalSetItem.call(this, key, value);
    };
    
    localStorage.getItem = function(key) {
        if (key.includes('mobileMenu') || key.includes('mobile-menu')) {
            console.warn(`Mobile Menu Conflict Disabler: Blocked localStorage.getItem for ${key}`);
            return null;
        }
        return originalGetItem.call(this, key);
    };
    
    // Prevent conflicting GSAP animations
    if (window.gsap) {
        const originalTo = window.gsap.to;
        const originalFrom = window.gsap.from;
        const originalSet = window.gsap.set;
        
        window.gsap.to = function(target, vars) {
            if (typeof target === 'string' && (target.includes('mobileMenu') || target.includes('#mobileMenu'))) {
                console.warn('Mobile Menu Conflict Disabler: Blocked GSAP animation on mobile menu');
                return { kill: () => {} };
            }
            return originalTo.call(this, target, vars);
        };
        
        window.gsap.from = function(target, vars) {
            if (typeof target === 'string' && (target.includes('mobileMenu') || target.includes('#mobileMenu'))) {
                console.warn('Mobile Menu Conflict Disabler: Blocked GSAP animation on mobile menu');
                return { kill: () => {} };
            }
            return originalFrom.call(this, target, vars);
        };
        
        window.gsap.set = function(target, vars) {
            if (typeof target === 'string' && (target.includes('mobileMenu') || target.includes('#mobileMenu'))) {
                console.warn('Mobile Menu Conflict Disabler: Blocked GSAP set on mobile menu');
                return;
            }
            return originalSet.call(this, target, vars);
        };
    }
    
    // Clean up function
    window.cleanupMobileMenuConflicts = () => {
        disableConflictingStyles();
        console.log('Mobile Menu Conflict Disabler: Manual cleanup completed');
    };
    
    console.log('Mobile Menu Conflict Disabler: Initialization complete');
    
})();