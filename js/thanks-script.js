document.addEventListener("DOMContentLoaded", () => {
  // Loading Screen
  const loadingScreen = document.getElementById("loadingScreen")
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1000)
  }

  // Contributor card hover effects
  const contributorCards = document.querySelectorAll(".contributor-card")

  contributorCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-12px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
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
  const animatedElements = document.querySelectorAll(".contributor-card, .appreciation-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
