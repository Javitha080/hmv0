/**
 * Advanced JavaScript for Contact Us Section
 * Enhances animations and interactions for the contact section
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations when document is fully loaded
  initContactAnimations();
});

/**
 * Initialize all animations for the contact section
 */
function initContactAnimations() {
  // Initialize GSAP for smoother animations if available
  if (typeof gsap !== 'undefined') {
    initContactGsapAnimations();
  } else {
    // Fallback to standard animations if GSAP is not available
    initContactStandardAnimations();
  }

  // Add scroll reveal effects
  initContactScrollReveal();
  
  // Add hover effects
  initContactHoverEffects();
  
  // Add form interactions
  enhanceContactForm();
  
  // Enhance Get In Touch card and Map card
  enhanceGetInTouchCard();
  enhanceMapCard();
}

/**
 * Enhance the Get In Touch card with interactive effects
 */
function enhanceGetInTouchCard() {
  const getInTouchCard = document.querySelector('#contact .flex-col .glassmorphism:first-child');
  
  if (!getInTouchCard) return;
  
  // Add hover effect
  getInTouchCard.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    
    // Enhance the corner elements
    const corners = this.querySelectorAll('.absolute');
    corners.forEach(corner => {
      corner.style.borderColor = 'rgba(239, 68, 68, 0.8)';
      corner.style.transition = 'all 0.3s ease';
    });
  });
  
  getInTouchCard.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.boxShadow = '';
    
    // Reset corner elements
    const corners = this.querySelectorAll('.absolute');
    corners.forEach(corner => {
      corner.style.borderColor = '';
    });
  });
  
  // Add subtle pulse animation to icons
  const icons = getInTouchCard.querySelectorAll('.fas');
  icons.forEach(icon => {
    icon.classList.add('transition-all', 'duration-300');
    icon.parentElement.addEventListener('mouseenter', function() {
      icon.classList.add('scale-125');
    });
    icon.parentElement.addEventListener('mouseleave', function() {
      icon.classList.remove('scale-125');
    });
  });
}

/**
 * Enhance the Map card with interactive effects
 */
function enhanceMapCard() {
  const mapCard = document.querySelector('#contact .flex-col .glassmorphism:last-child');
  const iframe = mapCard?.querySelector('iframe');
  
  if (!mapCard || !iframe) return;
  
  // Add hover effect
  mapCard.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    iframe.style.transform = 'scale(1.02)';
  });
  
  mapCard.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.boxShadow = '';
    iframe.style.transform = '';
  });
  
  // Add loading animation
  iframe.addEventListener('load', function() {
    this.style.opacity = '1';
    mapCard.classList.add('loaded');
  });
  
  // Set initial state
  iframe.style.opacity = '0.7';
  iframe.style.transition = 'all 0.5s ease';
}

/**
 * Initialize GSAP animations for smoother effects
 */
function initContactGsapAnimations() {
  // Animate contact form
  gsap.from('.contact-form', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });

  // Animate contact info
  gsap.from('.glassmorphism', {
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });

  // Stagger animation for contact info items
  gsap.from('#contact ul li', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#contact ul',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Animate map
  gsap.from('#contact iframe', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#contact iframe',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });

  // Animate social icons
  gsap.from('#contact .social-icon', {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '#contact .social-icon',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  });
}

/**
 * Initialize standard animations without GSAP
 */
function initContactStandardAnimations() {
  // Add fade-in animation to contact form
  const contactForm = document.querySelector('#contact .glassmorphism');
  if (contactForm) {
    contactForm.classList.add('animate-fadeIn');
  }
  
  // Add staggered animation to contact info items
  const contactItems = document.querySelectorAll('#contact ul li');
  contactItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('animate-slideInRight');
  });
  
  // Add animation to map
  const mapContainer = document.querySelector('#contact .flex-col .glassmorphism:last-child');
  if (mapContainer) {
    mapContainer.classList.add('animate-fadeIn');
    mapContainer.style.animationDelay = '0.3s';
  }
}

/**
 * Initialize scroll reveal effects
 */
function initContactScrollReveal() {
  // Use Intersection Observer to detect when elements enter viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('contact-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observe contact section elements
  document.querySelectorAll('#contact .glassmorphism, #contact .contact-form, #contact iframe, #contact ul li').forEach(element => {
    observer.observe(element);
  });
}

/**
 * Initialize hover effects for contact elements
 */
function initContactHoverEffects() {
  // Add hover effects to contact info items
  const contactItems = document.querySelectorAll('#contact ul li');
  
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Add a subtle pulse animation to the icon
      const icon = this.querySelector('.flex-shrink-0');
      if (icon) {
        icon.style.animation = 'contact-icon-pulse 0.5s ease-in-out';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      // Remove the animation
      const icon = this.querySelector('.flex-shrink-0');
      if (icon) {
        icon.style.animation = '';
      }
    });
  });

  // Add hover effects to social icons
  const socialIcons = document.querySelectorAll('#contact .social-icon');
  
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.15) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

/**
 * Enhance contact form interactions
 */
function enhanceContactForm() {
  // Add floating label effect
  const formInputs = document.querySelectorAll('#contact input, #contact textarea');
  
  formInputs.forEach(input => {
    // Check if input already has value
    if (input.value.trim() !== '') {
      input.classList.add('has-value');
    }
    
    // Add event listeners
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('input-focused');
      if (this.value.trim() !== '') {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
  });

  // Add form submission animation
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add a success animation
      const submitButton = this.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitButton.classList.add('success-animation');
        
        // Reset form after delay
        setTimeout(() => {
          this.reset();
          submitButton.innerHTML = 'Send Message';
          submitButton.classList.remove('success-animation');
          formInputs.forEach(input => input.classList.remove('has-value'));
        }, 3000);
      }
    });
  }
}

// Add CSS for animations that aren't in the main stylesheet
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes contact-icon-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    .contact-element-visible {
      animation: fadeInUp 0.8s ease forwards;
    }
    
    .contact-item-visible {
      animation: fadeInRight 0.5s ease forwards;
    }
    
    .contact-revealed {
      opacity: 1;
      transform: translateY(0);
    }
    
    #contact .glassmorphism, 
    #contact .contact-form, 
    #contact iframe,
    #contact ul li {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .success-animation {
      background: linear-gradient(to right, #4CAF50, #8BC34A) !important;
    }
  `;
  document.head.appendChild(style);
});