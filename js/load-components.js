document.addEventListener("DOMContentLoaded", async () => {
 
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

 
  const mobileNavbarPlaceholder = document.getElementById("mobile-navbar-placeholder")
  if (mobileNavbarPlaceholder) {
    try {
      const response = await fetch("components/mobile-navbar.html")
      const mobileNavbarHtml = await response.text()
      mobileNavbarPlaceholder.innerHTML = mobileNavbarHtml
      
    
      if (typeof initializeMobileNavbar === 'function') {
        initializeMobileNavbar()
      }
    } catch (error) {
      console.error("Error loading mobile navbar:", error)
    }
  }

   
  initializeCommonScripts()

 
  const footerPlaceholder = document.getElementById("footer-placeholder")
  if (footerPlaceholder) {
    try {
      const response = await fetch("components/footer.html")
      const footerHtml = await response.text()
      footerPlaceholder.innerHTML = footerHtml
     
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
