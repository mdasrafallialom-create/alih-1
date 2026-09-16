export type FontCategory =
  | 'Luxury Serif'
  | 'Elegant Serif'
  | 'Modern Sans'
  | 'Bold Display'
  | 'Restaurant/Cafe'
  | 'Multilingual Display';

export type CanvaPresetType =
  | 'script_thank_you'
  | 'fashion_icon'
  | 'business_model'
  | 'marketing_proposal'
  | 'heading_paragraph'
  | 'sweet_pink'
  | 'like_subscribe'
  | 'congrats_michael'
  | 'royal_cuisine'
  | 'vintage_bistro'
  | 'grand_feast'
  | 'standard';

export interface FontItem {
  id: string;
  name: string;
  family: string;
  category: FontCategory;
  cssFamily: string;
  previewText: string;
  bengaliPreviewText?: string;
  arabicPreviewText?: string;
  canvaPreset?: CanvaPresetType;
  supportedScripts: string[];
  allowedPlans: ('starter' | 'professional' | 'premium')[];
  active: boolean;
  googleFontFamily: string;
}

export type FontRole =
  | 'brandFont'
  | 'headingFont'
  | 'bodyFont'
  | 'sectionFont'
  | 'priceFont'
  | 'buttonFont';

export interface FontRoleMapping {
  brandFont: string;
  headingFont: string;
  bodyFont: string;
  sectionFont: string;
  priceFont: string;
  buttonFont: string;
}

export interface FontPairSuggestion {
  id: string;
  name: string;
  brandFontId: string;
  headingFontId: string;
  bodyFontId: string;
  sectionFontId: string;
  priceFontId: string;
  buttonFontId: string;
  description: string;
}

export const FONT_CATEGORIES: FontCategory[] = [
  'Luxury Serif',
  'Elegant Serif',
  'Modern Sans',
  'Bold Display',
  'Restaurant/Cafe',
  'Multilingual Display'
];

