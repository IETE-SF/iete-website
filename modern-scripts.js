// Modern JavaScript for IETE-SF Website

class IETEWebsite {
  constructor() {
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initializeComponents()
    this.handleLoading()
  }

  setupEventListeners() {
    // DOM Content Loaded
    document.addEventListener("DOMContentLoaded", () => {
      this.initHeroSlider()
      this.initTestimonialSlider()
      this.initScrollAnimations()
      this.initNavigation()
      this.initPopup()
      this.initBackToTop()
      this.initCounters()
    })

    // Window Load
    window.addEventListener("load", () => {
      this.hideLoading()
    })

    // Window Scroll
    window.addEventListener("scroll", () => {
      this.handleScroll()
    })

    // Window Resize
    window.addEventListener("resize", () => {
      this.handleResize()
    })
  }

  initializeComponents() {
    this.heroSlider = {
      currentSlide: 0,
      slides: [],
      indicators: [],
      autoPlayInterval: null,
      autoPlayDelay: 5000,
    }

    this.testimonialSlider = {
      currentSlide: 0,
      slides: [],
      autoPlayInterval: null,
      autoPlayDelay: 4000,
    }

    this.scrollAnimations = {
      elements: [],
      observer: null,
    }
  }

  handleLoading() {
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      // Minimum loading time for better UX
      setTimeout(() => {
        loadingScreen.classList.add("hidden")
        setTimeout(() => {
          loadingScreen.style.display = "none"
        }, 500)
      }, 2000)
    }
  }

  hideLoading() {
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      loadingScreen.classList.add("hidden")
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }
  }

  initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide")
    const indicators = document.querySelectorAll(".indicator")
    const prevBtn = document.getElementById("hero-prev")
    const nextBtn = document.getElementById("hero-next")

    if (!slides.length) return

    this.heroSlider.slides = slides
    this.heroSlider.indicators = indicators

    // Set background images
    slides.forEach((slide) => {
      const bgImage = slide.dataset.bg
      if (bgImage) {
        slide.style.backgroundImage = `url(${bgImage})`
      }
    })

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.prevHeroSlide())
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextHeroSlide())
    }

    // Indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToHeroSlide(index))
    })

    // Auto play
    this.startHeroAutoPlay()

    // Pause on hover
    const heroSection = document.querySelector(".hero")
    if (heroSection) {
      heroSection.addEventListener("mouseenter", () => this.stopHeroAutoPlay())
      heroSection.addEventListener("mouseleave", () => this.startHeroAutoPlay())
    }
  }

  nextHeroSlide() {
    this.heroSlider.currentSlide = (this.heroSlider.currentSlide + 1) % this.heroSlider.slides.length
    this.updateHeroSlider()
  }

  prevHeroSlide() {
    this.heroSlider.currentSlide =
      this.heroSlider.currentSlide === 0 ? this.heroSlider.slides.length - 1 : this.heroSlider.currentSlide - 1
    this.updateHeroSlider()
  }

  goToHeroSlide(index) {
    this.heroSlider.currentSlide = index
    this.updateHeroSlider()
  }

  updateHeroSlider() {
    // Update slides
    this.heroSlider.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.heroSlider.currentSlide)
    })

    // Update indicators
    this.heroSlider.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.heroSlider.currentSlide)
    })
  }

  startHeroAutoPlay() {
    this.stopHeroAutoPlay()
    this.heroSlider.autoPlayInterval = setInterval(() => {
      this.nextHeroSlide()
    }, this.heroSlider.autoPlayDelay)
  }

  stopHeroAutoPlay() {
    if (this.heroSlider.autoPlayInterval) {
      clearInterval(this.heroSlider.autoPlayInterval)
      this.heroSlider.autoPlayInterval = null
    }
  }

  initTestimonialSlider() {
    const slides = document.querySelectorAll(".testimonial-card")
    const prevBtn = document.getElementById("testimonial-prev")
    const nextBtn = document.getElementById("testimonial-next")

    if (!slides.length) return

    this.testimonialSlider.slides = slides

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.prevTestimonial())
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextTestimonial())
    }

    // Auto play
    this.startTestimonialAutoPlay()

    // Pause on hover
    const testimonialSection = document.querySelector(".testimonials-slider")
    if (testimonialSection) {
      testimonialSection.addEventListener("mouseenter", () => this.stopTestimonialAutoPlay())
      testimonialSection.addEventListener("mouseleave", () => this.startTestimonialAutoPlay())
    }
  }

  nextTestimonial() {
    this.testimonialSlider.currentSlide =
      (this.testimonialSlider.currentSlide + 1) % this.testimonialSlider.slides.length
    this.updateTestimonialSlider()
  }

  prevTestimonial() {
    this.testimonialSlider.currentSlide =
      this.testimonialSlider.currentSlide === 0
        ? this.testimonialSlider.slides.length - 1
        : this.testimonialSlider.currentSlide - 1
    this.updateTestimonialSlider()
  }

  updateTestimonialSlider() {
    this.testimonialSlider.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.testimonialSlider.currentSlide)
    })
  }

  startTestimonialAutoPlay() {
    this.stopTestimonialAutoPlay()
    this.testimonialSlider.autoPlayInterval = setInterval(() => {
      this.nextTestimonial()
    }, this.testimonialSlider.autoPlayDelay)
  }

  stopTestimonialAutoPlay() {
    if (this.testimonialSlider.autoPlayInterval) {
      clearInterval(this.testimonialSlider.autoPlayInterval)
      this.testimonialSlider.autoPlayInterval = null
    }
  }

  initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    this.scrollAnimations.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate")
        }
      })
    }, observerOptions)

    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll("[data-aos]")
    animatedElements.forEach((element) => {
      this.scrollAnimations.observer.observe(element)
    })
  }

  initNavigation() {
    const navbar = document.getElementById("navbar")
    const navToggle = document.getElementById("nav-toggle")
    const navMenu = document.getElementById("nav-menu")
    const navLinks = document.querySelectorAll(".nav-link")

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active")
        navMenu.classList.toggle("active")
      })
    }

    // Close mobile menu when clicking on links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navToggle && navMenu) {
          navToggle.classList.remove("active")
          navMenu.classList.remove("active")
        }
      })
    })

    // Active link highlighting
    this.updateActiveNavLink()
    window.addEventListener("scroll", () => this.updateActiveNavLink())
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let currentSection = ""
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  }

  initPopup() {
    const popup = document.getElementById("event-popup")
    const closeBtn = document.getElementById("popup-close")

    if (!popup) return

    // Show popup after delay
    setTimeout(() => {
      popup.classList.add("active")
    }, 5000)

    // Close popup
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        popup.classList.remove("active")
      })
    }

    // Close popup when clicking outside
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("active")
      }
    })
  }

  initBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top")

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }
  }

  initCounters() {
    const counters = document.querySelectorAll(".stat-number")

    const observerOptions = {
      threshold: 0.5,
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  }

  animateCounter(element) {
    const target = Number.parseInt(element.dataset.count)
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current)
    }, 16)
  }

  handleScroll() {
    const navbar = document.getElementById("navbar")
    const backToTopBtn = document.getElementById("back-to-top")
    const scrollPosition = window.scrollY

    // Navbar scroll effect
    if (navbar) {
      navbar.classList.toggle("scrolled", scrollPosition > 50)
    }

    // Back to top button visibility
    if (backToTopBtn) {
      backToTopBtn.classList.toggle("visible", scrollPosition > 300)
    }
  }

  handleResize() {
    // Handle any resize-specific logic here
    const navMenu = document.getElementById("nav-menu")
    const navToggle = document.getElementById("nav-toggle")

    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu && navToggle) {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    }
  }

  // Utility methods
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }
}

// Initialize the website
const website = new IETEWebsite()

// Additional utility functions
function smoothScrollTo(target) {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Preload images for better performance
function preloadImages() {
  const images = [
    "asssets/Background/Grp_pic.jpg",
    "asssets/Background/Core24-25.jpg",
    "asssets/Background/Emerging-Technologies.jpg",
    "asssets/Background/Core 2023-24.jpg",
  ]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Call preload on page load
window.addEventListener("load", preloadImages)

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === "navigation") {
      console.log("Page Load Time:", entry.loadEventEnd - entry.loadEventStart)
    }
  }
})

if (PerformanceObserver.supportedEntryTypes.includes("navigation")) {
  perfObserver.observe({ entryTypes: ["navigation"] })
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  // You can send this to an error tracking service
})

// Unhandled promise rejection handling
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
  // You can send this to an error tracking service
})
