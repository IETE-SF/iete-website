document.addEventListener("DOMContentLoaded", async () => {
  // Load Navbar
  const navbarPlaceholder = document.getElementById("navbar-placeholder")
  if (navbarPlaceholder) {
    try {
      const response = await fetch("components/navbar.html")
      const navbarHtml = await response.text()
      navbarPlaceholder.innerHTML = navbarHtml
      setActiveNavLink()
    } catch (error) {
      console.error("Error loading navbar:", error)
    }
  }

  // Load Mobile Navbar
  const mobileNavbarPlaceholder = document.getElementById("mobile-navbar-placeholder")
  if (mobileNavbarPlaceholder) {
    try {
      const response = await fetch("components/mobile-navbar.html")
      const mobileNavbarHtml = await response.text()
      mobileNavbarPlaceholder.innerHTML = mobileNavbarHtml
      // Mobile navbar initializes itself via mobile-navbar.js
    } catch (error) {
      console.error("Error loading mobile navbar:", error)
    }
  }

  // Initialize common scripts after all components are loaded
  initializeCommonScripts()

  // Load Footer
  const footerPlaceholder = document.getElementById("footer-placeholder")
  if (footerPlaceholder) {
    try {
      const response = await fetch("components/footer.html")
      const footerHtml = await response.text()
      footerPlaceholder.innerHTML = footerHtml
      // Back to top button is part of footer, so it's handled by common.js
    } catch (error) {
      console.error("Error loading footer:", error)
    }
  }
})

function setActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-page") === currentPath) {
      link.classList.add("active")
    }
  })
}
