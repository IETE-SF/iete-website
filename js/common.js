function initializeCommonScripts() {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")
  const navbar = document.getElementById("navbar")
  const backToTopBtn = document.getElementById("back-to-top")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    })

    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        document.body.style.overflow = ""
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
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
  }

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
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = "translateY(-100%)"
      } else {
        // Scrolling up
        navbar.style.transform = "translateY(0)"
      }
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
