/**
 * Google Pixel Inspired Admission Page JavaScript
 * This file contains all the interactive functionality for the admission page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
  
  // Material Design Ripple Effect
  const rippleButtons = document.querySelectorAll('.ripple');
  
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // FAQ Accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isOpen = answer.style.maxHeight;
      
      // Close all other answers
      document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
          item.style.maxHeight = null;
          item.previousElementSibling.classList.remove('active');
        }
      });
      
      // Toggle current answer
      if (isOpen) {
        answer.style.maxHeight = null;
        this.classList.remove('active');
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        this.classList.add('active');
      }
    });
  });
  
  // Form validation
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const formInputs = this.querySelectorAll('input, textarea');
      
      formInputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          
          const errorMessage = document.createElement('div');
          errorMessage.classList.add('error-message');
          errorMessage.textContent = 'This field is required';
          
          // Remove existing error messages
          const existingError = input.nextElementSibling;
          if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
          }
          
          input.parentNode.insertBefore(errorMessage, input.nextSibling);
        } else {
          input.classList.remove('error');
          
          // Remove error message if exists
          const existingError = input.nextElementSibling;
          if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
          }
        }
      });
      
      if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message', 'fade-in');
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        
        contactForm.reset();
        contactForm.appendChild(successMessage);
        
        setTimeout(() => {
          successMessage.remove();
        }, 5000);
      }
    });
  }
  
  // Application process step navigation
  const stepButtons = document.querySelectorAll('.step-button');
  const stepContents = document.querySelectorAll('.step-content');
  
  if (stepButtons.length > 0) {
    stepButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        stepButtons.forEach(btn => btn.classList.remove('active'));
        stepContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current button and content
        this.classList.add('active');
        stepContents[index].classList.add('active');
      });
    });
    
    // Activate first step by default
    if (stepButtons[0] && stepContents[0]) {
      stepButtons[0].classList.add('active');
      stepContents[0].classList.add('active');
    }
  }
  
  // Floating labels for form inputs
  const formInputs = document.querySelectorAll('.floating-input');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Check if input has value on page load
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Scroll to top button
  const scrollTopButton = document.getElementById('scroll-top');
  
  if (scrollTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('visible');
      } else {
        scrollTopButton.classList.remove('visible');
      }
    });
    
    scrollTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});