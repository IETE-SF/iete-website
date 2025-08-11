document.addEventListener("DOMContentLoaded", () => {
  // Filter Functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  const eventCards = document.querySelectorAll(".event-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      const filterValue = button.getAttribute("data-filter")

      eventCards.forEach((card) => {
        card.classList.add("filtering")

        if (filterValue === "all") {
          card.classList.remove("hidden", "fade-out")
          card.classList.add("fade-in")
        } else {
          const cardCategory = card.getAttribute("data-category")
          if (cardCategory === filterValue) {
            card.classList.remove("hidden", "fade-out")
            card.classList.add("fade-in")
          } else {
            card.classList.add("fade-out")
            setTimeout(() => {
              card.classList.add("hidden")
              card.classList.remove("fade-out")
            }, 300)
          }
        }
      })

      // Remove filtering class after animation
      setTimeout(() => {
        eventCards.forEach((card) => {
          card.classList.remove("filtering", "fade-in")
        })
      }, 500)
    })
  })

  // Load More Functionality
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  let visibleEvents = 6
  const totalEvents = eventCards.length

  // Initially hide events beyond the first 6
  function initializeEventDisplay() {
    eventCards.forEach((card, index) => {
      if (index >= visibleEvents) {
        card.style.display = "none"
      }
    })

    if (totalEvents <= visibleEvents) {
      if (loadMoreBtn) loadMoreBtn.style.display = "none"
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const hiddenEvents = Array.from(eventCards).filter((card) => card.style.display === "none")
      const eventsToShow = hiddenEvents.slice(0, 3)

      eventsToShow.forEach((card, index) => {
        setTimeout(() => {
          card.style.display = "block"
          card.style.opacity = "0"
          card.style.transform = "translateY(30px)"

          setTimeout(() => {
            card.style.transition = "all 0.6s ease"
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 50)
        }, index * 100)
      })

      visibleEvents += eventsToShow.length

      if (visibleEvents >= totalEvents) {
        loadMoreBtn.textContent = "All Events Loaded"
        loadMoreBtn.disabled = true
      }
    })
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
  initializeEventDisplay()

  const animatedElements = document.querySelectorAll(".event-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Event card hover effects
  const eventCardsForHover = document.querySelectorAll(".event-card")

  eventCardsForHover.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Event card click handling
  eventCards.forEach((card) => {
    const learnMoreBtn = card.querySelector(".btn-primary")
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const eventTitle = card.querySelector(".event-title").textContent
        console.log(`Learn more about: ${eventTitle}`)
        // Here you can add modal functionality or navigation to detailed event page
      })
    }
  })
})
