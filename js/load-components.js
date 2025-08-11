document.addEventListener("DOMContentLoaded", async () => {
  // Load Navbar
  const navbarPlaceholder = document.getElementById("navbar-placeholder")
  if (navbarPlaceholder) {
    try {
      const response = await fetch("components/navbar.html")
      const navbarHtml = await response.text()
      navbarPlaceholder.innerHTML = navbarHtml
      // After loading, initialize common scripts that depend on navbar elements
      initializeCommonScripts()
      setActiveNavLink()
    } catch (error) {
      console.error("Error loading navbar:", error)
    }
  }

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
