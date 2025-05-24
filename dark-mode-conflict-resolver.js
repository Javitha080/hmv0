/**
 * Dark Mode Conflict Resolver
 * Disables all existing dark mode implementations to prevent conflicts
 * with the new comprehensive dark mode manager
 */

class DarkModeConflictResolver {
    constructor() {
        this.conflictingScripts = [
            'header.js',
            'Main Script.js',
            'Gallery Section.js',
            'dom-fixer.js',
            'theme-manager.js',
            'theme-conflict-resolver.js'
        ];
        
        this.conflictingFunctions = [
            'toggleDarkMode',
            'setDarkMode',
            'initDarkModeToggle',
            'updateDarkModeButton',
            'updateMobileDarkModeButton',
            'updateDarkModeIcons',
            'fixDarkModeToggle'
        ];
        
        this.init();
    }
    
    init() {
        try {
            console.log('Dark Mode Conflict Resolver: Starting cleanup...');
            
            // Remove existing event listeners
            this.removeExistingListeners();
            
            // Override conflicting functions
            this.overrideConflictingFunctions();
            
            // Clean localStorage conflicts
            this.cleanLocalStorageConflicts();
            
            // Disable conflicting CSS classes
            this.disableConflictingStyles();
            
            console.log('Dark Mode Conflict Resolver: Cleanup completed successfully');
        } catch (error) {
            console.error('Dark Mode Conflict Resolver: Error during cleanup', error);
        }
    }
    
    removeExistingListeners() {
        try {
            // Remove listeners from dark mode toggle buttons
            const toggleButtons = [
                document.getElementById('darkModeToggle'),
                document.getElementById('mobileDarkModeToggle')
            ];
            
            toggleButtons.forEach(button => {
                if (button) {
                    // Clone the button to remove all event listeners
                    const newButton = button.cloneNode(true);
                    button.parentNode.replaceChild(newButton, button);
                    console.log('Dark Mode Conflict Resolver: Removed listeners from', button.id);
                }
            });
            
            // Remove any document-level dark mode event listeners
            const events = ['darkModeToggled', 'themeChanged', 'modeChanged'];
            events.forEach(eventType => {
                // Create a new event to clear existing listeners
                document.removeEventListener(eventType, () => {});
            });
            
        } catch (error) {
            console.error('Dark Mode Conflict Resolver: Error removing listeners', error);
        }
    }
    
    overrideConflictingFunctions() {
        try {
            // Override global functions that might conflict
            this.conflictingFunctions.forEach(funcName => {
                if (window[funcName]) {
                    const originalFunc = window[funcName];
                    window[funcName] = function(...args) {
                        console.warn(`Dark Mode Conflict Resolver: Blocked call to ${funcName}. Use darkModeManager instead.`);
                        // Return a safe default
                        return false;
                    };
                    console.log(`Dark Mode Conflict Resolver: Overridden ${funcName}`);
                }
            });
            
            // Override localStorage setItem for darkMode key
            const originalSetItem = localStorage.setItem;
            localStorage.setItem = function(key, value) {
                if (key === 'darkMode' && window.darkModeManager && window.darkModeManager.isInitialized) {
                    console.log('Dark Mode Conflict Resolver: Redirecting localStorage darkMode to darkModeManager');
                    // Let the dark mode manager handle this
                    return;
                }
                return originalSetItem.call(this, key, value);
            };
            
        } catch (error) {
            console.error('Dark Mode Conflict Resolver: Error overriding functions', error);
        }
    }
    
    cleanLocalStorageConflicts() {
        try {
            // Clean up conflicting localStorage entries
            const conflictingKeys = ['theme', 'mode', 'themePreference'];
            
            conflictingKeys.forEach(key => {
                if (localStorage.getItem(key)) {
                    console.log(`Dark Mode Conflict Resolver: Removing conflicting localStorage key: ${key}`);
                    localStorage.removeItem(key);
                }
            });
            
        } catch (error) {
            console.error('Dark Mode Conflict Resolver: Error cleaning localStorage', error);
        }
    }
    
    disableConflictingStyles() {
        try {
            // Remove any inline styles that might conflict
            const elementsWithInlineStyles = document.querySelectorAll('[style*="background"], [style*="color"]');
            
            elementsWithInlineStyles.forEach(element => {
                // Only remove if it's likely a dark mode related style
                const style = element.getAttribute('style');
                if (style && (style.includes('dark') || style.includes('light'))) {
                    element.removeAttribute('style');
                    console.log('Dark Mode Conflict Resolver: Removed conflicting inline style from', element.tagName);
                }
            });
            
            // Remove conflicting CSS classes
            const conflictingClasses = ['theme-dark', 'theme-light', 'mode-dark', 'mode-light'];
            
            conflictingClasses.forEach(className => {
                const elements = document.querySelectorAll(`.${className}`);
                elements.forEach(element => {
                    element.classList.remove(className);
                    console.log(`Dark Mode Conflict Resolver: Removed conflicting class ${className}`);
                });
            });
            
        } catch (error) {
            console.error('Dark Mode Conflict Resolver: Error disabling conflicting styles', error);
        }
    }
    
    // Method to safely destroy this resolver when no longer needed
    destroy() {
        try {
            console.log('Dark Mode Conflict Resolver: Destroying resolver...');
            // Clean up any remaining references
            delete window.darkModeConflictResolver;
        } catch (error) {
            console.error('Dark Mode Conflict Resolver: Error during destruction', error);
        }
    }
}

// Initialize the conflict resolver immediately
if (typeof window !== 'undefined') {
    // Run immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.darkModeConflictResolver = new DarkModeConflictResolver();
        });
    } else {
        window.darkModeConflictResolver = new DarkModeConflictResolver();
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeConflictResolver;
}