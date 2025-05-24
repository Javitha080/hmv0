/**
 * Advanced JavaScript for School Societies Section
 * Enhances animations and interactions for the societies section
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations when document is fully loaded
  initSocietiesAnimations();
});

/**
 * Initialize all animations for the societies section
 */
function initSocietiesAnimations() {
  // Initialize GSAP for smoother animations if available
  if (typeof gsap !== 'undefined') {
    initGsapAnimations();
  } else {
    // Fallback to standard animations if GSAP is not available
    initStandardAnimations();
  }

  // Add scroll reveal effects
  initScrollReveal();
  
  // Add hover effects
  initHoverEffects();
  
  // Add background animations
  animateBackgroundElements();
}

/**
 * Initialize GSAP animations for smoother effects
 */
function initGsapAnimations() {
  // Stagger animation for society cards
  gsap.from('.society-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.societies-section',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });

  // Animate section title
  gsap.from('.societies-title-container', {
    y: -30,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: '.societies-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  // Animate background elements
  gsap.to('.societies-bg-1', {
    rotation: 360,
    duration: 40,
    repeat: -1,
    ease: 'none'
  });

  gsap.to('.societies-bg-2', {
    rotation: -360,
    duration: 50,
    repeat: -1,
    ease: 'none'
  });
}

/**
 * Initialize standard animations without GSAP
 */
function initStandardAnimations() {
  // Add fade-in class to society cards with delay
  const societyCards = document.querySelectorAll('.society-card');
  societyCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('society-card-visible');
    }, 150 * index);
  });
}

/**
 * Initialize scroll reveal effects
 */
function initScrollReveal() {
  // Use Intersection Observer to detect when elements enter viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('society-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observe all society cards
  document.querySelectorAll('.society-card').forEach(card => {
    observer.observe(card);
  });

  // Observe title container
  const titleContainer = document.querySelector('.societies-title-container');
  if (titleContainer) observer.observe(titleContainer);
}

/**
 * Initialize hover effects for society cards
 */
function initHoverEffects() {
  const societyCards = document.querySelectorAll('.society-card');
  
  societyCards.forEach(card => {
    // Create a 3D tilt effect on hover
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX * 5; // Max 5 degrees rotation
      const deltaY = (y - centerY) / centerY * 5; // Max 5 degrees rotation
      
      this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Move the logo slightly based on mouse position
      const logo = this.querySelector('.society-logo-container');
      if (logo) {
        logo.style.transform = `translate(${deltaX * 2}px, ${deltaY * 2}px) scale(1.1) rotate(${deltaX + deltaY}deg)`;
      }
    });
    
    // Reset transform on mouse leave
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      const logo = this.querySelector('.society-logo-container');
      if (logo) {
        logo.style.transform = '';
      }
    });
  });
}

/**
 * Animate background elements
 */
function animateBackgroundElements() {
  // Add random movement to background elements
  const bg1 = document.querySelector('.societies-bg-1');
  const bg2 = document.querySelector('.societies-bg-2');
  
  if (bg1 && bg2) {
    // Random movement animation
    setInterval(() => {
      const x1 = Math.random() * 10 - 5; // -5 to 5
      const y1 = Math.random() * 10 - 5; // -5 to 5
      const x2 = Math.random() * 10 - 5; // -5 to 5
      const y2 = Math.random() * 10 - 5; // -5 to 5
      
      bg1.style.transform = `translate(${x1}px, ${y1}px)`;
      bg2.style.transform = `translate(${x2}px, ${y2}px)`;
    }, 3000);
  }
}

/**
 * Add event listeners for society buttons
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add click event listeners to society buttons
  const societyButtons = document.querySelectorAll('.society-button');
  
  societyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Prevent default action
      e.preventDefault();
      
      // Add a ripple effect
      const ripple = document.createElement('span');
      ripple.classList.add('society-button-ripple');
      this.appendChild(ripple);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        ripple.remove();
      }, 1000);
      
      // Get the society name from the parent card
      const societyCard = this.closest('.society-card');
      const societyName = societyCard.querySelector('.society-name').textContent;
      
      // Show a message (can be replaced with actual navigation)
      console.log(`Exploring more about ${societyName}`);
    });
  });
});