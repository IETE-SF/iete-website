// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    setTimeout(() => {
      loadingScreen.style.display = "none"
    }, 500)
  }, 1000)
})

// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop")

backToTopBtn.addEventListener("click", (e) => {
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Navbar scroll effect
let lastScrollTop = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)"
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)"
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".contributor-card, .appreciation-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  }
})

// Prevent body scroll when mobile menu is open
navToggle.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }
})

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
    document.body.style.overflow = ""
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Contributor card hover effects
document.addEventListener("DOMContentLoaded", () => {
  const contributorCards = document.querySelectorAll(".contributor-card")

  contributorCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-12px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Stats counter animation
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number")

  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.textContent.replace("+", ""))
    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      stat.textContent = Math.floor(current) + (target >= 50 ? "+" : "")
    }, 40)
  })
}

// Trigger stats animation when appreciation section is visible
const appreciationSection = document.querySelector(".appreciation-section")
if (appreciationSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats()
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statsObserver.observe(appreciationSection)
}

// Social link tracking (for analytics)
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const platform = link.getAttribute("aria-label")
    console.log(`Social link clicked: ${platform}`)
    // Add analytics tracking here if needed
  })
})
