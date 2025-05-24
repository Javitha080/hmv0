/**
 * Enhanced Router System for Homagama Maha Vidyalaya Website
 * Handles navigation, URL management, and DOM updates
 */

class WebsiteRouter {
  constructor() {
    this.routes = new Map();
    this.currentRoute = null;
    this.isNavigating = false;
    this.scrollPositions = new Map();
    this.navigationHistory = [];
    this.maxHistoryLength = 10;
    this.retryAttempts = 0;
    this.maxRetries = 3;
    
    // Initialize router
    this.init();
  }

  /**
   * Initialize the router system
   */
  init() {
    console.log('Initializing Website Router...');
    
    // Define routes
    this.defineRoutes();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Handle initial page load
    this.handleInitialLoad();
    
    console.log('Router initialized successfully');
  }

  /**
   * Define all available routes
   */
  defineRoutes() {
    this.routes.set('home', {
      path: '#home',
      element: '#home',
      title: 'Home - Homagama Maha Vidyalaya',
      description: 'Welcome to Homagama Maha Vidyalaya - A premier educational institution'
    });
    
    this.routes.set('about', {
      path: '#about',
      element: '#about',
      title: 'About Us - Homagama Maha Vidyalaya',
      description: 'Learn about our history, mission, and values'
    });
    
    this.routes.set('staff', {
      path: '#staff',
      element: '#staff',
      title: 'Our Staff - Homagama Maha Vidyalaya',
      description: 'Meet our dedicated teaching and administrative staff'
    });
    
    this.routes.set('gallery', {
      path: '#gallery',
      element: '#gallery',
      title: 'Gallery - Homagama Maha Vidyalaya',
      description: 'Explore our school events, activities, and campus'
    });
    
    this.routes.set('news', {
      path: '#news',
      element: '#news',
      title: 'News & Events - Homagama Maha Vidyalaya',
      description: 'Stay updated with latest news and upcoming events'
    });
    
    this.routes.set('contact', {
      path: '#contact',
      element: '#contact',
      title: 'Contact Us - Homagama Maha Vidyalaya',
      description: 'Get in touch with us for inquiries and information'
    });
    
    // Sub-routes for staff section
    this.routes.set('principal', {
      path: '#principal',
      element: '#staff',
      title: 'Principal - Homagama Maha Vidyalaya',
      description: 'Meet our Principal',
      scrollTarget: '#principal-section'
    });
    
    this.routes.set('vice-principal', {
      path: '#vice-principal',
      element: '#staff',
      title: 'Vice Principal - Homagama Maha Vidyalaya',
      description: 'Meet our Vice Principal',
      scrollTarget: '#vice-principal-section'
    });
    
    this.routes.set('science-head', {
      path: '#science-head',
      element: '#staff',
      title: 'Head of Science - Homagama Maha Vidyalaya',
      description: 'Meet our Head of Science Department',
      scrollTarget: '#science-head-section'
    });
  }

