/**
 * ATEF ASKLANDY PORTFOLIO — CENTRALIZED PROJECT DATA
 * Single source of truth for all projects.
 * Used by: index.html (featured preview), projects.html (full catalog), admin.html (management)
 */

const PROJECTS = [
  {
    id: "shopeasy",
    title: "ShopEasy Marketing Analytics",
    category: "data",
    categoryLabel: "E-Commerce & Marketing Analytics",
    description: "Helped an e-commerce brand find out exactly why they were losing sales. I built an interactive dashboard that tracked customer behavior, leading to clear strategies that stopped the drop in sales and improved customer satisfaction.",
    coverImage: "assets/shopeasy_cover.jpg",
    tools: ["SQL", "Power BI", "Python", "KPI Architecture", "Sentiment Analysis"],
    metrics: [
      { value: "8.5%", label: "Avg Conversion" },
      { value: "2.98M", label: "Impressions" },
      { value: "357", label: "Reviews Analyzed" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/shopeasy.html",
    order: 1
  },
  {
    id: "triple-seven",
    title: "Triple Seven Strategic System",
    category: "systems",
    categoryLabel: "Systems & Software Architecture",
    description: "Built a complete, highly secure management system for gaming lounges. It gives the owners 100% control over their business, tracks profits in real-time, and prevents any financial leaks during employee shifts.",
    coverImage: "assets/triple_seven_cover.jpg",
    tools: ["JavaScript", "PHP", "MySQL", "Tailscale", "System Architecture"],
    metrics: [
      { value: "100%", label: "Custom Built" },
      { value: "Live", label: "P&L Sync" },
      { value: "Secured", label: "Tailnet VPN" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/triple-seven.html",
    order: 2
  },
  {
    id: "foush",
    title: "FOUSH Restaurant POS",
    category: "systems",
    categoryLabel: "Systems & Software Architecture",
    description: "Created a smart Point of Sale (POS) system for restaurants that never stops working, even if the internet disconnects. It speeds up orders between the waiters and the kitchen, and lets the owner monitor profits live from anywhere.",
    coverImage: "assets/foush_real_cover.png",
    tools: ["JavaScript", "Node.js", "Firebase", "PWA", "ESC/POS", "WebSockets"],
    metrics: [
      { value: "100%", label: "Offline-First" },
      { value: "5", label: "Role Portals" },
      { value: "Live", label: "Cloud Sync" }
    ],
    featured: true,
    status: "completed",
    caseStudyUrl: "projects/foush.html",
    order: 3
  },
  {
    id: "customer-behavior",
    title: "Customer Shopping Behavior",
    category: "data",
    categoryLabel: "Data & Analytics",
    description: "Analyzed data from thousands of purchases to help a retail business understand what makes customers come back. The insights helped the business target the right age groups and build effective customer loyalty programs.",
    coverImage: "assets/customer_behavior_cover.jpg",
    tools: ["Python", "Pandas", "PostgreSQL", "SQL", "Power BI"],
    metrics: [
      { value: "3,900", label: "Transactions Analyzed" },
      { value: "5", label: "Key Business Strategies" }
    ],
    featured: false,
    status: "completed",
    caseStudyUrl: "projects/customer-behavior.html",
    order: 4
  }
];

/**
 * Render a single project card HTML from project data.
 * @param {Object} project - Project data object
 * @param {string} basePath - Base path prefix for assets/links (e.g., "" for root, "../" for subfolders)
 * @returns {string} HTML string
 */
function renderProjectCard(project, basePath = "") {
  const metricsHtml = project.metrics.length > 0
    ? `<div class="card-metrics-strip">
        ${project.metrics.map(m => `
          <div class="metric-pill">
            <span class="m-val">${m.value}</span>
            <span class="m-lbl">${m.label}</span>
          </div>
        `).join("")}
       </div>`
    : "";

  const toolsHtml = project.tools.length > 0
    ? `<div class="card-tools">
        ${project.tools.map(t => `<span class="tool-tag">${t}</span>`).join("")}
       </div>`
    : "";

  const ctaHtml = project.status === "completed" && project.caseStudyUrl
    ? `<a href="${basePath}${project.caseStudyUrl}" class="btn btn-primary" style="width: 100%;">
        View Case Study
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
       </a>`
    : `<span class="btn btn-secondary" style="width: 100%; cursor: default; opacity: 0.6;">Coming Soon</span>`;

  return `
    <article class="project-card" data-category="${project.category}" data-id="${project.id}">
      <div class="grid-cover-wrapper">
        <img src="${basePath}${project.coverImage}" alt="${project.title}" class="grid-cover" loading="lazy">
      </div>
      <div class="grid-content">
        <div class="grid-meta">
          <span class="badge badge-primary">${project.categoryLabel}</span>
        </div>
        <h3 class="grid-title">${project.title}</h3>
        <p class="grid-summary">${project.description}</p>
        ${metricsHtml}
        ${toolsHtml}
        <div class="grid-footer">
          ${ctaHtml}
        </div>
      </div>
    </article>
  `;
}

/**
 * Get projects, merging defaults with any localStorage overrides.
 */
function getProjects() {
  const stored = localStorage.getItem("portfolio_projects");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return PROJECTS;
    }
  }
  return PROJECTS;
}

/**
 * Save projects to localStorage.
 */
function saveProjects(projects) {
  localStorage.setItem("portfolio_projects", JSON.stringify(projects));
}
