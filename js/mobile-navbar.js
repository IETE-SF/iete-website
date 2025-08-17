// Mobile Navigation JavaScript

class MobileNavbar {
  constructor() {
    this.mobileNavbar = null;
    this.mobileNavOverlay = null;
    this.mobileNavToggle = null;
    this.mobileNavClose = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupElements());
    } else {
      this.setupElements();
    }
  }

  setupElements() {
    // Get mobile navigation elements
    this.mobileNavbar = document.getElementById('mobile-navbar');
    this.mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    this.mobileNavToggle = document.getElementById('nav-toggle');
    this.mobileNavClose = document.getElementById('mobile-nav-close');

    if (this.mobileNavbar && this.mobileNavToggle) {
      this.bindEvents();
      this.setActiveNavLink();
    }
  }

  bindEvents() {
    // Toggle mobile navigation
    this.mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close mobile navigation
    if (this.mobileNavClose) {
      this.mobileNavClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.close();
      });
    }

    // Close on overlay click
    if (this.mobileNavOverlay) {
      this.mobileNavOverlay.addEventListener('click', () => {
        this.close();
      });
    }

    // Close on navigation link click
    const navLinks = this.mobileNavbar.querySelectorAll('.mobile-nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.close();
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && 
          !this.mobileNavbar.contains(e.target) && 
          !this.mobileNavToggle.contains(e.target)) {
        this.close();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.close();
      }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Prevent body scroll when mobile nav is open
    this.mobileNavbar.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: true });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.mobileNavbar.classList.add('active');
    this.mobileNavToggle.classList.add('active');
    
    if (this.mobileNavOverlay) {
      this.mobileNavOverlay.classList.add('active');
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add animation class
    this.mobileNavbar.style.animation = 'slideInLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Focus management
    this.trapFocus();
  }

  close() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.mobileNavbar.classList.remove('active');
    this.mobileNavToggle.classList.remove('active');
    
    if (this.mobileNavOverlay) {
      this.mobileNavOverlay.classList.remove('active');
    }

    // Restore body scroll
    document.body.style.overflow = '';
    
    // Add closing animation
    this.mobileNavbar.style.animation = 'slideOutLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Remove focus trap
    this.removeFocusTrap();
  }

  trapFocus() {
    const focusableElements = this.mobileNavbar.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus the close button initially
    if (this.mobileNavClose) {
      this.mobileNavClose.focus();
    }

    this.handleFocusTrap = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', this.handleFocusTrap);
  }

  removeFocusTrap() {
    if (this.handleFocusTrap) {
      document.removeEventListener('keydown', this.handleFocusTrap);
      this.handleFocusTrap = null;
    }
  }

  setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = this.mobileNavbar.querySelectorAll('.mobile-nav-link');

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === currentPath) {
        link.classList.add('active');
      }
    });
  }

  // Public method to update active link (useful for SPA-like navigation)
  updateActiveLink(page) {
    const navLinks = this.mobileNavbar.querySelectorAll('.mobile-nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-page') === page) {
        link.classList.add('active');
      }
    });
  }

  // Public method to check if mobile nav is open
  isNavOpen() {
    return this.isOpen;
  }

  // Public method to destroy the mobile navbar
  destroy() {
    if (this.isOpen) {
      this.close();
    }
    this.removeFocusTrap();
    // Remove event listeners would go here if needed
  }
}

// Initialize mobile navbar when script loads
let mobileNavbarInstance = null;

// Function to initialize mobile navbar
function initializeMobileNavbar() {
  if (!mobileNavbarInstance) {
    mobileNavbarInstance = new MobileNavbar();
  }
  return mobileNavbarInstance;
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMobileNavbar);
} else {
  initializeMobileNavbar();
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MobileNavbar, initializeMobileNavbar };
}
