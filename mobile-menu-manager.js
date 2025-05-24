/**
 * Mobile Menu Manager
 * Unified mobile menu functionality with conflict resolution
 * Handles all mobile menu interactions professionally
 */

class MobileMenuManager {
    constructor() {
        this.mobileMenuButton = null;
        this.mobileMenu = null;
        this.menuIcon = null;
        this.isOpen = false;
        this.isAnimating = false;
        this.touchStartY = 0;
        this.touchEndY = 0;
        
        // Configuration
        this.config = {
            animationDuration: 300,
            swipeThreshold: 50,
            enableSwipeGestures: true,
            enableKeyboardNavigation: true,
            enableFocusTrap: true
        };
        
        this.init();
    }
    
    /**
     * Initialize the mobile menu manager
     */
    init() {
        try {
            this.findElements();
            this.setupEventListeners();
            this.setupAccessibility();
            this.resolveConflicts();
            
            console.log('Mobile Menu Manager: Initialized successfully');
        } catch (error) {
            console.error('Mobile Menu Manager: Initialization failed', error);
        }
    }
    
    /**
     * Find and validate required DOM elements
     */
    findElements() {
        this.mobileMenuButton = document.getElementById('mobileMenuButton');
        this.mobileMenu = document.getElementById('mobileMenu');
        
        if (!this.mobileMenuButton) {
            throw new Error('Mobile menu button not found');
        }
        
        if (!this.mobileMenu) {
            throw new Error('Mobile menu not found');
        }
        
        this.menuIcon = this.mobileMenuButton.querySelector('i');
        
        console.log('Mobile Menu Manager: Elements found successfully');
    }
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Button click event
        this.mobileMenuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.mobileMenu.contains(e.target) && 
                !this.mobileMenuButton.contains(e.target)) {
                this.close();
            }
        });
        
        // Keyboard navigation
        if (this.config.enableKeyboardNavigation) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                    this.mobileMenuButton.focus();
                }
            });
        }
        
        // Touch gestures for mobile
        if (this.config.enableSwipeGestures) {
            this.setupTouchGestures();
        }
        
        // Menu link clicks
        const menuLinks = this.mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });
        
        // Window resize handler
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });
    }
    
    /**
     * Setup touch gestures for swipe to close
     */
    setupTouchGestures() {
        this.mobileMenu.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        this.mobileMenu.addEventListener('touchend', (e) => {
            this.touchEndY = e.changedTouches[0].clientY;
            this.handleSwipeGesture();
        }, { passive: true });
    }
    
    /**
     * Handle swipe gestures
     */
    handleSwipeGesture() {
        const swipeDistance = this.touchStartY - this.touchEndY;
        
        // Swipe up to close
        if (swipeDistance > this.config.swipeThreshold) {
            this.close();
        }
    }
    
    /**
     * Setup accessibility attributes
     */
    setupAccessibility() {
        // Button attributes
        this.mobileMenuButton.setAttribute('aria-expanded', 'false');
        this.mobileMenuButton.setAttribute('aria-controls', 'mobileMenu');
        this.mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Menu attributes
        this.mobileMenu.setAttribute('role', 'navigation');
        this.mobileMenu.setAttribute('aria-label', 'Mobile navigation menu');
        this.mobileMenu.setAttribute('aria-hidden', 'true');
        
        // Add tabindex to menu links for proper focus management
        const menuLinks = this.mobileMenu.querySelectorAll('a');
        menuLinks.forEach((link, index) => {
            link.setAttribute('tabindex', this.isOpen ? '0' : '-1');
        });
    }
    
    /**
     * Resolve conflicts with other mobile menu implementations
     */
    resolveConflicts() {
        console.log('Mobile Menu Manager: Resolving conflicts...');
        
        // Store original elements
        const originalButton = this.mobileMenuButton;
        const originalMenu = this.mobileMenu;
        
        // Remove ALL existing event listeners by cloning elements
        const newButton = this.mobileMenuButton.cloneNode(true);
        const newMenu = this.mobileMenu.cloneNode(true);
        
        // Replace elements
        this.mobileMenuButton.parentNode.replaceChild(newButton, this.mobileMenuButton);
        this.mobileMenu.parentNode.replaceChild(newMenu, this.mobileMenu);
        
        // Update references
        this.mobileMenuButton = newButton;
        this.mobileMenu = newMenu;
        this.menuIcon = this.mobileMenuButton.querySelector('i');
        
        // Override ALL conflicting global functions and variables
        const conflictingItems = [
            'openMobileMenu', 'closeMobileMenu', 'toggleMobileMenu', 'initMobileMenu',
            'mobileMenuOpen', 'isMobileMenuOpen', 'mobileMenuToggle',
            'showMobileMenu', 'hideMobileMenu', 'mobileMenuHandler'
        ];
        
        conflictingItems.forEach(item => {
            if (window[item]) {
                const originalValue = window[item];
                window[item] = () => {
                    console.warn(`Mobile Menu Manager: Blocked conflicting ${typeof originalValue} '${item}'`);
                    return false;
                };
            }
        });
        
        // Disable conflicting scripts by overriding their initialization
        const scriptOverrides = {
            'header.js': () => { console.warn('Mobile Menu Manager: Disabled header.js mobile menu'); },
            'Main Script.js': () => { console.warn('Mobile Menu Manager: Disabled Main Script.js mobile menu'); },
            'dom-fixer.js': () => { console.warn('Mobile Menu Manager: Disabled dom-fixer.js mobile menu'); },
            'script.js': () => { console.warn('Mobile Menu Manager: Disabled script.js mobile menu'); }
        };
        
        Object.keys(scriptOverrides).forEach(script => {
            window[`disable_${script.replace(/[^a-zA-Z0-9]/g, '_')}`] = scriptOverrides[script];
        });
        
        // Clean up ALL conflicting classes and styles
        this.mobileMenu.classList.remove(
            'pointer-events-none', 'opacity-0', 'scale-y-0', 'transform',
            'translate-x-full', 'translate-y-full', 'hidden', 'invisible',
            'fade-in', 'fade-out', 'slide-in', 'slide-out'
        );
        
        // Reset ALL inline styles that might conflict
        const styleProps = [
            'transform', 'opacity', 'visibility', 'display', 'transition',
            'translateX', 'translateY', 'scale', 'rotate'
        ];
        
        styleProps.forEach(prop => {
            this.mobileMenu.style[prop] = '';
            this.mobileMenuButton.style[prop] = '';
        });
        
        // Force remove any conflicting CSS classes from button
        this.mobileMenuButton.className = 'mobile-menu-btn';
        
        // Ensure menu starts in closed state
        this.mobileMenu.classList.remove('active', 'open', 'show', 'visible');
        this.isOpen = false;
        
        console.log('Mobile Menu Manager: Conflicts resolved successfully');
        this.mobileMenu.style.visibility = '';
        
        console.log('Mobile Menu Manager: Conflicts resolved');
    }
    
    /**
     * Toggle menu open/close
     */
    toggle() {
        if (this.isAnimating) {
            return;
        }
        
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    /**
     * Open the mobile menu
     */
    open() {
        if (this.isOpen || this.isAnimating) {
            return;
        }
        
        this.isAnimating = true;
        this.isOpen = true;
        
        // Update accessibility attributes
        this.mobileMenuButton.setAttribute('aria-expanded', 'true');
        this.mobileMenu.setAttribute('aria-hidden', 'false');
        
        // Update icon
        this.updateIcon(true);
        
        // Show menu with animation
        this.mobileMenu.classList.add('active');
        
        // Enable focus trap
        if (this.config.enableFocusTrap) {
            this.enableFocusTrap();
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animation complete
        setTimeout(() => {
            this.isAnimating = false;
        }, this.config.animationDuration);
        
        // Dispatch custom event
        this.dispatchEvent('mobileMenuOpened');
        
        console.log('Mobile Menu Manager: Menu opened');
    }
    
    /**
     * Close the mobile menu
     */
    close() {
        if (!this.isOpen || this.isAnimating) {
            return;
        }
        
        this.isAnimating = true;
        this.isOpen = false;
        
        // Update accessibility attributes
        this.mobileMenuButton.setAttribute('aria-expanded', 'false');
        this.mobileMenu.setAttribute('aria-hidden', 'true');
        
        // Update icon
        this.updateIcon(false);
        
        // Hide menu with animation
        this.mobileMenu.classList.remove('active');
        
        // Disable focus trap
        if (this.config.enableFocusTrap) {
            this.disableFocusTrap();
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Animation complete
        setTimeout(() => {
            this.isAnimating = false;
        }, this.config.animationDuration);
        
        // Dispatch custom event
        this.dispatchEvent('mobileMenuClosed');
        
        console.log('Mobile Menu Manager: Menu closed');
    }
    
    /**
     * Update menu icon
     */
    updateIcon(isOpen) {
        if (!this.menuIcon) return;
        
        if (isOpen) {
            // Change to close icon
            this.menuIcon.classList.remove('ri-menu-line');
            this.menuIcon.classList.add('ri-close-line');
        } else {
            // Change to menu icon
            this.menuIcon.classList.remove('ri-close-line');
            this.menuIcon.classList.add('ri-menu-line');
        }
    }
    
    /**
     * Enable focus trap within menu
     */
    enableFocusTrap() {
        const focusableElements = this.mobileMenu.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.setAttribute('tabindex', '0');
        });
        
        // Focus first element
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
    
    /**
     * Disable focus trap
     */
    disableFocusTrap() {
        const focusableElements = this.mobileMenu.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]'
        );
        
        focusableElements.forEach(element => {
            element.setAttribute('tabindex', '-1');
        });
    }
    
    /**
     * Dispatch custom events
     */
    dispatchEvent(eventName) {
        const event = new CustomEvent(eventName, {
            detail: {
                isOpen: this.isOpen,
                menu: this.mobileMenu,
                button: this.mobileMenuButton
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }
    
    /**
     * Get current menu state
     */
    getState() {
        return {
            isOpen: this.isOpen,
            isAnimating: this.isAnimating,
            hasElements: !!(this.mobileMenuButton && this.mobileMenu)
        };
    }
    
    /**
     * Destroy the mobile menu manager
     */
    destroy() {
        try {
            // Close menu if open
            if (this.isOpen) {
                this.close();
            }
            
            // Remove event listeners
            // Note: Since we cloned the button, old listeners are already removed
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Clean up references
            this.mobileMenuButton = null;
            this.mobileMenu = null;
            this.menuIcon = null;
            
            console.log('Mobile Menu Manager: Destroyed successfully');
        } catch (error) {
            console.error('Mobile Menu Manager: Error during destruction', error);
        }
    }
}

// Initialize Mobile Menu Manager when DOM is ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.mobileMenuManager = new MobileMenuManager();
        });
    } else {
        window.mobileMenuManager = new MobileMenuManager();
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileMenuManager;
}