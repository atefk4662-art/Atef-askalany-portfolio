/**
 * ATEF ASKLANDY PORTFOLIO — CORE APPLICATION SCRIPT
 * Handles:
 * 1. Interactive tabs for the 4-tier BI dashboard ecosystem (in Case Studies)
 * 2. Smooth anchor scrolling across sections
 */

document.addEventListener('DOMContentLoaded', () => {
  /* -----------------------------------------------------------
     1. Dynamic Project Rendering & Filtering
  ----------------------------------------------------------- */
  const featuredGrid = document.getElementById('featured-projects-grid');
  const allGrid = document.getElementById('all-projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  let currentProjects = typeof getProjects === 'function' ? getProjects() : [];
  // Sort by order
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
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
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
     2. Case Study Dashboard Tabs Simulation
  ----------------------------------------------------------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active from all tabs and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Add active to clicked tab
        btn.classList.add('active');
        
        // Show target panel
        const targetId = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
  }

  /* -----------------------------------------------------------
     3. Smooth Scrolling for Internal Links
  ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
