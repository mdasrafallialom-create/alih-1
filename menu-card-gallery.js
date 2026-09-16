// MENU CARD GALLERY - JAVASCRIPT

// 20+ Authentic Mock Template Datasets reflecting the user's uploaded design screenshots
const TEMPLATES_DATA = [
  {
    id: "template-001",
    name: "Borcelle Dark Gold Deluxe",
    category: "Luxury",
    styleCategory: "Dark",
    plan: "premium",
    bgStyle: "linear-gradient(135deg, #0d0d11 0%, #171822 100%)",
    headerColor: "#fbbf24",
    textColor: "#f8fafc",
    accentColor: "#d97706",
    restaurantTitle: "BORCELLE RESTAURANT",
    subTitle: "ELEGANT FINE DINING & COCKTAILS",
    layoutType: "circle-gold",
    dishes: [
      { name: "Truffle Beef Medallion", price: "$32.00", category: "MAINS", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80" },
      { name: "Seared Atlantic Salmon", price: "$28.50", category: "MAINS", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80" },
      { name: "Artisan Tiramisu", price: "$12.00", category: "DESSERTS", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&q=80" }
    ]
  },
  {
    id: "template-002",
    name: "Fauget Kitchen Blue Stamp",
    category: "Burger",
    styleCategory: "Fast Food",
    plan: "pro",
    bgStyle: "#1e3a8a",
    headerColor: "#ffffff",
    textColor: "#e0e7ff",
    accentColor: "#3b82f6",
    restaurantTitle: "FAUGET KITCHEN",
    subTitle: "DELICIOUS FRESH STREET FOOD",
    layoutType: "stamp-grid",
    dishes: [
      { name: "Crispy Chicken Combo", price: "$14.99", category: "POPULAR", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&q=80" },
      { name: "Smoky Bacon Burger", price: "$12.50", category: "POPULAR", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80" },
      { name: "Golden Loaded Fries", price: "$6.99", category: "SNACKS", img: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=300&q=80" }
    ]
  },
  {
    id: "template-003",
    name: "Fast Food Good Mood",
    category: "Fast Food",
    styleCategory: "Light",
    plan: "starter",
    bgStyle: "#ffffff",
    headerColor: "#15803d",
    textColor: "#1f2937",
    accentColor: "#22c55e",
    restaurantTitle: "GOOD FOOD GOOD MOOD",
    subTitle: "FRESH BURGERS & PIZZAS DAILY",
    layoutType: "clean-light",
    dishes: [
      { name: "BBQ Chicken Burger", price: "$9.00", category: "BURGERS", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&q=80" },
      { name: "Pepperoni Pizza Slice", price: "$11.50", category: "PIZZA", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300&q=80" },
      { name: "Fresh Caesar Salad", price: "$8.00", category: "SALADS", img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&q=80" }
    ]
  },
  {
    id: "template-004",
    name: "Rimberio Gold & Charcoal",
    category: "Luxury",
    styleCategory: "Dark",
    plan: "premium",
    bgStyle: "#121214",
    headerColor: "#f59e0b",
    textColor: "#f3f4f6",
    accentColor: "#ef4444",
    restaurantTitle: "RIMBERIO RESTAURANT",
    subTitle: "FAMILY • FOOD • FLAVOR",
    layoutType: "curved-gold",
    dishes: [
      { name: "Sizzling Ribeye Steak", price: "$34.00", category: "SPECIALS", img: "https://images.unsplash.com/photo-1558030006-450675393462?w=300&q=80" },
      { name: "Seafood Paella Deluxe", price: "$26.00", category: "SPECIALS", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&q=80" },
      { name: "Mango Citrus Smoothie", price: "$7.50", category: "DRINKS", img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&q=80" }
    ]
  },
  {
    id: "template-005",
    name: "Chalkboard Fried Chicken $42",
    category: "Fast Food",
    styleCategory: "Dark",
    plan: "pro",
    bgStyle: "#18181b",
    headerColor: "#ef4444",
    textColor: "#ffffff",
    accentColor: "#f59e0b",
    restaurantTitle: "CHALKBOARD CHICKEN & BURGER",
    subTitle: "HOT & CRISPY BUCKETS & DRAFTS",
    layoutType: "chalkboard",
    dishes: [
      { name: "Fried Chicken Bucket", price: "$42.00", category: "CHICKEN", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&q=80" },
      { name: "Double Beef Cheese Burger", price: "$15.00", category: "BURGERS", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80" },
      { name: "Cold Draft Beer", price: "$6.00", category: "DRINKS", img: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300&q=80" }
    ]
  },
  {
    id: "template-006",
    name: "Teal Asian Bowl & Karaage",
    category: "Minimal",
    styleCategory: "Light",
    plan: "starter",
    bgStyle: "#0f766e",
    headerColor: "#ffffff",
    textColor: "#ccfbf1",
    accentColor: "#f59e0b",
    restaurantTitle: "ASIAN BOWL & KARAAGE",
    subTitle: "AUTHENTIC ASIAN FLAVORS",
    layoutType: "teal-banner",
    dishes: [
      { name: "Traditional Bibimbap", price: "$16.00", category: "BOWLS", img: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300&q=80" },
      { name: "Crispy Chicken Karaage", price: "$12.00", category: "STARTERS", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&q=80" },
      { name: "Hydrating Coconut Water", price: "$4.50", category: "DRINKS", img: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300&q=80" }
    ]
  },
  {
    id: "template-007",
    name: "Red Spicy Hot 50% OFF",
    category: "Burger",
    styleCategory: "Dark",
    plan: "pro",
    bgStyle: "#7f1d1d",
    headerColor: "#fef08a",
    textColor: "#fef2f2",
    accentColor: "#eab308",
    restaurantTitle: "RED HOT CHILI MENU",
    subTitle: "SPECIAL 50% DISCOUNT TODAY",
    layoutType: "vibrant-red",
    dishes: [
      { name: "Spicy Tteokbokki Rice Cake", price: "$10.00", category: "HOT DISHES", img: "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?w=300&q=80" },
      { name: "Fiery Fireballs Skewers", price: "$8.50", category: "HOT DISHES", img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&q=80" }
    ]
  },
  {
    id: "template-008",
    name: "Atikul Coffee House & Bakery",
    category: "Cafe",
    styleCategory: "Light",
    plan: "starter",
    bgStyle: "#fef3c7",
    headerColor: "#78350f",
    textColor: "#451a03",
    accentColor: "#b45309",
    restaurantTitle: "COFFEE & BAKERY HOUSE",
    subTitle: "FRESHLY BREWED ESPRESSO & PASTRIES",
    layoutType: "warm-cafe",
    dishes: [
      { name: "Oat Milk Flat White", price: "$4.80", category: "SPECIALTY COFFEE", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80" },
      { name: "Iced Matcha Latte", price: "$5.50", category: "SPECIALTY COFFEE", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&q=80" },
      { name: "Almond Butter Croissant", price: "$4.20", category: "ARTISAN BAKERY", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&q=80" }
    ]
  },
  {
    id: "template-009",
    name: "Woodfired Pizza Bistro",
    category: "Pizza",
    styleCategory: "Dark",
    plan: "premium",
    bgStyle: "#1c1917",
    headerColor: "#f97316",
    textColor: "#f5f5f4",
    accentColor: "#ea580c",
    restaurantTitle: "WOODFIRED PIZZA BISTRO",
    subTitle: "AUTHENTIC NAPOLETANA OVEN PIZZA",
    layoutType: "dark-pizza",
    dishes: [
      { name: "Truffle Burrata Pizza", price: "$22.00", category: "PIZZA & PASTA", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80" },
      { name: "Tagliatelle Carbonara", price: "$18.50", category: "PIZZA & PASTA", img: "https://images.unsplash.com/photo-1621996346565-e3d5d6281288?w=300&q=80" }
    ]
  },
  {
    id: "template-010",
    name: "Tokyo Spicy Ramen House",
    category: "Minimal",
    styleCategory: "Dark",
    plan: "pro",
    bgStyle: "#09090b",
    headerColor: "#ef4444",
    textColor: "#faafa8",
    accentColor: "#f59e0b",
    restaurantTitle: "TOKYO RAMEN & GYOZA",
    subTitle: "SLURP THE RICH TONKOTSU BROTH",
    layoutType: "japanese-dark",
    dishes: [
      { name: "Spicy Tonkotsu Ramen", price: "$17.50", category: "RAMEN", img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=80" },
      { name: "Pan-Seared Pork Gyoza", price: "$8.00", category: "SIDES", img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&q=80" }
    ]
  },
  {
    id: "template-011",
    name: "Steakhouse Prime Ribeye",
    category: "Luxury",
    styleCategory: "Dark",
    plan: "premium",
    bgStyle: "#111827",
    headerColor: "#d97706",
    textColor: "#f9fafb",
    accentColor: "#f59e0b",
    restaurantTitle: "PRIME STEAKHOUSE",
    subTitle: "DRY-AGED BEEF & VINTAGE WINES",
    layoutType: "dark-gold",
    dishes: [
      { name: "45-Day Dry Aged Ribeye", price: "$48.00", category: "STEAKS", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80" },
      { name: "Bordeaux Cabernet Sauvignon", price: "$16.00", category: "WINES", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&q=80" }
    ]
  },
  {
    id: "template-012",
    name: "Ocean Catch Seafood Bar",
    category: "Minimal",
    styleCategory: "Light",
    plan: "starter",
    bgStyle: "#f0f9ff",
    headerColor: "#0369a1",
    textColor: "#0f172a",
    accentColor: "#0284c7",
    restaurantTitle: "OCEAN CATCH SEAFOOD",
    subTitle: "FRESH FROM THE BAY DAILY",
    layoutType: "ocean-light",
    dishes: [
      { name: "Wild Grilled Salmon", price: "$24.00", category: "SEAFOOD", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80" },
      { name: "Butter Garlic Oysters", price: "$18.00", category: "RAW BAR", img: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&q=80" }
    ]
  }
];

// STATE MANAGEMENT
let activeCategory = "All";
let activePlan = "All";
let currentSearchQuery = "";
let currentModalIndex = 0;
let filteredList = [...TEMPLATES_DATA];

// DOM ELEMENTS
const gridContainer = document.getElementById("menuCardGrid");
const resultsCountEl = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearch");
const categoryFiltersContainer = document.getElementById("categoryFilters");
const planFiltersContainer = document.getElementById("planFilters");

// MODAL ELEMENTS
const previewModal = document.getElementById("previewModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const modalCardPreview = document.getElementById("modalCardPreview");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalPlan = document.getElementById("modalPlan");
const modalUseBtn = document.getElementById("modalUseBtn");

// INITIALIZE GALLERY
function initGallery() {
  renderGrid();
  setupEventListeners();
}

// RENDER GRID CARDS
function renderGrid() {
  filteredList = TEMPLATES_DATA.filter((temp) => {
    // Category match
    if (activeCategory !== "All") {
      if (activeCategory === "Luxury" && temp.category !== "Luxury") return false;
      if (activeCategory === "Minimal" && temp.category !== "Minimal") return false;
      if (activeCategory === "Cafe" && temp.category !== "Cafe") return false;
      if (activeCategory === "Fast Food" && temp.category !== "Fast Food") return false;
      if (activeCategory === "Pizza" && temp.category !== "Pizza") return false;
      if (activeCategory === "Burger" && temp.category !== "Burger") return false;
      if (activeCategory === "Dark" && temp.styleCategory !== "Dark") return false;
      if (activeCategory === "Light" && temp.styleCategory !== "Light") return false;
    }

    // Plan match
    if (activePlan !== "All") {
      if (temp.plan !== activePlan) return false;
    }

    // Search query match
    if (currentSearchQuery.trim() !== "") {
      const q = currentSearchQuery.toLowerCase();
      const matchName = temp.name.toLowerCase().includes(q);
      const matchCat = temp.category.toLowerCase().includes(q);
      const matchTitle = temp.restaurantTitle.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchTitle) return false;
    }

    return true;
  });

  resultsCountEl.textContent = `Showing ${filteredList.length} designs`;
  gridContainer.innerHTML = "";

  if (filteredList.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #94a3b8;">
        <h3>No menu card designs found</h3>
        <p>Try resetting your search query or filters.</p>
      </div>
    `;
    return;
  }

  filteredList.forEach((template, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "gallery-card";

    // Build visual thumbnail stage HTML
    const posterHTML = createPosterCardHTML(template);

    cardEl.innerHTML = `
      <div class="card-poster-frame" data-index="${index}">
        <div class="poster-stage" style="background: ${template.bgStyle}; color: ${template.textColor}">
          ${posterHTML}
        </div>
        <div class="card-hover-overlay">
          <button class="btn-preview-quick" data-index="${index}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Preview
          </button>
          <button class="btn-use-quick" data-id="${template.id}">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            Use This Design
          </button>
        </div>
      </div>
      <div class="card-info-bar">
        <div class="info-text">
          <h3>${template.name}</h3>
          <p>${template.category} • ${template.styleCategory}</p>
        </div>
        <span class="badge-plan-tag plan-${template.plan}">${template.plan}</span>
      </div>
    `;

    gridContainer.appendChild(cardEl);
  });

  // Attach card click handlers
  document.querySelectorAll(".btn-preview-quick, .card-poster-frame").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(el.getAttribute("data-index") || "0", 10);
      openPreviewModal(idx);
    });
  });

  document.querySelectorAll(".btn-use-quick").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      redirectToStudio(id);
    });
  });
}

// CREATE POSTER STAGE HTML
function createPosterCardHTML(temp) {
  let dishesHTML = temp.dishes.map(d => `
    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px dashed rgba(255,255,255,0.15)">
      <div>
        <strong style="color: ${temp.headerColor}">${d.name}</strong>
      </div>
      <span style="font-weight: 800; color: ${temp.accentColor}">${d.price}</span>
    </div>
  `).join("");

  return `
    <div style="text-align: center; border-bottom: 2px solid ${temp.accentColor}; padding-bottom: 8px; margin-bottom: 8px;">
      <h2 style="font-family: 'Cinzel', serif; font-size: 15px; font-weight: 800; color: ${temp.headerColor}; letter-spacing: 0.5px;">${temp.restaurantTitle}</h2>
      <span style="font-size: 9px; letter-spacing: 1px; color: ${temp.textColor}; opacity: 0.8;">${temp.subTitle}</span>
    </div>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 8px;">
      <div style="width: 100%; height: 110px; border-radius: 12px; overflow: hidden; position: relative; border: 1px solid rgba(255,255,255,0.2)">
        <img src="${temp.dishes[0].img}" alt="dish" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div style="background: rgba(0,0,0,0.25); padding: 8px; border-radius: 8px;">
        ${dishesHTML}
      </div>
    </div>

    <div style="text-align: center; font-size: 9px; opacity: 0.7; margin-top: 6px;">
      📍 123 Gourmet Ave • 📞 (555) 019-2834
    </div>
  `;
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  // Category Filter clicks
  categoryFiltersContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-chip")) {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      e.target.classList.add("active");
      activeCategory = e.target.getAttribute("data-category") || "All";
      renderGrid();
    }
  });

  // Plan Filter clicks
  planFiltersContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("plan-chip")) {
      document.querySelectorAll(".plan-chip").forEach(p => p.classList.remove("active"));
      e.target.classList.add("active");
      activePlan = e.target.getAttribute("data-plan") || "All";
      renderGrid();
    }
  });

  // Search Input
  searchInput.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value;
    clearSearchBtn.style.display = currentSearchQuery ? "block" : "none";
    renderGrid();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    currentSearchQuery = "";
    clearSearchBtn.style.display = "none";
    renderGrid();
  });

  // Modal navigation
  modalCloseBtn.addEventListener("click", closePreviewModal);
  modalBackdrop.addEventListener("click", closePreviewModal);

  prevBtn.addEventListener("click", () => {
    if (filteredList.length === 0) return;
    currentModalIndex = (currentModalIndex - 1 + filteredList.length) % filteredList.length;
    updateModalContent();
  });

  nextBtn.addEventListener("click", () => {
    if (filteredList.length === 0) return;
    currentModalIndex = (currentModalIndex + 1) % filteredList.length;
    updateModalContent();
  });

  modalUseBtn.addEventListener("click", () => {
    if (filteredList[currentModalIndex]) {
      redirectToStudio(filteredList[currentModalIndex].id);
    }
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!previewModal.classList.contains("active")) return;
    if (e.key === "Escape") closePreviewModal();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
  });
}

// OPEN PREVIEW MODAL
function openPreviewModal(index) {
  currentModalIndex = index;
  updateModalContent();
  previewModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// CLOSE PREVIEW MODAL
function closePreviewModal() {
  previewModal.classList.remove("active");
  document.body.style.overflow = "";
}

// UPDATE MODAL CONTENT
function updateModalContent() {
  const temp = filteredList[currentModalIndex];
  if (!temp) return;

  modalTitle.textContent = temp.name;
  modalCategory.textContent = temp.category;
  modalPlan.textContent = temp.plan.toUpperCase();

  modalCardPreview.style.background = temp.bgStyle;
  modalCardPreview.style.color = temp.textColor;
  modalCardPreview.innerHTML = `
    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
      ${createPosterCardHTML(temp)}
    </div>
  `;
}

// REDIRECT TO STUDIO PAGE
function redirectToStudio(templateId) {
  window.location.href = `menu-card-studio.html?templateId=${encodeURIComponent(templateId)}`;
}

// START ON DOM LOADED
document.addEventListener("DOMContentLoaded", initGallery);