export const INITIAL_FONT_LIBRARY: FontItem[] = [
  // --- Luxury Serif ---
  {
    id: 'cinzel',
    name: 'Cinzel',
    category: 'Luxury Serif',
    family: '"Cinzel", serif',
    cssFamily: "'Cinzel', serif",
    googleFontFamily: 'Cinzel:wght@400;600;700;900',
    previewText: 'ROYAL FLAME KITCHEN',
    canvaPreset: 'royal_cuisine',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'cinzel_dec',
    name: 'Cinzel Decorative',
    category: 'Luxury Serif',
    family: '"Cinzel Decorative", serif',
    cssFamily: "'Cinzel Decorative', serif",
    googleFontFamily: 'Cinzel+Decorative:wght@400;700;900',
    previewText: 'EMPEROR CUISINE',
    canvaPreset: 'fashion_icon',
    supportedScripts: ['latin'],
    allowedPlans: ['premium'],
    active: true
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    category: 'Luxury Serif',
    family: '"Playfair Display", serif',
    cssFamily: "'Playfair Display', serif",
    googleFontFamily: 'Playfair+Display:ital,wght@0,400;0,600;0,800;1,400',
    previewText: 'The Grand Feast',
    canvaPreset: 'grand_feast',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    category: 'Luxury Serif',
    family: '"Cormorant Garamond", serif',
    cssFamily: "'Cormorant Garamond', serif",
    googleFontFamily: 'Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400',
    previewText: 'Artisanal Dining & Bar',
    canvaPreset: 'fashion_icon',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },
  {
    id: 'dm_serif',
    name: 'DM Serif Display',
    category: 'Luxury Serif',
    family: '"DM Serif Display", serif',
    cssFamily: "'DM Serif Display', serif",
    googleFontFamily: 'DM+Serif+Display',
    previewText: 'Vintage Bistro 1984',
    canvaPreset: 'vintage_bistro',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'bodoni',
    name: 'Bodoni Moda',
    category: 'Luxury Serif',
    family: '"Bodoni Moda", serif',
    cssFamily: "'Bodoni Moda', serif",
    googleFontFamily: 'Bodoni+Moda:ital,wght@0,400;0,700;0,900',
    previewText: 'High Fashion Fine Dining',
    canvaPreset: 'fashion_icon',
    supportedScripts: ['latin'],
    allowedPlans: ['premium'],
    active: true
  },
  {
    id: 'prata',
    name: 'Prata',
    category: 'Luxury Serif',
    family: '"Prata", serif',
    cssFamily: "'Prata', serif",
    googleFontFamily: 'Prata',
    previewText: 'Ristorante Italiano',
    canvaPreset: 'business_model',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },

  // --- Elegant Serif ---
  {
    id: 'libre_baskerville',
    name: 'Libre Baskerville',
    category: 'Elegant Serif',
    family: '"Libre Baskerville", serif',
    cssFamily: "'Libre Baskerville', serif",
    googleFontFamily: 'Libre+Baskerville:ital,wght@0,400;0,700;1,400',
    previewText: 'Marketing Proposal',
    canvaPreset: 'marketing_proposal',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'lora',
    name: 'Lora',
    category: 'Elegant Serif',
    family: '"Lora", serif',
    cssFamily: "'Lora', serif",
    googleFontFamily: 'Lora:ital,wght@0,400;0,600;0,700;1,400',
    previewText: 'Gourmet Heritage Menu',
    canvaPreset: 'marketing_proposal',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    category: 'Elegant Serif',
    family: '"Merriweather", serif',
    cssFamily: "'Merriweather', serif",
    googleFontFamily: 'Merriweather:ital,wght@0,300;0,400;0,700;1,300',
    previewText: 'Chef’s Signature Selection',
    canvaPreset: 'marketing_proposal',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },

  // --- Modern Sans ---
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'Modern Sans',
    family: '"Montserrat", sans-serif',
    cssFamily: "'Montserrat', sans-serif",
    googleFontFamily: 'Montserrat:wght@300;400;600;700;900',
    previewText: 'HEADING & PARAGRAPH',
    canvaPreset: 'heading_paragraph',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'Modern Sans',
    family: '"Poppins", sans-serif',
    cssFamily: "'Poppins', sans-serif",
    googleFontFamily: 'Poppins:wght@300;400;500;600;700;800',
    previewText: 'HEADING & PARAGRAPH',
    canvaPreset: 'heading_paragraph',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'inter',
    name: 'Inter',
    category: 'Modern Sans',
    family: '"Inter", sans-serif',
    cssFamily: "'Inter', sans-serif",
    googleFontFamily: 'Inter:wght@300;400;500;600;700;900',
    previewText: 'HEADING & PARAGRAPH',
    canvaPreset: 'heading_paragraph',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'oswald',
    name: 'Oswald',
    category: 'Modern Sans',
    family: '"Oswald", sans-serif',
    cssFamily: "'Oswald', sans-serif",
    googleFontFamily: 'Oswald:wght@300;400;600;700',
    previewText: 'MODERN STEAKHOUSE',
    canvaPreset: 'like_subscribe',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'roboto',
    name: 'Roboto',
    category: 'Modern Sans',
    family: '"Roboto", sans-serif',
    cssFamily: "'Roboto', sans-serif",
    googleFontFamily: 'Roboto:wght@300;400;500;700;900',
    previewText: 'Fresh Urban Diner',
    canvaPreset: 'heading_paragraph',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'lato',
    name: 'Lato',
    category: 'Modern Sans',
    family: '"Lato", sans-serif',
    cssFamily: "'Lato', sans-serif",
    googleFontFamily: 'Lato:wght@300;400;700;900',
    previewText: 'Healthy Garden Salad',
    canvaPreset: 'heading_paragraph',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'raleway',
    name: 'Raleway',
    category: 'Modern Sans',
    family: '"Raleway", sans-serif',
    cssFamily: "'Raleway', sans-serif",
    googleFontFamily: 'Raleway:wght@300;400;600;700;900',
    previewText: 'Sophisticated Flavors',
    canvaPreset: 'heading_paragraph',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },
  {
    id: 'manrope',
    name: 'Manrope',
    category: 'Modern Sans',
    family: '"Manrope", sans-serif',
    cssFamily: "'Manrope', sans-serif",
    googleFontFamily: 'Manrope:wght@400;600;700;800',
    previewText: 'Artisan Coffee & Bakery',
    canvaPreset: 'congrats_michael',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },
  {
    id: 'outfit',
    name: 'Outfit',
    category: 'Modern Sans',
    family: '"Outfit", sans-serif',
    cssFamily: "'Outfit', sans-serif",
    googleFontFamily: 'Outfit:wght@400;600;700;900',
    previewText: 'Futuristic Fast Casual',
    canvaPreset: 'congrats_michael',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },

  // --- Bold Display ---
  {
    id: 'bebas_neue',
    name: 'Bebas Neue',
    category: 'Bold Display',
    family: '"Bebas Neue", sans-serif',
    cssFamily: "'Bebas Neue', sans-serif",
    googleFontFamily: 'Bebas+Neue',
    previewText: 'Like & SUBSCRIBE',
    canvaPreset: 'like_subscribe',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'anton',
    name: 'Anton',
    category: 'Bold Display',
    family: '"Anton", sans-serif',
    cssFamily: "'Anton', sans-serif",
    googleFontFamily: 'Anton',
    previewText: 'MICHAEL DALE • CLASS OF 2021',
    canvaPreset: 'congrats_michael',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },
  {
    id: 'barlow_condensed',
    name: 'Barlow Condensed',
    category: 'Bold Display',
    family: '"Barlow Condensed", sans-serif',
    cssFamily: "'Barlow Condensed', sans-serif",
    googleFontFamily: 'Barlow+Condensed:wght@600;700;800;900',
    previewText: 'STREET FOOD BITES',
    canvaPreset: 'like_subscribe',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },

  // --- Restaurant / Cafe ---
  {
    id: 'pacifico',
    name: 'Pacifico',
    category: 'Restaurant/Cafe',
    family: '"Pacifico", cursive',
    cssFamily: "'Pacifico', cursive",
    googleFontFamily: 'Pacifico',
    previewText: 'Thank you!',
    canvaPreset: 'script_thank_you',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'lobster',
    name: 'Lobster',
    category: 'Restaurant/Cafe',
    family: '"Lobster", cursive',
    cssFamily: "'Lobster', cursive",
    googleFontFamily: 'Lobster',
    previewText: 'Sweet',
    canvaPreset: 'sweet_pink',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'great_vibes',
    name: 'Great Vibes',
    category: 'Restaurant/Cafe',
    family: '"Great Vibes", cursive',
    cssFamily: "'Great Vibes', cursive",
    googleFontFamily: 'Great+Vibes',
    previewText: 'Thank you!',
    canvaPreset: 'script_thank_you',
    supportedScripts: ['latin'],
    allowedPlans: ['premium'],
    active: true
  },
  {
    id: 'dancing_script',
    name: 'Dancing Script',
    category: 'Restaurant/Cafe',
    family: '"Dancing Script", cursive',
    cssFamily: "'Dancing Script', cursive",
    googleFontFamily: 'Dancing+Script:wght@600;700',
    previewText: 'Sweet',
    canvaPreset: 'sweet_pink',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },

  // --- Multilingual / Universal Display ---
  {
    id: 'hind_siliguri',
    name: 'Hind Siliguri',
    category: 'Multilingual Display',
    family: '"Hind Siliguri", sans-serif',
    cssFamily: "'Hind Siliguri', sans-serif",
    googleFontFamily: 'Hind+Siliguri:wght@400;600;700',
    previewText: 'Royal Grill & Kebab House',
    canvaPreset: 'business_model',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'noto_sans_bn',
    name: 'Noto Sans Clean',
    category: 'Multilingual Display',
    family: '"Noto Sans", sans-serif',
    cssFamily: "'Noto Sans', sans-serif",
    googleFontFamily: 'Noto+Sans:wght@400;600;700;800',
    previewText: 'Atikul Bistro & Special Cafe',
    canvaPreset: 'heading_paragraph',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'noto_serif_bn',
    name: 'Noto Serif Heritage',
    category: 'Multilingual Display',
    family: '"Noto Serif", serif',
    cssFamily: "'Noto Serif', serif",
    googleFontFamily: 'Noto+Serif:wght@400;600;700',
    previewText: 'Heritage Royal Dining',
    canvaPreset: 'fashion_icon',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },
  {
    id: 'anek_bangla',
    name: 'Anek Universal',
    category: 'Multilingual Display',
    family: '"Anek Latin", sans-serif',
    cssFamily: "'Anek Latin', sans-serif",
    googleFontFamily: 'Anek+Latin:wght@400;600;700;800',
    previewText: 'Taste & Luxury Dining',
    canvaPreset: 'business_model',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  },
  {
    id: 'noto_sans_ar',
    name: 'Noto Sans Oasis',
    category: 'Multilingual Display',
    family: '"Noto Sans", sans-serif',
    cssFamily: "'Noto Sans', sans-serif",
    googleFontFamily: 'Noto+Sans:wght@400;600;700;800',
    previewText: 'Eastern Oasis Fine Dining',
    canvaPreset: 'business_model',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'tajawal',
    name: 'Tajawal',
    category: 'Multilingual Display',
    family: '"Tajawal", sans-serif',
    cssFamily: "'Tajawal', sans-serif",
    googleFontFamily: 'Tajawal:wght@400;500;700;800',
    previewText: 'Modern Oriental Lounge',
    canvaPreset: 'business_model',
    supportedScripts: ['latin'],
    allowedPlans: ['starter', 'professional', 'premium'],
    active: true
  },
  {
    id: 'amiri',
    name: 'Amiri Palace',
    category: 'Multilingual Display',
    family: '"Amiri", serif',
    cssFamily: "'Amiri', serif",
    googleFontFamily: 'Amiri:ital,wght@0,400;0,700;1,400',
    previewText: 'Grand Palace Gourmet',
    canvaPreset: 'fashion_icon',
    supportedScripts: ['latin'],
    allowedPlans: ['professional', 'premium'],
    active: true
  }
];

