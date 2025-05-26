// history.js - Enhanced School History Page Interactivity
document.addEventListener("DOMContentLoaded", function () {
  console.log("History page loaded - initializing scripts...");

  // ===== Initialize Timeline Animations =====
  initTimelineAnimations();

  // ===== Initialize Gallery Carousel =====
  initGalleryCarousel();

  // ===== Initialize Dark Mode Toggle =====
  initDarkModeToggle();

  // ===== Initialize Back to Top Button =====
  initBackToTopButton();

  // ===== Initialize Modal Popups (Optional) =====
  initModalTriggers();

  // ===== Optional: Initialize Particle Background =====
  if (typeof initWelcomeParticles === "function") {
    initWelcomeParticles(); // from Main Script.js or three.js logic
  }
});

// ===== Timeline Animations with Intersection Observer =====
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  timelineItems.forEach(item => observer.observe(item));
}

// ===== Gallery Carousel Navigation =====
let currentSlide = 0;

function updateCarousel() {
  const carousel = document.getElementById("eraCarousel");
  const items = document.querySelectorAll(".carousel-item");
  const itemWidth = items[0].offsetWidth + 16; // width + gap
  carousel.style.transform = `translateX(-${currentSlide * itemWidth}px)`;
}

function nextSlide() {
  const totalItems = document.querySelectorAll(".carousel-item").length;
  currentSlide = (currentSlide + 1) % totalItems;
  updateCarousel();
}

function prevSlide() {
  const totalItems = document.querySelectorAll(".carousel-item").length;
  currentSlide = (currentSlide - 1 + totalItems) % totalItems;
  updateCarousel();
}

function initGalleryCarousel() {
  const carouselContainer = document.querySelector(".carousel-container");
  if (!carouselContainer) return;

  // Auto-advance every 5 seconds
  setInterval(() => {
    nextSlide();
  }, 5000);
}

// ===== Dark Mode Toggle Functionality =====
function initDarkModeToggle() {
  const toggleBtn = document.getElementById("darkModeToggle");
  const icon = document.getElementById("darkModeIcon");

  if (!toggleBtn || !icon) return;

  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("darkMode", "enabled");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("darkMode", "disabled");
    }
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("darkMode") || "disabled";
  if (savedTheme === "enabled") {
    document.documentElement.classList.add("dark");
    icon.classList.replace("fa-moon", "fa-sun");
  }
}

// ===== Back to Top Button Functionality =====
function initBackToTopButton() {
  const backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ===== Modal Triggers (Optional Enhancement) =====
function initModalTriggers() {
  const modalButtons = document.querySelectorAll("[data-modal]");

  modalButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal && typeof modal.showModal === "function") {
        modal.showModal();
      }
    });
  });

  // Close modals when clicking outside
  document.querySelectorAll("dialog").forEach(dialog => {
    dialog.addEventListener("close", () => {
      dialog.close();
    });
  });
}

// ===== Add Tooltip on Hover (Optional) =====
function initTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
      const tooltipText = el.getAttribute("data-tooltip");
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip-box fixed px-3 py-1 text-sm bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded shadow-lg z-50 pointer-events-none";
      tooltip.textContent = tooltipText;
      document.body.appendChild(tooltip);

      const rect = el.getBoundingClientRect();
      tooltip.style.top = `${rect.top + window.scrollY - 40}px`;
      tooltip.style.left = `${rect.left + window.scrollX - 20}px`;

      el.addEventListener("mouseleave", () => {
        tooltip.remove();
      });
    });
  });
}

// ===== Smooth Scroll for Navigation Links =====
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// ===== Optional: GSAP-Based Animations =====
function initGSAPAnimations() {
  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded - skipping advanced animations");
    return;
  }

  // Animate Timeline Line
  const timelineLine = document.getElementById("timelineLine");
  if (timelineLine) {
    gsap.from(timelineLine, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 2,
      scrollTrigger: {
        trigger: "#timelineSection",
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });
  }

  // Animate Logo Glow
  gsap.to(".logo-container", {
    scale: 1.05,
    yoyo: true,
    repeat: -1,
    duration: 2,
    ease: "power1.inOut"
  });
}

// ===== Initialize GSAP Animations =====
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  initGSAPAnimations();
}

// ===== Image Parallax Hover Effect =====
function initImageParallax() {
  const parallaxImages = document.querySelectorAll(".image-parallax");

  parallaxImages.forEach(img => {
    img.addEventListener("mousemove", (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      img.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) rotateX(0deg) rotateY(0deg)";
    });
  });
}

if (document.querySelectorAll(".image-parallax").length > 0) {
  initImageParallax();
}

// ===== Modal Functions (for dialog elements) =====
function showTimelineModal(id) {
  const modal = document.getElementById(id);
  if (modal && typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    alert("Modals not supported in this browser.");
  }
}

// ===== Footer Aurora Glow Animation Control (GSAP) =====
function animateFooterAurora() {
  const auroraBg = document.querySelector(".aurora-bg::before");

  if (!auroraBg || typeof gsap === "undefined") return;

  gsap.to(auroraBg, {
    backgroundPosition: "100% 50%",
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: "linear"
  });
}

if (typeof gsap !== "undefined") {
  animateFooterAurora();
}
// Initialize GSAP Animations for Timeline
function initGSAPAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  // Animate Timeline Line On Scroll
  gsap.from("#timelineLine", {
    scaleY: 0,
    transformOrigin: "top",
    duration: 2,
    scrollTrigger: {
      trigger: "#timelineSection",
      start: "top center+=100",
      toggleActions: "play none none reverse"
    }
  });

  // Animate Each Timeline Item
  document.querySelectorAll(".timeline-item").forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 60,
      duration: 1.2,
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Optional: Parallax Effect on Images
  const parallaxImages = [
    { el: ".timeline-item:nth-child(1) .w-10.h-10", offset: 10 },
    { el: ".timeline-item:nth-child(2) .w-10.h-10", offset: 15 },
    { el: ".timeline-item:nth-child(3) .w-10.h-10", offset: 20 },
    { el: ".timeline-item:nth-child(4) .w-10.h-10", offset: 25 }
  ];

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    parallaxImages.forEach(({ el, offset }) => {
      if (document.querySelector(el)) {
        document.querySelector(el).style.transform = `translateY(${Math.sin(scrollTop / offset) * 10}px)`;
      }
    });
  });
}

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  initGSAPAnimations();
}