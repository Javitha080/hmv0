document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll to top functionality
    function initScrollToTop() {
      const scrollToTopBtn = document.getElementById('scrollToTop');
      
      if (!scrollToTopBtn) {
        console.warn('Scroll to top button not found in the document');
        return;
      }
      
      // Throttle function to limit how often the scroll event fires
      function throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
          const context = this;
          const args = arguments;
          if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
          } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
              if ((Date.now() - lastRan) >= limit) {
                func.apply(context, args);
                lastRan = Date.now();
              }
            }, limit - (Date.now() - lastRan));
          }
        };
      }
      
      // Detect if device is mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Adjust scroll threshold based on device type and screen height
      let scrollThreshold = isMobile ? Math.min(150, window.innerHeight * 0.15) : 300;
      
      // Show/hide button based on scroll position with throttling
      const handleScroll = throttle(function() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        // Check if we've scrolled past the threshold
        if (scrollPosition > scrollThreshold) {
          scrollToTopBtn.classList.add('show');
        } else {
          scrollToTopBtn.classList.remove('show');
        }
        
        // Hide button when at the very top
        if (scrollPosition < 10) {
          scrollToTopBtn.classList.remove('show');
        }
      }, 100);
      
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
      
      // Initial check on page load
      handleScroll();
      
      // Scroll to top when clicked with enhanced animation
      scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add active state for button feedback
        scrollToTopBtn.classList.add('active');
        
        // Get current scroll position
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        // Determine scroll duration based on current position
        // Faster for shorter distances, slower for longer distances
        const scrollDuration = Math.min(1.5, 0.5 + (scrollPosition / 10000));
        
        // Use GSAP for smoother scrolling if available
        if (window.gsap && window.ScrollToPlugin) {
          gsap.to(window, {
            duration: scrollDuration, 
            scrollTo: {
              y: 0,
              autoKill: false
            },
            ease: "power3.out",
            onComplete: function() {
              // Remove active state after animation completes
              setTimeout(() => {
                scrollToTopBtn.classList.remove('active');
              }, 200);
            }
          });
        } else {
          // Fallback to native smooth scrolling
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          // Remove active state after animation
          setTimeout(() => {
            scrollToTopBtn.classList.remove('active');
          }, scrollDuration * 1000);
        }
      });
      
      // Handle window resize events
      window.addEventListener('resize', function() {
        // Update scroll threshold on resize
        scrollThreshold = isMobile ? Math.min(150, window.innerHeight * 0.15) : 300;
      });
    }
    
    // Call the initialization function directly
    initScrollToTop();
  });