// Backwards compatibility list
export const FONT_LIBRARY: FontItem[] = INITIAL_FONT_LIBRARY;

export const FONT_PAIR_SUGGESTIONS: FontPairSuggestion[] = [
  {
    id: 'pair_1',
    name: 'Cinzel + Oswald',
    brandFontId: 'cinzel',
    headingFontId: 'cinzel',
    bodyFontId: 'oswald',
    sectionFontId: 'oswald',
    priceFontId: 'oswald',
    buttonFontId: 'oswald',
    description: 'Royal luxury serif title paired with bold modern sans headings & prices.'
  },
  {
    id: 'pair_2',
    name: 'Playfair Display + Montserrat',
    brandFontId: 'playfair',
    headingFontId: 'playfair',
    bodyFontId: 'montserrat',
    sectionFontId: 'montserrat',
    priceFontId: 'montserrat',
    buttonFontId: 'montserrat',
    description: 'Classic fine dining title paired with clean geometric body typography.'
  },
  {
    id: 'pair_3',
    name: 'Cormorant Garamond + Lato',
    brandFontId: 'cormorant',
    headingFontId: 'cormorant',
    bodyFontId: 'lato',
    sectionFontId: 'lato',
    priceFontId: 'lato',
    buttonFontId: 'lato',
    description: 'Artisanal vintage elegance paired with warm readable menu text.'
  },
  {
    id: 'pair_4',
    name: 'DM Serif Display + Inter',
    brandFontId: 'dm_serif',
    headingFontId: 'dm_serif',
    bodyFontId: 'inter',
    sectionFontId: 'inter',
    priceFontId: 'inter',
    buttonFontId: 'inter',
    description: 'High impact poster headline with ultra-crisp modern sans details.'
  },
  {
    id: 'pair_5',
    name: 'Bodoni Moda + Manrope',
    brandFontId: 'bodoni',
    headingFontId: 'bodoni',
    bodyFontId: 'manrope',
    sectionFontId: 'manrope',
    priceFontId: 'manrope',
    buttonFontId: 'manrope',
    description: 'High-fashion editorial aesthetic paired with sleek contemporary text.'
  },
  {
    id: 'pair_6',
    name: 'Noto Serif + Noto Sans',
    brandFontId: 'noto_serif_bn',
    headingFontId: 'noto_serif_bn',
    bodyFontId: 'noto_sans_bn',
    sectionFontId: 'noto_sans_bn',
    priceFontId: 'noto_sans_bn',
    buttonFontId: 'noto_sans_bn',
    description: 'Authentic universal serif title paired with clean legible modern typography.'
  }
];

