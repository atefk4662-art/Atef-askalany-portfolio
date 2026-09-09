/**
 * ATEF ELASKLANY PORTFOLIO — CORE APPLICATION SCRIPT
 * Handles:
 * 1. Dynamic Project Rendering & Filtering (Homepage + Projects Page)
 * 2. IntersectionObserver for Scroll-Reveal Animations
 * 3. Active Nav Link Tracking on Scroll
 * 4. Mobile Navigation Drawer Toggle
 * 5. Case Study Interactive Tabs Simulation
 * 6. Smooth Anchor Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  /* -----------------------------------------------------------
     1. Dynamic Project Rendering & Filtering
  ----------------------------------------------------------- */
  const featuredGrid = document.getElementById('featured-projects-grid');
  const allGrid = document.getElementById('all-projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  let currentProjects = typeof getProjects === 'function' ? getProjects() : [];
  currentProjects.sort((a, b) => a.order - b.order);

  // Render Homepage Featured Projects
  if (featuredGrid) {
    const featuredProjects = currentProjects.filter(p => p.featured);
    featuredGrid.innerHTML = featuredProjects.map(p => typeof renderProjectCard === 'function' ? renderProjectCard(p, "") : "").join("");
  }

  // Render Projects Page Catalog
  if (allGrid) {
    allGrid.innerHTML = currentProjects.map(p => typeof renderProjectCard === 'function' ? renderProjectCard(p, "") : "").join("");
  }

  // Setup Filtering (on Projects page)
  if (filterBtns.length > 0 && allGrid) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        const cards = allGrid.querySelectorAll('.project-card');
        
        cards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /* -----------------------------------------------------------
     2. Scroll-Reveal Animations (Intersection Observer)
  ----------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* -----------------------------------------------------------
     3. Active Nav Link Tracking on Scroll
  ----------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPosition = window.pageYOffset + 140;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href === `#${currentSectionId}` || href === `index.html#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* -----------------------------------------------------------
     4. Mobile Navigation Drawer Toggle
  ----------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });

    // Close mobile menu when a nav link is clicked
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }

  /* -----------------------------------------------------------
     5. Case Study Dashboard Tabs Simulation
  ----------------------------------------------------------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        
        const targetId = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  /* -----------------------------------------------------------
     6. Smooth Scrolling for Internal Anchor Links
  ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