  /**
   * Set up event listeners for navigation
   */
  setupEventListeners() {
    // Handle hash changes
    window.addEventListener('hashchange', (e) => {
      this.handleHashChange(e);
    });
    
    // Handle popstate for browser back/forward
    window.addEventListener('popstate', (e) => {
      this.handlePopState(e);
    });
    
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      this.handleNavigationClick(e);
    });
    
    // Handle scroll for updating active navigation
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.updateActiveNavigation();
      }, 100);
    });
  }

  /**
   * Handle initial page load
   */
  handleInitialLoad() {
    const hash = window.location.hash || '#home';
    const routeName = hash.replace('#', '') || 'home';
    
    if (this.routes.has(routeName)) {
      this.navigateTo(routeName, false);
    } else {
      this.navigateTo('home', false);
    }
  }

  /**
   * Handle hash changes
   */
  handleHashChange(e) {
    const newHash = window.location.hash;
    const routeName = newHash.replace('#', '') || 'home';
    
    if (this.routes.has(routeName) && !this.isNavigating) {
      this.navigateTo(routeName, false);
    }
  }

  /**
   * Handle browser back/forward navigation
   */
  handlePopState(e) {
    const hash = window.location.hash || '#home';
    const routeName = hash.replace('#', '') || 'home';
    
    if (this.routes.has(routeName)) {
      this.navigateTo(routeName, false);
    }
  }

  /**
   * Handle navigation link clicks
   */
  handleNavigationClick(e) {
    const link = e.target.closest('a[href^="#"]');
    
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    
    e.preventDefault();
    
    const routeName = href.replace('#', '');
    
    if (this.routes.has(routeName)) {
      this.navigateTo(routeName, true);
    }
  }

  /**
   * Navigate to a specific route
   */
  async navigateTo(routeName, updateHistory = true) {
    if (this.isNavigating) return;
    
    const route = this.routes.get(routeName);
    if (!route) {
      console.warn(`Route '${routeName}' not found`);
      return;
    }
    
    this.isNavigating = true;
    
    try {
      // Save current scroll position
      if (this.currentRoute) {
        this.scrollPositions.set(this.currentRoute, window.scrollY);
      }
      
      // Update URL if needed
      if (updateHistory && window.location.hash !== route.path) {
        history.pushState({ route: routeName }, route.title, route.path);
      }
      
      // Update document title and meta
      this.updatePageMeta(route);
      
      // Update active navigation
      this.updateActiveNavigation(routeName);
      
      // Scroll to target element
      await this.scrollToElement(route);
      
      // Update current route
      this.currentRoute = routeName;
      
      // Trigger route change event
      this.triggerRouteChangeEvent(routeName, route);
      
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      this.isNavigating = false;
    }
  }

  /**
   * Update page meta information
   */
  updatePageMeta(route) {
    // Update title
    document.title = route.title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = route.description;
    
    // Update Open Graph tags
    this.updateOpenGraphTags(route);
  }

  /**
   * Update Open Graph meta tags
   */
  updateOpenGraphTags(route) {
    const ogTags = {
      'og:title': route.title,
      'og:description': route.description,
      'og:url': window.location.href
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.property = property;
        document.head.appendChild(tag);
      }
      tag.content = content;
    });
  }

  /**
   * Update active navigation states
   */
  updateActiveNavigation(routeName = null) {
    // Remove active class from all navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // If routeName is provided, use it; otherwise detect from scroll position
    let activeRoute = routeName;
    
    if (!activeRoute) {
      activeRoute = this.detectActiveSection();
    }
    
    // Add active class to current navigation link
    const activeLinks = document.querySelectorAll(`a[href="#${activeRoute}"]`);
    activeLinks.forEach(link => {
      if (link.classList.contains('nav-link') || link.classList.contains('mobile-nav-link')) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Detect active section based on scroll position
   */
  detectActiveSection() {
    const sections = Array.from(this.routes.keys());
    const scrollPosition = window.scrollY + 100; // Offset for header
    
    for (const sectionName of sections) {
      const route = this.routes.get(sectionName);
      const element = document.querySelector(route.element);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          return sectionName;
        }
      }
    }
    
    return 'home'; // Default to home
  }

  /**
   * Scroll to target element with smooth animation
   */
  async scrollToElement(route) {
    const targetSelector = route.scrollTarget || route.element;
    const targetElement = document.querySelector(targetSelector);
    
    if (!targetElement) {
      console.warn(`Target element '${targetSelector}' not found`);
      return;
    }
    
    // Calculate scroll position (account for fixed header)
    const headerHeight = document.querySelector('header')?.offsetHeight || 80;
    const targetPosition = targetElement.offsetTop - headerHeight;
    
    // Use GSAP for smooth scrolling if available
    if (window.gsap && window.ScrollToPlugin) {
      return new Promise((resolve) => {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetPosition,
            autoKill: false
          },
          ease: "power2.inOut",
          onComplete: resolve
        });
      });
    } else {
      // Fallback to native smooth scrolling
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Wait for scroll to complete
      return new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }
  }

  /**
   * Trigger custom route change event
   */
  triggerRouteChangeEvent(routeName, route) {
    const event = new CustomEvent('routechange', {
      detail: {
        route: routeName,
        routeData: route,
        timestamp: Date.now()
      }
    });
    
    window.dispatchEvent(event);
  }

  /**
   * Get current route information
   */
  getCurrentRoute() {
    return {
      name: this.currentRoute,
      data: this.routes.get(this.currentRoute)
    };
  }

  /**
   * Check if a route exists
   */
  hasRoute(routeName) {
    return this.routes.has(routeName);
  }

  /**
   * Get all available routes
   */
  getAllRoutes() {
    return Array.from(this.routes.keys());
  }

  /**
   * Refresh current route
   */
  refresh() {
    if (this.currentRoute) {
      this.navigateTo(this.currentRoute, false);
    }
  }

  /**
   * Go back to previous route
   */
  goBack() {
    window.history.back();
  }

  /**
   * Go forward to next route
   */
  goForward() {
    window.history.forward();
  }
}

// Initialize router when DOM is loaded
let websiteRouter;

document.addEventListener('DOMContentLoaded', () => {
  websiteRouter = new WebsiteRouter();
  
  // Make router globally available
  window.websiteRouter = websiteRouter;
  
  console.log('Website Router is ready!');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WebsiteRouter;
}