// Professional JavaScript for IETE-SF Website

class ProfessionalWebsite {
  constructor() {
    this.heroSlider = {
      currentSlide: 0,
      slides: [],
      indicators: [],
      autoPlayInterval: null,
      autoPlayDelay: 6000,
    }

    this.testimonialSlider = {
      currentSlide: 0,
      slides: [],
      autoPlayInterval: null,
      autoPlayDelay: 5000,
    }

    this.init()
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initializeComponents()
      this.setupEventListeners()
      this.hideLoadingScreen()
    })

    window.addEventListener("load", () => {
      this.hideLoadingScreen()
    })

    window.addEventListener(
      "scroll",
      this.throttle(() => {
        this.handleScroll()
      }, 16),
    )

    window.addEventListener(
      "resize",
      this.debounce(() => {
        this.handleResize()
      }, 250),
    )
  }

  initializeComponents() {
    this.initHeroSlider()
    this.initTestimonialSlider()
    this.initNavigation()
    this.initBackToTop()
    this.initCounters()
    this.initPopup()
  }

  setupEventListeners() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen")
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add("hidden")
        setTimeout(() => {
          loadingScreen.style.display = "none"
        }, 300)
      }, 1500)
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

    // Event listeners
    if (prevBtn) prevBtn.addEventListener("click", () => this.prevHeroSlide())
    if (nextBtn) nextBtn.addEventListener("click", () => this.nextHeroSlide())

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
    this.heroSlider.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.heroSlider.currentSlide)
    })

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

    if (prevBtn) prevBtn.addEventListener("click", () => this.prevTestimonial())
    if (nextBtn) nextBtn.addEventListener("click", () => this.nextTestimonial())

    this.startTestimonialAutoPlay()

    const testimonialSection = document.querySelector(".testimonials-container")
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

    // Update active nav link on scroll
    this.updateActiveNavLink()
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
      rootMargin: "0px 0px -100px 0px",
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

  initPopup() {
    const popup = document.getElementById("event-popup")
    const closeBtn = document.getElementById("popup-close")

    if (!popup) return

    // Show popup after delay
    setTimeout(() => {
      popup.classList.add("active")
    }, 8000)

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

    // Update active nav link
    this.updateActiveNavLink()
  }

  handleResize() {
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
const website = new ProfessionalWebsite()

// Additional utility functions
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

// Preload images on page load
window.addEventListener("load", preloadImages)

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason)
})
