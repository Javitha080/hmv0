/**
 * Comprehensive Dark/Light Mode Manager
 * Handles theme switching, persistence, and dynamic content updates
 */

class DarkModeManager {
    constructor() {
        this.currentTheme = 'light';
        this.toggleButtons = [];
        this.observers = [];
        this.errorCount = 0;
        this.maxErrors = 5;
        this.transitionDuration = 300;
        this.isTransitioning = false;
        
        // Theme configuration
        this.themes = {
            light: {
                name: 'Light Mode',
                icon: '🌙',
                class: ''
            },
            dark: {
                name: 'Dark Mode', 
                icon: '☀️',
                class: 'dark'
            }
        };
        
        // Initialize the manager
        this.init();
    }

    /**
     * Initialize the dark mode manager
     */
    init() {
        try {
            this.loadSavedTheme();
            this.setupToggleButtons();
            this.setupSystemPreferenceDetection();
            this.setupMutationObserver();
            this.applyTheme(this.currentTheme);
            this.setupKeyboardShortcuts();
            this.setupTransitionHandling();
            
            console.log('Dark Mode Manager initialized successfully');
        } catch (error) {
            this.handleError('Failed to initialize Dark Mode Manager', error);
        }
    }

    /**
     * Load saved theme preference from localStorage
     */
    loadSavedTheme() {
        try {
            const savedTheme = localStorage.getItem('theme-preference');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme && this.themes[savedTheme]) {
                this.currentTheme = savedTheme;
            } else if (systemPrefersDark) {
                this.currentTheme = 'dark';
            } else {
                this.currentTheme = 'light';
            }
            
            console.log(`Loaded theme: ${this.currentTheme}`);
        } catch (error) {
            this.handleError('Failed to load saved theme', error);
            this.currentTheme = 'light'; // Fallback
        }
    }

    /**
     * Setup toggle buttons for theme switching
     */
    setupToggleButtons() {
        try {
            // Find existing toggle buttons
            const selectors = [
                '.theme-toggle',
                '.dark-mode-toggle', 
                '#theme-toggle',
                '#dark-mode-toggle',
                '[data-theme-toggle]'
            ];
            
            selectors.forEach(selector => {
                const buttons = document.querySelectorAll(selector);
                buttons.forEach(button => {
                    if (!this.toggleButtons.includes(button)) {
                        this.toggleButtons.push(button);
                        this.setupToggleButton(button);
                    }
                });
            });
            
            // Create toggle button if none exist
            if (this.toggleButtons.length === 0) {
                this.createToggleButton();
            }
            
            console.log(`Setup ${this.toggleButtons.length} toggle buttons`);
        } catch (error) {
            this.handleError('Failed to setup toggle buttons', error);
        }
    }

    /**
     * Setup individual toggle button
     */
    setupToggleButton(button) {
        try {
            // Remove existing listeners to prevent duplicates
            button.removeEventListener('click', this.handleToggleClick);
            
            // Add click listener
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
            
            // Update button appearance
            this.updateToggleButton(button);
            
            // Add accessibility attributes
            button.setAttribute('role', 'button');
            button.setAttribute('aria-label', `Switch to ${this.currentTheme === 'dark' ? 'light' : 'dark'} mode`);
            button.setAttribute('title', `Switch to ${this.currentTheme === 'dark' ? 'light' : 'dark'} mode`);
            
        } catch (error) {
            this.handleError('Failed to setup toggle button', error);
        }
    }

    /**
     * Create a new toggle button if none exist
     */
    createToggleButton() {
        try {
            const button = document.createElement('button');
            button.className = 'theme-toggle-created';
            button.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                background: var(--bg-primary);
                border: 2px solid var(--border-color);
                border-radius: 50%;
                width: 50px;
                height: 50px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                transition: all var(--transition-fast) ease;
                box-shadow: var(--shadow-medium);
            `;
            
            // Add hover effects
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
                button.style.boxShadow = 'var(--shadow-hard)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = 'var(--shadow-medium)';
            });
            
            document.body.appendChild(button);
            this.toggleButtons.push(button);
            this.setupToggleButton(button);
            
            console.log('Created floating toggle button');
        } catch (error) {
            this.handleError('Failed to create toggle button', error);
        }
    }

    /**
     * Update toggle button appearance
     */
    updateToggleButton(button) {
        try {
            const theme = this.themes[this.currentTheme];
            const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            
            // Update button content
            if (button.querySelector('.theme-icon')) {
                button.querySelector('.theme-icon').textContent = theme.icon;
            } else {
                button.innerHTML = `<span class="theme-icon">${theme.icon}</span>`;
            }
            
            // Update accessibility
            button.setAttribute('aria-label', `Switch to ${this.themes[nextTheme].name}`);
            button.setAttribute('title', `Switch to ${this.themes[nextTheme].name}`);
            
        } catch (error) {
            this.handleError('Failed to update toggle button', error);
        }
    }

    /**
     * Toggle between themes
     */
    toggleTheme() {
        try {
            if (this.isTransitioning) {
                console.log('Theme transition in progress, ignoring toggle');
                return;
            }
            
            const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.applyTheme(newTheme);
            
        } catch (error) {
            this.handleError('Failed to toggle theme', error);
        }
    }

    /**
     * Apply theme to the entire document
     */
    applyTheme(theme, animate = true) {
        try {
            if (!this.themes[theme]) {
                throw new Error(`Invalid theme: ${theme}`);
            }
            
            this.isTransitioning = true;
            this.currentTheme = theme;
            
            // Add transition class if animating
            if (animate) {
                document.documentElement.style.transition = 'all 0.3s ease';
            }
            
            // Apply theme class to document
            document.documentElement.className = this.themes[theme].class;
            document.body.className = document.body.className.replace(/\b(light|dark)\b/g, '').trim();
            if (this.themes[theme].class) {
                document.body.classList.add(this.themes[theme].class);
            }
            
            // Update meta theme-color
            this.updateMetaThemeColor(theme);
            
            // Update all toggle buttons
            this.toggleButtons.forEach(button => {
                this.updateToggleButton(button);
            });
            
            // Save preference
            this.saveThemePreference(theme);
            
            // Apply theme to specific sections
            this.applyThemeToSections(theme);
            
            // Handle special elements
            this.handleSpecialElements(theme);
            
            // Dispatch custom event
            this.dispatchThemeChangeEvent(theme);
            
            // Remove transition after animation
            if (animate) {
                setTimeout(() => {
                    document.documentElement.style.transition = '';
                    this.isTransitioning = false;
                }, this.transitionDuration);
            } else {
                this.isTransitioning = false;
            }
            
            console.log(`Applied ${theme} theme`);
            
        } catch (error) {
            this.handleError('Failed to apply theme', error);
            this.isTransitioning = false;
        }
    }

    /**
     * Apply theme to specific sections
     */
    applyThemeToSections(theme) {
        try {
            const sections = [
                'header', 'nav', 'main', 'footer',
                '.hero', '.about', '.features', '.staff', 
                '.gallery', '.news', '.contact',
                '.card', '.modal', '.dropdown'
            ];
            
            sections.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    element.classList.remove('light', 'dark');
                    if (this.themes[theme].class) {
                        element.classList.add(this.themes[theme].class);
                    }
                });
            });
            
        } catch (error) {
            this.handleError('Failed to apply theme to sections', error);
        }
    }

    /**
     * Handle special elements that need custom theme handling
     */
    handleSpecialElements(theme) {
        try {
            // Handle images
            const images = document.querySelectorAll('img:not(.no-theme)');
            images.forEach(img => {
                if (theme === 'dark') {
                    img.style.filter = 'brightness(0.9) contrast(1.1)';
                } else {
                    img.style.filter = '';
                }
            });
            
            // Handle logos
            const logos = document.querySelectorAll('.logo, [class*="logo"]');
            logos.forEach(logo => {
                if (theme === 'dark') {
                    logo.style.filter = 'invert(1) brightness(1.2)';
                } else {
                    logo.style.filter = '';
                }
            });
            
            // Handle code blocks
            const codeBlocks = document.querySelectorAll('pre, code');
            codeBlocks.forEach(block => {
                block.classList.remove('light', 'dark');
                if (this.themes[theme].class) {
                    block.classList.add(this.themes[theme].class);
                }
            });
            
        } catch (error) {
            this.handleError('Failed to handle special elements', error);
        }
    }

    /**
     * Update meta theme-color for mobile browsers
     */
    updateMetaThemeColor(theme) {
        try {
            let metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (!metaThemeColor) {
                metaThemeColor = document.createElement('meta');
                metaThemeColor.name = 'theme-color';
                document.head.appendChild(metaThemeColor);
            }
            
            const colors = {
                light: '#ffffff',
                dark: '#0a0a0a'
            };
            
            metaThemeColor.content = colors[theme] || colors.light;
            
        } catch (error) {
            this.handleError('Failed to update meta theme color', error);
        }
    }

    /**
     * Save theme preference to localStorage
     */
    saveThemePreference(theme) {
        try {
            localStorage.setItem('theme-preference', theme);
            console.log(`Saved theme preference: ${theme}`);
        } catch (error) {
            this.handleError('Failed to save theme preference', error);
        }
    }

    /**
     * Setup system preference detection
     */
    setupSystemPreferenceDetection() {
        try {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            const handleSystemThemeChange = (e) => {
                // Only apply system preference if no user preference is saved
                const savedTheme = localStorage.getItem('theme-preference');
                if (!savedTheme) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme(newTheme);
                }
            };
            
            mediaQuery.addEventListener('change', handleSystemThemeChange);
            
            console.log('System preference detection setup');
        } catch (error) {
            this.handleError('Failed to setup system preference detection', error);
        }
    }

    /**
     * Setup mutation observer for dynamic content
     */
    setupMutationObserver() {
        try {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                this.applyThemeToElement(node, this.currentTheme);
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
            console.log('Mutation observer setup for dynamic content');
            
        } catch (error) {
            this.handleError('Failed to setup mutation observer', error);
        }
    }

    /**
     * Apply theme to a specific element
     */
    applyThemeToElement(element, theme) {
        try {
            if (element.classList) {
                element.classList.remove('light', 'dark');
                if (this.themes[theme].class) {
                    element.classList.add(this.themes[theme].class);
                }
            }
            
            // Apply to child elements
            const children = element.querySelectorAll('*');
            children.forEach(child => {
                if (child.classList) {
                    child.classList.remove('light', 'dark');
                    if (this.themes[theme].class) {
                        child.classList.add(this.themes[theme].class);
                    }
                }
            });
            
        } catch (error) {
            this.handleError('Failed to apply theme to element', error);
        }
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        try {
            document.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + Shift + D to toggle theme
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
            
            console.log('Keyboard shortcuts setup (Ctrl/Cmd + Shift + D)');
        } catch (error) {
            this.handleError('Failed to setup keyboard shortcuts', error);
        }
    }

    /**
     * Setup transition handling
     */
    setupTransitionHandling() {
        try {
            // Prevent transitions during page load
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    document.body.classList.add('transitions-enabled');
                }, 100);
            });
            
        } catch (error) {
            this.handleError('Failed to setup transition handling', error);
        }
    }

    /**
     * Dispatch custom theme change event
     */
    dispatchThemeChangeEvent(theme) {
        try {
            const event = new CustomEvent('themechange', {
                detail: {
                    theme: theme,
                    previousTheme: this.currentTheme === 'dark' ? 'light' : 'dark'
                }
            });
            
            document.dispatchEvent(event);
            window.dispatchEvent(event);
            
        } catch (error) {
            this.handleError('Failed to dispatch theme change event', error);
        }
    }

    /**
     * Get current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Set theme programmatically
     */
    setTheme(theme) {
        if (this.themes[theme]) {
            this.applyTheme(theme);
        } else {
            this.handleError(`Invalid theme: ${theme}`);
        }
    }

    /**
     * Handle errors with recovery mechanisms
     */
    handleError(message, error = null) {
        this.errorCount++;
        
        console.error(`Dark Mode Manager Error: ${message}`, error);
        
        // Attempt recovery if under error limit
        if (this.errorCount < this.maxErrors) {
            console.log('Attempting error recovery...');
            
            setTimeout(() => {
                try {
                    // Reset to light mode as fallback
                    this.currentTheme = 'light';
                    document.documentElement.className = '';
                    document.body.classList.remove('dark');
                    
                    // Try to reinitialize
                    this.setupToggleButtons();
                    
                } catch (recoveryError) {
                    console.error('Recovery failed:', recoveryError);
                }
            }, 1000);
        } else {
            console.error('Max errors reached. Dark mode manager disabled.');
        }
    }

    /**
     * Cleanup method
     */
    destroy() {
        try {
            // Remove event listeners
            this.toggleButtons.forEach(button => {
                button.removeEventListener('click', this.handleToggleClick);
            });
            
            // Disconnect observers
            this.observers.forEach(observer => {
                observer.disconnect();
            });
            
            // Clear arrays
            this.toggleButtons = [];
            this.observers = [];
            
            console.log('Dark Mode Manager destroyed');
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }
}

// Initialize Dark Mode Manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.darkModeManager = new DarkModeManager();
    });
} else {
    window.darkModeManager = new DarkModeManager();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeManager;
}