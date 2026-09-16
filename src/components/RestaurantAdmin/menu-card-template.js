// menu-card-template.js
// Reusable Dynamic Menu Card Template Engine

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 1. Bind Live Text Inputs for Branding & Contact Info
function bindTextInput(inputId, previewId, fallbackText) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  if (input && preview) {
    input.addEventListener('input', () => {
      preview.textContent = input.value.trim() || fallbackText;
    });
  }
}

bindTextInput('phoneInput', 'phonePreview', '123-456-7890');
bindTextInput('websiteInput', 'websitePreview', 'www.yourrestaurant.com');
bindTextInput('addressInput', 'addressPreview', '123 Anywhere St, Any City');

// 2. Render Restaurant Brand Logo or Text
function renderRestaurantBrand(restaurant) {
  const brandContainer = document.getElementById('restaurantBrand');
  const logoPreview = document.getElementById('restaurantLogoPreview');
  const namePreview = document.getElementById('restaurantNamePreview');

  if (!brandContainer) return;

  if (restaurant && restaurant.logoUrl) {
    if (logoPreview) {
      logoPreview.src = restaurant.logoUrl;
      logoPreview.style.display = 'block';
    }
    if (namePreview) {
      namePreview.textContent = restaurant.name || 'Your Restaurant';
    }
  } else {
    if (logoPreview) {
      logoPreview.style.display = 'none';
      logoPreview.src = '';
    }
    if (namePreview) {
      namePreview.textContent = (restaurant && restaurant.name) ? restaurant.name : 'ROYAL FLAME KITCHEN';
    }
  }
}

// 3. Dynamic Menu Items Renderer with Category Filtering
function renderMenuItems(items, activeCategory = 'All') {
  const gridContainer = document.getElementById('menuItemsGrid');
  const categoryTitle = document.getElementById('currentCategoryTitle');

  if (!gridContainer) return;

  if (categoryTitle) {
    categoryTitle.textContent = activeCategory === 'All' ? 'All Foods' : activeCategory;
  }

  const visibleItems = (items || []).filter(item => {
    const matchesAvailability = item.isAvailable !== false && item.published !== false;
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory || item.categoryId === activeCategory;
    return matchesAvailability && matchesCategory;
  });

  if (visibleItems.length === 0) {
    gridContainer.innerHTML = `
      <div class="menu-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 32px; color: var(--color-text-secondary);">
        <p style="margin: 0; font-size: 0.9rem;">No menu items available in this category.</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = visibleItems
    .map(item => `
      <article class="menu-item-card" data-item-id="${escapeHtml(item.id)}">
        <div class="menu-item-image-wrapper">
          <img class="menu-item-image" src="${escapeHtml(item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80')}" alt="${escapeHtml(item.name)}" loading="lazy" />
        </div>
        <div class="menu-item-info">
          <div class="menu-item-header">
            <h4 class="menu-item-name">${escapeHtml(item.name)}</h4>
            <span class="menu-item-price">$${typeof item.price === 'number' ? item.price.toFixed(2) : escapeHtml(String(item.price))}</span>
          </div>
          <p class="menu-item-description">${escapeHtml(item.description || '')}</p>
          ${item.glbUrl || item.is3DEnabled ? `
            <button class="menu-item-3d-btn" type="button" data-model-url="${escapeHtml(item.glbUrl || '')}">
              <span>View 3D</span>
            </button>
          ` : ''}
        </div>
      </article>
    `)
    .join('');
}

// 4. Setup Category Navigation Buttons
function setupCategoryNav(categories, items) {
  const categoryNav = document.getElementById('categoryNav');
  if (!categoryNav) return;

  const allCategories = ['All', ...categories];

  categoryNav.innerHTML = allCategories
    .map(cat => `
      <button class="menu-category-btn ${cat === 'All' ? 'active' : ''}" type="button" data-category="${escapeHtml(cat)}">
        ${escapeHtml(cat === 'All' ? 'All Foods' : cat)}
      </button>
    `)
    .join('');

  categoryNav.querySelectorAll('.menu-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.dataset.category;
      categoryNav.querySelectorAll('.menu-category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenuItems(items, selectedCategory);
    });
  });
}

// 5. CSS Custom Properties / Font & Color System Updater
function applyThemeConfig(config) {
  const root = document.documentElement;

  if (config.brandFont) root.style.setProperty('--brand-font', config.brandFont);
  if (config.bodyFont) root.style.setProperty('--body-font', config.bodyFont);
  if (config.sectionFont) root.style.setProperty('--section-font', config.sectionFont);
  if (config.priceFont) root.style.setProperty('--price-font', config.priceFont);

  if (config.colorPrimary) root.style.setProperty('--color-primary', config.colorPrimary);
  if (config.colorSecondary) root.style.setProperty('--color-secondary', config.colorSecondary);
  if (config.colorBackground) root.style.setProperty('--color-background', config.colorBackground);
  if (config.colorCardBg) root.style.setProperty('--color-card-bg', config.colorCardBg);
  if (config.colorTextPrimary) root.style.setProperty('--color-text-primary', config.colorTextPrimary);
  if (config.colorTextSecondary) root.style.setProperty('--color-text-secondary', config.colorTextSecondary);
}

// 6. Dynamic QR Code Generator
function updateQRCode(restaurantId, tableId, tableNumber, sessionId) {
  const menuURL = window.location.origin +
    '/menu?restaurantId=' + encodeURIComponent(restaurantId || 'demo-restaurant') +
    '&tableId=' + encodeURIComponent(tableId || 'table-1') +
    '&table=' + encodeURIComponent(tableNumber || 'T-1') +
    (sessionId ? '&sessionId=' + encodeURIComponent(sessionId) : '');

  const qrContainer = document.getElementById('qrCodeCanvas');
  const tableLabel = document.getElementById('qrTableLabel');

  if (tableLabel) {
    tableLabel.textContent = `Table: ${tableNumber || 'T-1'}`;
  }

  if (qrContainer) {
    qrContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(menuURL)}&color=111111&bgcolor=ffffff&qzone=2`;
    img.width = 120;
    img.height = 120;
    img.alt = "Table QR Code";
    qrContainer.appendChild(img);
  }
}

// Expose Engine methods for module integration
if (typeof window !== 'undefined') {
  window.MenuCardTemplateEngine = {
    escapeHtml,
    bindTextInput,
    renderRestaurantBrand,
    renderMenuItems,
    setupCategoryNav,
    applyThemeConfig,
    updateQRCode
  };
}

