document.addEventListener("DOMContentLoaded", () => {
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
  const animatedElements = document.querySelectorAll(".member-card, .faculty-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Member card hover effects
  const memberCards = document.querySelectorAll(".member-card")

  memberCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-12px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Year button active state management
  const currentPage = window.location.pathname.split("/").pop()
  const yearButtons = document.querySelectorAll(".year-btn")

  yearButtons.forEach((btn) => {
    const btnHref = btn.getAttribute("href")
    if (btnHref === currentPage) {
      btn.classList.add("active")
    } else {
      btn.classList.remove("active")
    }
  })
})
