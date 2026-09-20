import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Youtube, 
  Facebook, 
  Linkedin, 
  Instagram, 
  ChevronUp, 
  Navigation,
  Truck,
  Banknote
} from 'lucide-react';
import { TornPaperEdge } from './TornPaperEdge';
import roastedCoffeeBeansBg from '../../assets/images/roasted_coffee_beans_bg_1789749808453.jpg';

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
}

export const KoppeeFooterSection: React.FC<KoppeeFooterSectionProps> = ({
  brandName = 'KOPPEE',
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
  plan = 'basic'
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayPhone = contactWhatsapp || contactPhone;

  const locationAddress = brandLocation || "";
  const fullQuery = `${brandName || "KOPPEE"}, ${locationAddress || "New York, USA"}`;

  const defaultDesc = brandDescription || "Redefining luxury dining experiences in Bangladesh. Discover our exclusive chef-curated gourmet menu and 3D interactive WebAR food previews.";

  const getLogoInitials = (name: string): [string, string] => {
    if (!name) return ["A", "S"];
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    const parts = cleanName.split(/\s+/).filter(p => p.length > 0);
    if (parts.length >= 2) {
      return [parts[0][0].toUpperCase(), parts[1][0].toUpperCase()];
    }
    if (cleanName.length >= 2) {
      return [cleanName[0].toUpperCase(), cleanName[1].toUpperCase()];
    }
    return ["A", "S"];
  };

  const [initial1, initial2] = getLogoInitials(brandName);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullQuery)}`;

  const hasContactInfo = Boolean(
    (brandLocation && brandLocation.trim()) ||
    (displayPhone && displayPhone.trim()) ||
    (contactEmail && contactEmail.trim())
  );

  return (
    <footer className="relative w-full bg-[#120a06] text-white font-sans overflow-hidden">
      {/* Torn Paper Edge Transition at Top of Footer */}
      <div className="relative -mt-8 sm:-mt-12 z-20">
        <TornPaperEdge color="#120a06" position="top" />
      </div>

      {/* Coffee Beans Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <img
          src={roastedCoffeeBeansBg}
          alt="Roasted Coffee Beans Background"
          className="w-full h-full object-cover filter brightness-90 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-black/80 to-[#120a06]" />
      </div>

      {/* Embedded Google Maps Location Section */}
      {showGoogleMap !== false && (
        <div id="google-map-location" className="relative z-10 w-full pt-10 pb-6">
          {/* Header Info Container (Clean Name + Location without box) */}
          <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-light text-[#DA9F93] tracking-normal">
                  {brandName}
                </h3>
                {locationAddress && (
                  <p className="text-xs sm:text-sm text-white/80 font-light">
                    {locationAddress}
                  </p>
                )}
              </div>

              <a
                href={directDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#DA9F93] hover:bg-[#c88d81] text-[#120a06] text-xs font-semibold transition-transform active:scale-95 shadow-md shrink-0 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>{lang === 'bn' ? 'গুগল ম্যাপে ডিরেকশন' : 'Get Directions'}</span>
              </a>
            </div>
          </div>

          {/* Edge-to-Edge Full-Width Google Map */}
          <div className="relative w-full h-[520px] sm:h-[620px] md:h-[700px] border-y border-[#DA9F93]/30 bg-black/90 shadow-2xl overflow-hidden">
            <iframe
              title={`${brandName} Google Map Location`}
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
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-12 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 xl:gap-16 text-left">
          
          {/* Column 1: BRAND LOGO & DESCRIPTION (MATCHING USER SCREENSHOT) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {brandLogoUrl ? (
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/10 border border-[#DA9F93]/40 p-0.5 shrink-0 shadow-lg">
                  <img src={brandLogoUrl} alt={brandName} className="w-full h-full object-cover rounded-xl" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-[#1e140d] border-2 border-[#DA9F93] text-white flex items-center justify-center font-mono font-black text-lg tracking-wider shrink-0 shadow-xl">
                  <span className="text-[#DA9F93]">{initial1}</span>
                  <span className="text-amber-400">{initial2}</span>
                </div>
              )}
              <h3 className="text-xl font-extrabold text-[#DA9F93] tracking-tight">
                {brandName}
              </h3>
            </div>

            <p className="text-xs text-white/75 leading-relaxed font-light">
              {defaultDesc}
            </p>

            {/* Cash on Delivery Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#DA9F93]/15 border border-[#DA9F93]/30 text-[#DA9F93] text-xs font-bold">
              <Banknote className="w-4 h-4 text-amber-400" />
              <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি সুবিধা' : 'Cash on Delivery Available'}</span>
            </div>
          </div>

          {/* Column 2: GET IN TOUCH */}
          {hasContactInfo && (
            <div className="space-y-4">
              <h3 className="text-lg font-black uppercase tracking-widest text-white border-b-2 border-[#DA9F93]/30 pb-2 inline-block">
                GET IN TOUCH
              </h3>
              <div className="space-y-3 text-sm text-white/80">
                {brandLocation && brandLocation.trim() !== '' && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#DA9F93] shrink-0 mt-0.5" />
                    <span className="leading-snug">{brandLocation}</span>
                  </div>
                )}
                {displayPhone && displayPhone.trim() !== '' && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#DA9F93] shrink-0" />
                    <span>{displayPhone}</span>
                  </div>
                )}
                {contactEmail && contactEmail.trim() !== '' && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#DA9F93] shrink-0" />
                    <span>{contactEmail}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Column 2: FOLLOW US */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-white border-b-2 border-[#DA9F93]/30 pb-2 inline-block">
              FOLLOW US
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Connect with us on social media for daily brewing tips, new menu arrivals, and seasonal artisanal roast releases.
            </p>
            {/* Social Icons Box Grid: Facebook, Instagram, YouTube, LinkedIn filtered by active plan */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <a
                href={socialLinks?.linkedin ? (socialLinks.linkedin.startsWith('http') ? socialLinks.linkedin : `https://${socialLinks.linkedin}`) : 'https://linkedin.com'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-white/30 hover:border-[#0A66C2] text-white hover:text-[#0A66C2] hover:bg-white/5 flex items-center justify-center transition-colors rounded-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={socialLinks?.facebook ? (socialLinks.facebook.startsWith('http') ? socialLinks.facebook : `https://${socialLinks.facebook}`) : 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-white/30 hover:border-[#1877F2] text-white hover:text-[#1877F2] hover:bg-white/5 flex items-center justify-center transition-colors rounded-sm"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={socialLinks?.youtube ? (socialLinks.youtube.startsWith('http') ? socialLinks.youtube : `https://${socialLinks.youtube}`) : 'https://youtube.com'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-white/30 hover:border-[#FF0000] text-white hover:text-[#FF0000] hover:bg-white/5 flex items-center justify-center transition-colors rounded-sm"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={socialLinks?.instagram ? (socialLinks.instagram.startsWith('http') ? socialLinks.instagram : `https://${socialLinks.instagram}`) : 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-white/30 hover:border-[#E1306C] text-white hover:text-[#E1306C] hover:bg-white/5 flex items-center justify-center transition-colors rounded-sm"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: OPEN HOURS */}
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-white border-b-2 border-[#DA9F93]/30 pb-2 inline-block">
              OPEN HOURS
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <div>
                <span className="block font-bold text-white uppercase text-xs tracking-wider">MONDAY - FRIDAY</span>
                <span className="text-xs text-white/70">{timingOpen} - {timingClose}</span>
              </div>
              <div>
                <span className="block font-bold text-white uppercase text-xs tracking-wider">SATURDAY - SUNDAY</span>
                <span className="text-xs text-white/70">2.00 PM - {timingClose}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 space-y-3 sm:space-y-0">
        <div className="text-center sm:text-left space-y-1">
          <p>
            Copyright © <span className="text-[#DA9F93] font-bold">{brandName}</span>. All Rights Reserved.
          </p>
          <p className="text-[11px] text-white/40">
            Designed by <span className="text-[#DA9F93]">Heart Coding</span>
          </p>
        </div>

        {/* Scroll To Top Button (Right Corner) */}
        <button
          type="button"
          onClick={scrollToTop}
          className="w-10 h-10 bg-[#DA9F93] text-[#120a06] hover:bg-[#c88d81] flex items-center justify-center rounded-sm transition-transform active:scale-90 cursor-pointer shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default KoppeeFooterSection;