export const DEFAULT_FONT_MAPPING: FontRoleMapping = {
  brandFont: 'cinzel',
  headingFont: 'playfair',
  bodyFont: 'montserrat',
  sectionFont: 'oswald',
  priceFont: 'outfit',
  buttonFont: 'poppins'
};

/**
 * Dynamically inject Google Fonts CSS link tag into document head
 */
export function injectGoogleFonts(fonts: FontItem[] = INITIAL_FONT_LIBRARY) {
  if (typeof document === 'undefined') return;

  const fontFamilies = fonts
    .filter(f => f.active && f.googleFontFamily)
    .map(f => f.googleFontFamily)
    .join('&family=');

  if (!fontFamilies) return;

  const elementId = 'google-fonts-dynamic-loader';
  let link = document.getElementById(elementId) as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.id = elementId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  const newHref = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
  if (link.href !== newHref) {
    link.href = newHref;
  }
}

/**
 * Apply CSS variables to a DOM element or container
 */
export function applyFontCSSVariables(
  element: HTMLElement | null,
  mapping: FontRoleMapping,
  library: FontItem[] = INITIAL_FONT_LIBRARY
) {
  if (!element) return;

  const findCss = (id: string, defaultCss: string) => {
    const font = library.find(f => f.id === id);
    return font ? font.cssFamily : defaultCss;
  };

  element.style.setProperty('--brand-font', findCss(mapping.brandFont, "'Cinzel', serif"));
  element.style.setProperty('--heading-font', findCss(mapping.headingFont, "'Playfair Display', serif"));
  element.style.setProperty('--body-font', findCss(mapping.bodyFont, "'Montserrat', sans-serif"));
  element.style.setProperty('--section-font', findCss(mapping.sectionFont, "'Oswald', sans-serif"));
  element.style.setProperty('--price-font', findCss(mapping.priceFont, "'Outfit', sans-serif"));
  element.style.setProperty('--button-font', findCss(mapping.buttonFont, "'Poppins', sans-serif"));
}
