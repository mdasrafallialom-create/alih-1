import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Youtube, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Navigation,
  Lock,
  MessageCircle
} from 'lucide-react';
import { TornPaperEdge } from './TornPaperEdge';
import { OrivelleGeometricDivider } from './OrivelleGeometricDivider';
import roastedCoffeeBeansBg from '../../assets/images/roasted_coffee_beans_bg_1789749808453.jpg';

import { THEME_HERO_CONFIGS, COFFEE_SHOP_THEME_IDS } from './KoppeeHeroHeader';
import { LUXURY_THEMES } from '../../data/luxuryThemes';
import { getThemeDisplayName, isCustomRestaurantName } from '../../lib/adminHelpers';

interface KoppeeFooterSectionProps {
  brandName?: string;
  brandLogoUrl?: string;
  brandDescription?: string;
  brandLocation?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactEmail?: string;
  timingOpen?: string;
  timingClose?: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
  };
  showGoogleMap?: boolean;
  lang?: string;
  plan?: string;
  themePresetId?: string;
  onOpenAdmin?: () => void;
  previewDeviceView?: 'desktop' | 'tablet' | 'mobile';
}

export const KoppeeFooterSection: React.FC<KoppeeFooterSectionProps> = ({
  brandName = 'Avernao',
  brandLogoUrl,
  brandDescription,
  brandLocation,
  contactPhone,
  contactWhatsapp,
  contactEmail,
  timingOpen = '8.00 AM',
  timingClose = '8.00 PM',
  socialLinks,
  showGoogleMap = true,
  lang = 'en',
  plan = 'basic',
  themePresetId,
  onOpenAdmin,
  previewDeviceView
}) => {
  const effectiveBrandName = isCustomRestaurantName(brandName)
    ? brandName!.trim()
    : getThemeDisplayName(themePresetId);
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isTablet = previewDeviceView === 'tablet' || (!previewDeviceView && windowWidth >= 640 && windowWidth < 1024);
  const isMobile = previewDeviceView === 'mobile' || (!previewDeviceView && windowWidth < 640);
  const isDesktop = previewDeviceView === 'desktop' || (!previewDeviceView && windowWidth >= 1024);

  const isLuxuryTheme = !COFFEE_SHOP_THEME_IDS.includes(themePresetId || '');
  const isAurelisse = themePresetId === 'aurelisse';
  const isPalatiora = themePresetId === 'palatiora';
  const isOrivelle = isLuxuryTheme && !isAurelisse && !isPalatiora;
  const cfg = (themePresetId && THEME_HERO_CONFIGS[themePresetId]) || THEME_HERO_CONFIGS['lumivelle'];
  const scrollToTop = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      if (document.documentElement) {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTop = 0;
      }
      const scrollContainers = document.querySelectorAll('div, main, section, body, html');
      scrollContainers.forEach((el) => {
        if (el.scrollTop > 0) {
          try {
            el.scrollTo({ top: 0, behavior: 'smooth' });
            el.scrollTop = 0;
          } catch (err) {}
        }
      });
    } catch (err) {}
  };

  const rawPhone = (contactPhone || '').trim();
  let displayPhone = '+1 (XXX) XXX-XXXX';
  if (rawPhone && rawPhone !== '+880' && rawPhone !== '+1' && !rawPhone.includes('1340491041')) {
    displayPhone = rawPhone;
  }

  const rawWhatsapp = (contactWhatsapp || '').trim();
  let displayWhatsapp = '';
  if (rawWhatsapp && rawWhatsapp !== '+880' && rawWhatsapp !== '+1' && !rawWhatsapp.includes('1340491041')) {
    displayWhatsapp = rawWhatsapp;
  }

  const rawEmail = (contactEmail || '').trim();
  let cleanEmail = 'contact@yourrestaurant.com';
  if (rawEmail && !rawEmail.includes('atikulalomasif4')) {
    cleanEmail = rawEmail;
  }

  const rawLocation = (brandLocation || '').trim();
  let locationAddress = '';
  if (rawLocation && rawLocation !== 'Hyderabad, Sindh, Pakistan' && rawLocation !== 'Location Not Set') {
    locationAddress = rawLocation;
  }

  const fullQuery = `${effectiveBrandName || ''}${locationAddress && locationAddress !== 'Location Not Set' ? `, ${locationAddress}` : ''}`;

  const defaultDesc = brandDescription || "Redefining luxury dining experiences. Discover our exclusive chef-curated gourmet menu and 3D interactive WebAR food previews.";

  const getLogoInitials = (name: string): [string, string] => {
    if (!name) return ["V", "D"];
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    if (!cleanName) return ["V", "D"];
    const parts = cleanName.split(/\s+/).filter(p => p.length > 0);
    if (parts.length >= 2) {
      return [parts[0][0].toUpperCase(), parts[1][0].toUpperCase()];
    }
    if (cleanName.length >= 2) {
      return [cleanName[0].toUpperCase(), cleanName[1].toUpperCase()];
    }
    return [cleanName[0].toUpperCase(), cleanName[0].toUpperCase()];
  };

  const [initial1, initial2] = getLogoInitials(effectiveBrandName);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullQuery)}`;

  const hasContactInfo = Boolean(
    (locationAddress && locationAddress.trim()) ||
    (displayPhone && displayPhone.trim() && displayPhone.trim() !== '+880') ||
    (cleanEmail && cleanEmail.trim())
  );

  return (
    <footer className={`relative w-full ${isAurelisse ? 'text-[#142412]' : isPalatiora ? 'text-white' : 'text-white'} font-sans overflow-hidden ${
      isAurelisse
        ? 'bg-[#EDF7E7] border-t border-[#2e7d32]/20'
        : isPalatiora
        ? 'bg-[#09090B] border-t border-white/10'
        : isOrivelle ? 'bg-[#090806]' : 'bg-[#120a06]'
    }`}>
      {/* Top Transition Divider: Orivelle uses 24K Gold Geometric Divider on all screens; default uses Torn Paper on desktop */}
      {isOrivelle ? (
        <div className="relative -mt-4 sm:-mt-8 z-20 w-full pointer-events-none select-none">
          <OrivelleGeometricDivider color="#090806" position="top" />
        </div>
      ) : isAurelisse ? (
        <div className="w-full h-px bg-[#2e7d32]/20" />
      ) : isPalatiora ? (
        <div className="w-full h-px bg-white/10" />
      ) : isDesktop ? (
        <div className="relative -mt-8 sm:-mt-12 z-20 hidden lg:block">
          <TornPaperEdge color="#120a06" position="top" />
        </div>
      ) : (
        <div className="w-full h-px bg-white/10" />
      )}

      {/* Coffee Beans Texture Overlay for Coffee Theme vs Subtle Starlight Aura for Orivelle */}
      {(!isOrivelle && !isAurelisse && !isPalatiora) && (
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <img
            src={roastedCoffeeBeansBg}
            alt="Roasted Coffee Beans Background"
            className="w-full h-full object-cover filter brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-black/80 to-[#120a06]" />
        </div>
      )}
      {isOrivelle && (
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(229,193,88,0.15),_transparent_70%)]" />
      )}
      {isPalatiora && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.12),_transparent_70%)]" />
      )}

      {/* Embedded Google Maps Location Section */}
      {showGoogleMap !== false && Boolean(locationAddress) && (
        <div id="google-map-location" className="relative z-10 w-full pt-10 pb-6">
          {/* Header Info Container (Clean Name + Location without box) */}
          <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
              <div className="space-y-1">
                <h3 className={`text-xl sm:text-2xl font-light tracking-normal ${
                  isAurelisse ? 'text-[#142412]' : isPalatiora ? 'text-white' : isOrivelle ? 'text-amber-300 font-serif' : 'text-[#DA9F93]'
                }`} style={isOrivelle ? { fontFamily: "'Cinzel', serif" } : isPalatiora ? { fontFamily: "'DM Serif Display', serif" } : undefined}>
                  {effectiveBrandName}
                </h3>
                {locationAddress && (
                  <p className={`text-xs sm:text-sm ${isAurelisse ? 'text-[#2a3e26]' : isPalatiora ? 'text-stone-400' : 'text-white/80'} font-light`}>
                    {locationAddress}
                  </p>
                )}
              </div>

              <a
                href={directDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-transform active:scale-95 shadow-md shrink-0 cursor-pointer ${
                  isAurelisse
                    ? 'bg-[#2e7d32] hover:bg-[#1b5e20] text-white shadow-md'
                    : isPalatiora
                    ? 'bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg shadow-orange-600/30'
                    : isOrivelle 
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-stone-950 font-black shadow-[0_0_15px_rgba(229,193,88,0.35)]' 
                    : 'bg-[#DA9F93] hover:bg-[#c88d81] text-[#120a06]'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>{'Get Directions'}</span>
              </a>
            </div>
          </div>

          {/* Edge-to-Edge Full-Width Google Map */}
          <div className={`relative w-full h-[520px] sm:h-[620px] md:h-[700px] ${isAurelisse ? 'border-y border-[#2e7d32]/20' : isPalatiora ? 'border-y border-slate-300' : 'border-y border-[#DA9F93]/30'} bg-black/90 shadow-2xl overflow-hidden`}>
            <iframe
              title={`${effectiveBrandName} Google Map Location`}
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-105 brightness-95"
            />
          </div>
        </div>
      )}

      {/* Main Footer Grid Container */}
      <div className={`relative z-10 w-full max-w-[1800px] mx-auto ${
        isMobile ? 'px-4 pt-8 pb-12' : 'px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-12 pb-16'
      }`}>
        <div className={`grid gap-8 md:gap-10 lg:gap-12 xl:gap-16 text-left ${
          isMobile 
            ? 'grid-cols-1 space-y-2' 
            : isTablet 
            ? 'grid-cols-1 sm:grid-cols-3' 
            : 'grid-cols-1 md:grid-cols-3'
        }`}>
          
          {/* Column 1: BRAND LOGO & DESCRIPTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {brandLogoUrl ? (
                <div className={`w-12 h-12 rounded-2xl overflow-hidden ${isAurelisse ? 'bg-white border border-[#2e7d32]/30' : isPalatiora ? 'bg-white/10 border border-[#F97316]/40' : 'bg-white/10 border border-[#DA9F93]/40'} p-0.5 shrink-0 shadow-lg`}>
                  <img src={brandLogoUrl} alt={effectiveBrandName} className="w-full h-full object-cover rounded-xl" />
                </div>
              ) : (
                <div className={`w-12 h-12 rounded-2xl ${isAurelisse ? 'bg-[#2e7d32] text-white' : isPalatiora ? 'bg-[#F97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-gradient-to-br from-[#DA9F93] to-[#a86e63] text-[#120a06]'} font-black text-base flex items-center justify-center shrink-0 shadow-xl border border-white/20 select-none uppercase`}>
                  {initial1}{initial2}
                </div>
              )}
              <h3 className={`text-xl font-extrabold ${isAurelisse ? 'text-[#142412]' : isPalatiora ? 'text-white' : 'text-[#DA9F93]'} tracking-tight`}>
                {effectiveBrandName}
              </h3>
            </div>

            <p className={`text-xs ${isAurelisse ? 'text-[#2a3e26]' : isPalatiora ? 'text-stone-400' : 'text-white/75'} leading-relaxed font-light`}>
              {defaultDesc}
            </p>
          </div>

          {/* Column 2: GET IN TOUCH */}
          <div className="space-y-4">
            <h3 className={`text-lg font-black uppercase tracking-widest ${isAurelisse ? 'text-[#142412] border-b-2 border-[#2e7d32]/40' : isPalatiora ? 'text-white border-b-2 border-[#F97316]' : 'text-white border-b-2 border-[#DA9F93]/30'} pb-2 inline-block`}>
              GET IN TOUCH
            </h3>
            <div className={`space-y-3 text-sm ${isAurelisse ? 'text-[#2a3e26]' : isPalatiora ? 'text-stone-300' : 'text-white/80'}`}>
              <div className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 ${isAurelisse ? 'text-[#2e7d32]' : isPalatiora ? 'text-[#F97316]' : 'text-[#DA9F93]'} shrink-0 mt-0.5`} />
                <span className="leading-snug">{locationAddress}</span>
              </div>
              
              {/* Phone Line */}
              <div className="flex items-center gap-3">
                <Phone className={`w-5 h-5 ${isAurelisse ? 'text-[#2e7d32]' : isPalatiora ? 'text-[#F97316]' : 'text-[#DA9F93]'} shrink-0`} />
                {displayPhone && displayPhone !== '+1 (XXX) XXX-XXXX' ? (
                  <a href={`tel:${displayPhone.replace(/[^0-9+]/g, '')}`} className={`${isAurelisse ? 'hover:text-[#2e7d32]' : isPalatiora ? 'hover:text-[#F97316] font-medium' : 'hover:text-[#DA9F93]'} transition-colors`}>
                    {displayPhone}
                  </a>
                ) : (
                  <span>{displayPhone}</span>
                )}
              </div>

              {/* WhatsApp Line */}
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                {displayWhatsapp ? (
                  <a 
                    href={`https://wa.me/${displayWhatsapp.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="hover:text-[#25D366] transition-colors flex items-center gap-2"
                  >
                    <span>{displayWhatsapp}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] font-bold border border-[#25D366]/30">
                      WhatsApp
                    </span>
                  </a>
                ) : (
                  <span className={isAurelisse ? 'text-[#2a3e26]/60' : isPalatiora ? 'text-stone-400' : 'text-white/60'}>
                    <span>+1 (XXX) XXX-XXXX (WhatsApp)</span>
                  </span>
                )}
              </div>

              {/* Email Line */}
              <div className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${isAurelisse ? 'text-[#2e7d32]' : isPalatiora ? 'text-[#F97316]' : 'text-[#DA9F93]'} shrink-0`} />
                {cleanEmail && cleanEmail !== 'contact@yourrestaurant.com' ? (
                  <a href={`mailto:${cleanEmail}`} className={`${isAurelisse ? 'hover:text-[#2e7d32]' : isPalatiora ? 'hover:text-[#F97316] font-medium' : 'hover:text-[#DA9F93]'} transition-colors`}>
                    {cleanEmail}
                  </a>
                ) : (
                  <span>{cleanEmail}</span>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: FOLLOW US */}
          <div className="space-y-4">
            <h3 className={`text-lg font-black uppercase tracking-widest ${isAurelisse ? 'text-[#142412] border-b-2 border-[#2e7d32]/40' : isPalatiora ? 'text-white border-b-2 border-[#F97316]' : 'text-white border-b-2 border-[#DA9F93]/30'} pb-2 inline-block`}>
              FOLLOW US
            </h3>
            <p className={`text-xs sm:text-sm ${isAurelisse ? 'text-[#2a3e26]' : isPalatiora ? 'text-stone-400' : 'text-white/70'} leading-relaxed`}>
              Connect with us on social media for daily culinary specials, chef masterclasses, and exquisite flavors.
            </p>
            {/* Social Icons Box Grid Filtered strictly by tier: Basic=$15 [1 link], Pro=$49 [3 links], Elite=$99 [4 links] */}
            {(() => {
              const matchedTheme = themePresetId ? LUXURY_THEMES.find(t => t.id === themePresetId) : undefined;
              const activeTier = matchedTheme?.tier || (plan && plan !== 'basic' ? plan : 'basic');

              return (
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  {/* Instagram: Always present ($15, $49, $99) */}
                  <a
                    href={socialLinks?.instagram ? (socialLinks.instagram.startsWith('http') ? socialLinks.instagram : `https://${socialLinks.instagram}`) : '#'}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-10 h-10 border ${isAurelisse ? 'border-[#2e7d32]/30 text-[#142412] hover:bg-emerald-50' : isPalatiora ? 'border-white/20 text-white hover:bg-[#F97316]/20 hover:border-[#F97316]' : 'border-white/30 text-white hover:bg-white/5'} hover:border-[#E1306C] hover:text-[#E1306C] flex items-center justify-center transition-colors rounded-xl`}
                    title="Instagram ($15 Basic / $49 Pro / $99 Elite)"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>

                  {/* Facebook: Present in $49 Pro & $99 Elite */}
                  {(activeTier === 'pro' || activeTier === 'elite') && (
                    <a
                      href={socialLinks?.facebook ? (socialLinks.facebook.startsWith('http') ? socialLinks.facebook : `https://${socialLinks.facebook}`) : '#'}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-10 h-10 border ${isAurelisse ? 'border-[#2e7d32]/30 text-[#142412] hover:bg-emerald-50' : isPalatiora ? 'border-white/20 text-white hover:bg-[#F97316]/20 hover:border-[#F97316]' : 'border-white/30 text-white hover:bg-white/5'} hover:border-[#1877F2] hover:text-[#1877F2] flex items-center justify-center transition-colors rounded-xl`}
                      title="Facebook ($49 Pro / $99 Elite)"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}

                  {/* YouTube: Present in $49 Pro & $99 Elite */}
                  {(activeTier === 'pro' || activeTier === 'elite') && (
                    <a
                      href={socialLinks?.youtube ? (socialLinks.youtube.startsWith('http') ? socialLinks.youtube : `https://${socialLinks.youtube}`) : '#'}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-10 h-10 border ${isAurelisse ? 'border-[#2e7d32]/30 text-[#142412] hover:bg-emerald-50' : isPalatiora ? 'border-white/20 text-white hover:bg-[#F97316]/20 hover:border-[#F97316]' : 'border-white/30 text-white hover:bg-white/5'} hover:border-[#FF0000] hover:text-[#FF0000] flex items-center justify-center transition-colors rounded-xl`}
                      title="YouTube ($49 Pro / $99 Elite)"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}

                  {/* LinkedIn: Present in $99 Elite only */}
                  {activeTier === 'elite' && (
                    <a
                      href={socialLinks?.linkedin ? (socialLinks.linkedin.startsWith('http') ? socialLinks.linkedin : `https://${socialLinks.linkedin}`) : '#'}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-10 h-10 border ${isAurelisse ? 'border-[#2e7d32]/30 text-[#142412] hover:bg-emerald-50' : isPalatiora ? 'border-white/20 text-white hover:bg-[#F97316]/20 hover:border-[#F97316]' : 'border-white/30 text-white hover:bg-white/5'} hover:border-[#0A66C2] hover:text-[#0A66C2] flex items-center justify-center transition-colors rounded-xl`}
                      title="LinkedIn ($99 Elite)"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className={`relative z-10 border-t ${isAurelisse ? 'border-[#2e7d32]/20 bg-[#EDF7E7] text-[#2a3e26]' : isPalatiora ? 'border-white/10 bg-[#060608] text-stone-400' : 'border-white/10 bg-black/40 text-white/60'} py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs space-y-3 sm:space-y-0`}>
        <div className="text-center sm:text-left space-y-1">
          <p>
            Copyright © <span className={`${isAurelisse ? 'text-[#2e7d32]' : isPalatiora ? 'text-white' : 'text-[#DA9F93]'} font-bold`}>{effectiveBrandName}</span>. All Rights Reserved.
          </p>
          <p className={`text-[11px] ${isAurelisse ? 'text-[#2a3e26]/60' : isPalatiora ? 'text-stone-500' : 'text-white/40'} flex items-center justify-center sm:justify-start gap-1.5`}>
            <span>Designed by <span className={isAurelisse ? 'text-[#2e7d32]' : isPalatiora ? 'text-[#F97316] font-bold' : 'text-[#DA9F93]'}>Heart Coding</span></span>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className={`inline-flex items-center ${isAurelisse ? 'text-[#2e7d32]/50 hover:text-[#2e7d32]' : isPalatiora ? 'text-stone-400 hover:text-[#F97316]' : 'text-white/30 hover:text-[#DA9F93]'} transition-colors p-1 rounded hover:bg-white/5 cursor-pointer ml-1`}
                title="Staff / Admin Portal Access (PIN: 8520)"
              >
                <Lock className="w-3 h-3" />
              </button>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default KoppeeFooterSection;
