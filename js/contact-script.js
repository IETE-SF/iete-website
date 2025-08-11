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

// Contact Form Handling
const contactForm = document.getElementById("contactForm")
const submitBtn = contactForm.querySelector(".form-submit")
const submitText = submitBtn.querySelector(".submit-text")
const submitLoader = submitBtn.querySelector(".submit-loader")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Show loading state
  submitBtn.disabled = true
  submitText.style.display = "none"
  submitLoader.style.display = "block"

  // Get form data
  const formData = new FormData(contactForm)
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  }

  try {
    // Simulate form submission (replace with actual API call)
    await simulateFormSubmission(data)

    // Show success message
    showMessage("Thank you for your message! We'll get back to you soon.", "success")

    // Reset form
    contactForm.reset()
  } catch (error) {
    // Show error message
    showMessage("Sorry, there was an error sending your message. Please try again.", "error")
  } finally {
    // Reset button state
    submitBtn.disabled = false
    submitText.style.display = "block"
    submitLoader.style.display = "none"
  }
})

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success (90% of the time)
      if (Math.random() > 0.1) {
        console.log("Form submitted:", data)
        resolve()
      } else {
        reject(new Error("Submission failed"))
      }
    }, 2000)
  })
}

// Show success/error message
function showMessage(message, type) {
  // Remove existing messages
  const existingMessages = document.querySelectorAll(".success-message, .error-message")
  existingMessages.forEach((msg) => msg.remove())

  // Create new message
  const messageDiv = document.createElement("div")
  messageDiv.className = `${type}-message`
  messageDiv.textContent = message
  messageDiv.style.display = "block"

  // Insert before form
  contactForm.parentNode.insertBefore(messageDiv, contactForm)

  // Auto-hide after 5 seconds
  setTimeout(() => {
    messageDiv.style.opacity = "0"
    setTimeout(() => {
      messageDiv.remove()
    }, 300)
  }, 5000)
}

// Form validation
const formInputs = document.querySelectorAll(".form-input, .form-textarea")

formInputs.forEach((input) => {
  input.addEventListener("blur", validateField)
  input.addEventListener("input", clearValidation)
})

function validateField(e) {
  const field = e.target
  const value = field.value.trim()

  // Remove existing error styling
  field.classList.remove("error")

  // Validate based on field type
  let isValid = true

  if (field.hasAttribute("required") && !value) {
    isValid = false
  } else if (field.type === "email" && value && !isValidEmail(value)) {
    isValid = false
  } else if (field.type === "tel" && value && !isValidPhone(value)) {
    isValid = false
  }

  if (!isValid) {
    field.classList.add("error")
  }
}

function clearValidation(e) {
  e.target.classList.remove("error")
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

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
  const animatedElements = document.querySelectorAll(".contact-card, .contact-form-container")

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

// Add CSS for form validation errors
const style = document.createElement("style")
style.textContent = `
  .form-input.error,
  .form-textarea.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
`
document.head.appendChild(style)
