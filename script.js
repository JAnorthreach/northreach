const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
if (menuBtn) {
  menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
}

document
  .querySelectorAll("[data-year]")
  .forEach((el) => (el.textContent = new Date().getFullYear()));

function opportunityCard(item) {
  return `<article class="property-card" data-category="${item.category}">
  <a href="opportunity.html?slug=${item.slug}">
   <div class="property-image"><img src="${item.image}" alt="${item.title}"></div>
   <div class="property-body">
    <div class="tag-row"><span class="tag">${item.category}</span><span class="tag status">${item.status}</span></div>
    <h3 class="property-title">${item.title}</h3>
    <div class="property-meta">${item.location}</div>
    <div class="property-stats"><div><span>Strategy</span><strong>${item.strategy}</strong></div><div><span>Target Timeline</span><strong>${item.timeline}</strong></div></div>
   </div>
  </a>
 </article>`;
}
function projectCard(item) {
  return `<article class="property-card">
  <a href="project.html?slug=${item.slug}">
   <div class="property-image"><img src="${item.image}" alt="${item.title}"></div>
   <div class="property-body">
    <div class="tag-row"><span class="tag">${item.category}</span><span class="tag status">${item.status}</span></div>
    <h3 class="property-title">${item.title}</h3>
    <div class="property-meta">${item.location}</div>
    <div class="property-stats"><div><span>NorthReach Role</span><strong>${item.role}</strong></div></div>
   </div>
  </a>
 </article>`;
}
const oppGrid = document.querySelector("#opportunity-grid");
if (oppGrid)
  oppGrid.innerHTML = window.NORTHREACH_DATA.opportunities
    .map(opportunityCard)
    .join("");
const projectGrid = document.querySelector("#project-grid");
if (projectGrid)
  projectGrid.innerHTML = window.NORTHREACH_DATA.projects
    .map(projectCard)
    .join("");

const filters = document.querySelectorAll(".filter-btn");
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document
      .querySelectorAll("#opportunity-grid .property-card")
      .forEach((card) => {
        card.style.display =
          filter === "All" || card.dataset.category === filter
            ? "block"
            : "none";
      });
  }),
);

function getSlug() {
  return new URLSearchParams(location.search).get("slug");
}
const oppDetail = document.querySelector("#opportunity-detail");
if (oppDetail) {
  const item =
    window.NORTHREACH_DATA.opportunities.find((x) => x.slug === getSlug()) ||
    window.NORTHREACH_DATA.opportunities[0];
  oppDetail.innerHTML = `
 <section class="detail-hero"><div class="detail-copy"><div class="eyebrow">${item.category}</div><h1>${item.title}</h1><p>${item.summary}</p><div class="detail-kpis"><div><span>Status</span><strong>${item.status}</strong></div><div><span>Location</span><strong>${item.location}</strong></div><div><span>Target Timeline</span><strong>${item.timeline}</strong></div></div></div><div class="detail-media"><img src="${item.image}" alt="${item.title}"></div></section>
 <section class="section"><div class="container content-grid"><main><div class="eyebrow">Opportunity Overview</div><h2 class="section-title">Structured for disciplined execution.</h2><p class="section-copy">NorthReach evaluates the market, investment basis, execution requirements and exit strategy before presenting an opportunity.</p><div class="notice">Exact addresses, financial projections and offering materials may be restricted until an interested party completes the inquiry process.</div><h3>Investment Strategy</h3><p>${item.strategy}</p><h3>NorthReach Role</h3><p>Opportunity sourcing, underwriting, deal structuring, design and consultant coordination, development oversight and exit planning.</p></main><aside class="sidebar"><div class="eyebrow">Request Information</div><h3>Discuss this opportunity</h3><p>Contact <a href="mailto:info@northreach.us">info@northreach.us</a> to request additional information.</p></aside></div></section>`;
}
const projectDetail = document.querySelector("#project-detail");
if (projectDetail) {
  const item =
    window.NORTHREACH_DATA.projects.find((x) => x.slug === getSlug()) ||
    window.NORTHREACH_DATA.projects[0];
  projectDetail.innerHTML = `<section class="detail-hero"><div class="detail-copy"><div class="eyebrow">${item.category}</div><h1>${item.title}</h1><p>${item.summary}</p><div class="detail-kpis"><div><span>Status</span><strong>${item.status}</strong></div><div><span>Location</span><strong>${item.location}</strong></div><div><span>Role</span><strong>${item.role}</strong></div></div></div><div class="detail-media"><img src="${item.image}" alt="${item.title}"></div></section><section class="section"><div class="container"><div class="eyebrow">Project Story</div><h2 class="section-title">From opportunity to completed asset.</h2><p class="section-copy">NorthReach coordinates strategy, underwriting, technical planning and execution oversight to keep the project aligned with its investment objectives.</p></div></section>`;
}

const projectTabs = document.querySelectorAll(".project-tab");
projectTabs.forEach((btn) =>
  btn.addEventListener("click", () => {
    projectTabs.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.remove("active"));
    const panel = document.querySelector(`#${btn.dataset.tab}-panel`);
    if (panel) panel.classList.add("active");
    history.replaceState(
      null,
      "",
      btn.dataset.tab === "opportunities" ? "#opportunities" : "#projects",
    );
  }),
);
if (location.hash === "#opportunities") {
  document.querySelector('[data-tab="opportunities"]')?.click();
}
document.querySelectorAll("[data-project-filter]").forEach((btn) =>
  btn.addEventListener("click", () => {
    document
      .querySelectorAll("[data-project-filter]")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.projectFilter;
    document
      .querySelectorAll("#project-grid .property-card")
      .forEach((card, i) => {
        const item = window.NORTHREACH_DATA.projects[i];
        card.style.display =
          f === "All" || item.status === f ? "block" : "none";
      });
  }),
);
