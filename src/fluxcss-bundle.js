/**
 * FluxCSS Components - v0.1.0-beta
 * Interactive components that work with the FluxCSS framework
 * Copyright 2025 FluxCSS.org
 */
(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Carousels
    initCarousels();

    // Initialize Navbars
    initNavbars();

    // Initialize Sidenavs
    initSidenavs();

    // Initialize Back to Top buttons
    initBackToTop();

    // Initialize Dropdowns
    initDropdowns();

    // Initialize Modals
    initModals();

    // Initialize Steppers
    initSteppers();
  });

  /**
   * Initialize all carousels on the page
   */
  function initCarousels() {
    // Select all carousels on the page
    const carousels = document.querySelectorAll('.carousel');

    // If no carousels found, exit early
    if (carousels.length === 0) return;

    // Initialize each carousel
    carousels.forEach(function(carousel) {
      const elements = carousel.querySelectorAll('.element');
      const indicators = carousel.querySelectorAll('.indicator');
      const prevBtn = carousel.querySelector('.chevron-left');
      const nextBtn = carousel.querySelector('.chevron-right');

      // If no carousel elements found, exit early for this carousel
      if (elements.length === 0) return;

      // Set initial state
      let currentIndex = 0;
      let intervalId = null;
      const autoplay = carousel.hasAttribute('data-autoplay');
      const pauseOnHover = carousel.hasAttribute('data-pause-on-hover');
      const interval = carousel.dataset.interval ? parseInt(carousel.dataset.interval) : 5000;

      // Function to show a specific element
      function showElement(index) {
        // Hide all elements
        elements.forEach(element => {
          element.classList.remove('active');
        });

        // Deactivate all indicators
        indicators.forEach(indicator => {
          indicator.classList.remove('active');
        });

        // Show the selected element and indicator
        elements[index].classList.add('active');
        if (indicators[index]) {
          indicators[index].classList.add('active');
        }

        // Update current index
        currentIndex = index;
      }

      // Function to show next element
      function nextElement() {
        const newIndex = (currentIndex + 1) % elements.length;
        showElement(newIndex);
      }

      // Function to show previous element
      function prevElement() {
        const newIndex = (currentIndex - 1 + elements.length) % elements.length;
        showElement(newIndex);
      }

      // Function to start autoplay
      function startAutoplay() {
        if (intervalId) {
          clearInterval(intervalId);
        }

        intervalId = setInterval(function() {
          nextElement();
        }, interval);
      }

      // Function to reset autoplay
      function resetAutoplay() {
        if (autoplay && intervalId) {
          clearInterval(intervalId);
          startAutoplay();
        }
      }

      // Add event listeners to navigation buttons
      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          prevElement();
          resetAutoplay();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          nextElement();
          resetAutoplay();
        });
      }

      // Add event listeners to indicators
      indicators.forEach(function(indicator, index) {
        indicator.addEventListener('click', function() {
          showElement(index);
          resetAutoplay();
        });
      });

      // Add touch swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
          // Swipe left
          nextElement();
          resetAutoplay();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          // Swipe right
          prevElement();
          resetAutoplay();
        }
      }

      // Add keyboard navigation
      carousel.tabIndex = 0;
      carousel.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          prevElement();
          resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          nextElement();
          resetAutoplay();
        }
      });

      // Add pause on hover
      if (pauseOnHover) {
        carousel.addEventListener('mouseenter', function() {
          if (intervalId) {
            clearInterval(intervalId);
          }
        });

        carousel.addEventListener('mouseleave', function() {
          if (autoplay) {
            startAutoplay();
          }
        });
      }

      // Initialize the carousel
      showElement(0);

      // Start autoplay if enabled
      if (autoplay) {
        startAutoplay();
      }
    });
  }

  /**
   * Initialize all navbars on the page
   */
  function initNavbars() {
    // Select all burger menus on the page
    const burgerMenus = document.querySelectorAll('.burger-menu');

    // If no burger menus found, exit early
    if (burgerMenus.length === 0) return;

    // Add click event listener to each burger menu
    burgerMenus.forEach(function(burgerMenu) {
      const navbar = burgerMenu.closest('.navbar');
      const navList = navbar.querySelector('.nav-list');

      if (!navList || !navList.classList.contains('nav-list')) return;

      // Toggle the 'open' class on the nav-list when burger is clicked
      burgerMenu.addEventListener('click', function() {
        navList.classList.toggle('open');
        this.classList.toggle('open');

      });

      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!burgerMenu.contains(event.target) && !navList.contains(event.target)) {
          navList.classList.remove('open');
          burgerMenu.classList.remove('open');
        }
      });

      // Close menu when a nav item is clicked
      const navItems = navList.querySelectorAll('.nav-item');
      navItems.forEach(function(navItem) {
        navItem.addEventListener('click', function() {
          navList.classList.remove('open');
          burgerMenu.classList.remove('open');
        });
      });

      // Handle keyboard navigation
      burgerMenu.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          burgerMenu.click();
        }
      });

      // Close menu when Escape key is pressed
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navList.classList.contains('open')) {
          navList.classList.remove('open');
          burgerMenu.classList.remove('open');
        }
      });
    });

    // Handle window resize to reset menu state on larger screens
    window.addEventListener('resize', function() {
      const burgerMenus = document.querySelectorAll('.burger-menu');
      burgerMenus.forEach(function(burgerMenu) {
        const navList = burgerMenu.nextElementSibling;
        if (!navList || !navList.classList.contains('nav-list')) return;

        // If window is wider than the breakpoint and menu is hidden
        if (window.getComputedStyle(burgerMenu).display === 'none' && navList.classList.contains('open')) {
          navList.classList.remove('open');
          burgerMenu.classList.remove('open');
        }
      });
    });
  }

  /**
   * Initialize all sidenavs on the page
   */
  function initSidenavs() {
    // Select all sidenav toggles on the page
    const sidenavToggles = document.querySelectorAll('.sidenav-toggle');

    // If no sidenav toggles found, exit early
    if (sidenavToggles.length === 0) return;

    // Add click event listener to each sidenav toggle
    sidenavToggles.forEach(function(toggle) {
      const container = toggle.closest('.sidenav-container');
      if (!container) return;

      const sidenav = container.querySelector('.sidenav');
      const sidenavClose = container.querySelector('.sidenav-close');

      if (!sidenav) return;

      // Toggle the 'open' class on the sidenav when toggle is clicked
      toggle.addEventListener('click', function() {
        sidenav.classList.toggle('open');
        toggle.classList.toggle('open');

        // Animate burger icon to X when opened
        const burgerIcons = toggle.querySelectorAll('.burger-icon');
        if (burgerIcons.length > 0) {
          if (sidenav.classList.contains('open')) {
            burgerIcons[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            burgerIcons[1].style.opacity = '0';
            burgerIcons[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
          } else {
            burgerIcons[0].style.transform = 'none';
            burgerIcons[1].style.opacity = '1';
            burgerIcons[2].style.transform = 'none';
          }
        }
      });

      // Close sidenav when close button is clicked
      if (sidenavClose) {
        sidenavClose.addEventListener('click', function() {
          sidenav.classList.remove('open');
          toggle.classList.remove('open');

          // Reset burger icon animation
          const burgerIcons = toggle.querySelectorAll('.burger-icon');
          if (burgerIcons.length > 0) {
            burgerIcons[0].style.transform = 'none';
            burgerIcons[1].style.opacity = '1';
            burgerIcons[2].style.transform = 'none';
          }
        });
      }

      // Close sidenav when clicking outside
      document.addEventListener('click', function(event) {
        if (!sidenav.contains(event.target) && !toggle.contains(event.target)) {
          if (sidenav.classList.contains('open')) {
            sidenav.classList.remove('open');
            toggle.classList.remove('open');

            // Reset burger icon animation
            const burgerIcons = toggle.querySelectorAll('.burger-icon');
            if (burgerIcons.length > 0) {
              burgerIcons[0].style.transform = 'none';
              burgerIcons[1].style.opacity = '1';
              burgerIcons[2].style.transform = 'none';
            }
          }
        }
      });

      // Handle keyboard navigation
      toggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle.click();
        }
      });

      // Close sidenav when Escape key is pressed
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sidenav.classList.contains('open')) {
          sidenav.classList.remove('open');
          toggle.classList.remove('open');

          // Reset burger icon animation
          const burgerIcons = toggle.querySelectorAll('.burger-icon');
          if (burgerIcons.length > 0) {
            burgerIcons[0].style.transform = 'none';
            burgerIcons[1].style.opacity = '1';
            burgerIcons[2].style.transform = 'none';
          }
        }
      });
    });

    // Handle window resize to reset sidenav state on larger screens
    window.addEventListener('resize', function() {
      const sidenavToggles = document.querySelectorAll('.sidenav-toggle');
      sidenavToggles.forEach(function(toggle) {
        // If toggle is hidden (on desktop) and sidenav is open
        if (window.getComputedStyle(toggle).display === 'none') {
          const container = toggle.closest('.sidenav-container');
          if (!container) return;

          const sidenav = container.querySelector('.sidenav');
          if (!sidenav) return;

          // Reset burger icon animation
          const burgerIcons = toggle.querySelectorAll('.burger-icon');
          if (burgerIcons.length > 0) {
            burgerIcons[0].style.transform = 'none';
            burgerIcons[1].style.opacity = '1';
            burgerIcons[2].style.transform = 'none';
          }
        }
      });
    });
  }
  /**
   * Initialize all back-to-top buttons on the page
   */
  function initBackToTop() {
    // Select all back-to-top buttons on the page
    const backToTopButtons = document.querySelectorAll('.back-to-top');

    // If no back-to-top buttons found, exit early
    if (backToTopButtons.length === 0) return;

    // Show button when page is scrolled down
    const scrollThreshold = 300; // Show button after scrolling down 300px

    // Function to check scroll position and toggle button visibility
    function toggleBackToTopVisibility() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      backToTopButtons.forEach(function (button) {
        if (scrollTop > scrollThreshold) {
          button.classList.add('show');
        } else {
          button.classList.remove('show');
        }
      });
    }

    // Add scroll event listener
    window.addEventListener('scroll', toggleBackToTopVisibility);

    // Add click event listener to each back-to-top button
    backToTopButtons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

      // Add keyboard accessibility
      button.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      });
    });

    // Initial check for button visibility (in case page is already scrolled)
    toggleBackToTopVisibility();
  }
  /**
   * Initialize all dropdowns on the page
   */
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown, .dropup, .dropright, .dropleft');

    dropdowns.forEach(function(dropdown) {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');

      if (!toggle || !menu) return;

      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(dropdown);
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
          closeDropdown(dropdown);
        }
      });

      // Handle keyboard navigation
      menu.addEventListener('keydown', function(e) {
        handleKeyboardNavigation(e, dropdown);
      });
    });
  }

  /**
   * Toggle dropdown visibility
   */
  function toggleDropdown(dropdown) {
    const menu = dropdown.querySelector('.dropdown-menu');
    const isOpen = menu.classList.contains('show');

    // Close all other dropdowns first
    document.querySelectorAll('.dropdown-menu.show').forEach(function(openMenu) {
      if (openMenu !== menu) {
        openMenu.classList.remove('show');
        openMenu.parentNode.setAttribute('aria-expanded', 'false');
      }
    });

    if (isOpen) {
      closeDropdown(dropdown);
    } else {
      openDropdown(dropdown);
    }
  }

  /**
   * Open dropdown
   */
  function openDropdown(dropdown) {
    const menu = dropdown.querySelector('.dropdown-menu');
    const toggle = dropdown.querySelector('.dropdown-toggle');

    menu.classList.add('show');
    dropdown.setAttribute('aria-expanded', 'true');

    // Focus first menu item
    const firstItem = menu.querySelector('.dropdown-item:not(.disabled)');
    if (firstItem) firstItem.focus();
  }

  /**
   * Close dropdown
   */
  function closeDropdown(dropdown) {
    const menu = dropdown.querySelector('.dropdown-menu');
    menu.classList.remove('show');
    dropdown.setAttribute('aria-expanded', 'false');
  }

  /**
   * Handle keyboard navigation within dropdown
   */
  function handleKeyboardNavigation(e, dropdown) {
    const menu = dropdown.querySelector('.dropdown-menu');
    const items = menu.querySelectorAll('.dropdown-item:not(.disabled)');
    const currentIndex = Array.from(items).indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < items.length - 1) {
          items[currentIndex + 1].focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          items[currentIndex - 1].focus();
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeDropdown(dropdown);
        dropdown.querySelector('.dropdown-toggle').focus();
        break;
    }
  }

  /**
   * Initialize all modals on the page
   */
  function initModals() {
    // Select all modal triggers
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalCloseButtons = document.querySelectorAll('[data-modal-close]');

    // If no modal triggers found, exit early
    if (modalTriggers.length === 0) return;

    // Add click event listener to each modal trigger
    modalTriggers.forEach(function(trigger) {
      const modalId = trigger.getAttribute('data-modal-target');
      const modal = document.querySelector(modalId);

      if (!modal) return;

      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        openModal(modal);
      });
    });

    // Add click event listener to each close button
    modalCloseButtons.forEach(function(button) {
      const modal = button.closest('.modal');

      if (!modal) return;

      button.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(modal);
      });
    });

    // Close modal when clicking on backdrop
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal') && e.target.classList.contains('show')) {
        closeModal(e.target);
      }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
          closeModal(openModal);
        }
      }
    });

    // Function to open modal
    function openModal(modal) {
      const backdrop = document.createElement('div');
      backdrop.classList.add('modal-backdrop');
      document.body.appendChild(backdrop);

      // Prevent body scrolling
      document.body.style.overflow = 'hidden';

      // Add show class with slight delay for animation
      setTimeout(function() {
        modal.classList.add('show');
      }, 10);
    }

    // Function to close modal
    function closeModal(modal) {
      modal.classList.remove('show');

      // Remove backdrop and restore body scrolling after animation completes
      setTimeout(function() {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        document.body.style.overflow = '';
      }, 300); // Match the CSS transition duration
    }
  }
  /**
   * Initialize all steppers on the page
   */
  function initSteppers() {
    // Select all steppers on the page
    const steppers = document.querySelectorAll('.stepper');

    // If no steppers found, exit early
    if (steppers.length === 0) return;

    // Initialize each stepper
    steppers.forEach(function(stepper) {
      const steps = stepper.querySelectorAll('.step');
      const stepContents = stepper.querySelectorAll('.step-content');

      // If no steps found, exit early for this stepper
      if (steps.length === 0) return;

      // Set initial state
      let currentIndex = 0;

      // Function to show a specific step content
      function showStepContent(index) {
        // Hide all step contents
        stepContents.forEach(content => {
          content.classList.remove('active');
        });

        // Deactivate all steps
        steps.forEach(step => {
          step.classList.remove('active');
          step.classList.remove('completed');
        });

        // Show the selected step content and activate the corresponding step
        stepContents[index].classList.add('active');
        steps[index].classList.add('active');

        // Mark previous steps as completed
        for (let i = 0; i < index; i++) {
          steps[i].classList.add('completed');
        }

        // Update current index
        currentIndex = index;
      }

      // Function to show next step content
      function nextStep() {
        if (currentIndex < steps.length - 1) {
          showStepContent(currentIndex + 1);
        }
      }

      // Function to show previous step content
      function prevStep() {
        if (currentIndex > 0) {
          showStepContent(currentIndex - 1);
        }
      }

      // Add click event listeners to steps
      steps.forEach(function(step, index) {
        step.addEventListener('click', function() {
          showStepContent(index);
        });
      });

      // Add keyboard navigation
      stepper.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          prevStep();
        } else if (e.key === 'ArrowRight') {
          nextStep();
        }
      });

      // Initialize the stepper
      showStepContent(0);
    });
  }

})();
