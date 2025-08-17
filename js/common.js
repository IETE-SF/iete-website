function initializeCommonScripts() {
  // Get common elements
  const navbar = document.getElementById("navbar")
  const backToTopBtn = document.getElementById("back-to-top")
  
  // Mobile navigation is now handled by mobile-navbar.js

  // Back to Top Button
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Navbar scroll effect and Back to Top visibility
  let lastScrollTop = 0
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (navbar) {
      // Keep navbar always visible - just add scrolled effect
      navbar.classList.toggle("scrolled", scrollTop > 50)
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle("visible", scrollTop > 300)
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop

    // Update active nav link on scroll (for index.html primarily)
    updateActiveNavLinkOnScroll()
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

  // Function to update active nav link based on scroll position (primarily for index.html)
  function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    let currentSection = ""
    const scrollPosition = window.scrollY + 100 // Offset for fixed header

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      // Only update if it's an internal link to a section
      if (link.getAttribute("href").startsWith("#")) {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active")
        }
      }
    })
  }
}
