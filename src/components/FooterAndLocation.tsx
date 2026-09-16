import React from 'react';
import { 
  MapPin, 
  Clock, 
  ExternalLink, 
  Navigation, 
  Youtube, 
  Facebook, 
  Instagram, 
  Share2, 
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Truck,
  FileText,
  Lock,
  UserCheck,
  Phone,
  Mail,
  MessageCircle,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { User } from 'firebase/auth';

interface FooterAndLocationProps {
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
  lang?: string;
  onAdminAccess?: () => void;
  brandName?: string;
  brandLogoUrl?: string;
  brandLocation?: string;
  logoStyle?: string;
  logoColorPrimary?: string;
  logoColorSecondary?: string;
  contactPhone?: string;
  contactWhatsapp?: string;
  contactEmail?: string;
  hideMap?: boolean;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export default function FooterAndLocation({ 
  user, 
  onLogin, 
  onLogout, 
  lang = 'en', 
  onAdminAccess,
  brandName,
  brandLogoUrl,
  brandLocation,
  logoStyle,
  logoColorPrimary,
  logoColorSecondary,
  contactPhone,
  contactWhatsapp,
  contactEmail,
  hideMap = false,
  socialLinks
}: FooterAndLocationProps) {
  const locationAddress = brandLocation || "Gulshan Market, Goneshtola, Dinajpur Sadar, Dinajpur-5200, Bangladesh";
  const query = `${brandName || "L'Aura Gourmet Dining"}, ${locationAddress}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const emailAddress = (contactEmail || 'asrafali.com@gmail.com').trim();
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

  const whatsappNumber = (contactWhatsapp || contactPhone || '+880 1603317908').trim();
  const cleanWhatsappDigits = whatsappNumber.replace(/\D/g, '');
  const whatsappChatUrl = `https://wa.me/${cleanWhatsappDigits}`;

  const t = (en: string, bn: string, ar: string) => {
    if (lang === 'ar') return ar;
    if (lang === 'bn') return bn;
    return en;
  };

  const getLogoInitials = (name: string): [string, string] => {
    if (!name) return ["L", "A"];
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    const parts = cleanName.split(/\s+/).filter(p => p.length > 0);
    if (parts.length >= 2) {
      return [parts[0][0].toUpperCase(), parts[1][0].toUpperCase()];
    }
    if (cleanName.length >= 2) {
      return [cleanName[0].toUpperCase(), cleanName[1].toUpperCase()];
    }
    return [cleanName[0].toUpperCase(), "A"];
  };

  const renderMonogramLogo = (isLight: boolean = false, size: 'sm' | 'md' | 'lg' = 'md') => {
    const [c1, c2] = getLogoInitials(brandName || '');
    const style = logoStyle || 'crest';
    const primaryColor = logoColorPrimary || (isLight ? '#475569' : '#94a3b8');
    const secondaryColor = logoColorSecondary || (isLight ? '#0284c7' : '#22d3ee');
    
    const sizeClasses = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-20 h-20' : 'w-14 h-14';
    const roundedClass = size === 'sm' ? 'rounded-xl' : 'rounded-2xl';

    return (
      <div className={`${sizeClasses} ${roundedClass} bg-gradient-to-br ${isLight ? 'from-white to-slate-50 border-slate-200 shadow-sm' : 'from-slate-950 to-slate-900 border-slate-800/80 shadow-md'} border flex items-center justify-center relative overflow-hidden shrink-0 select-none`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none" />
        <svg viewBox="0 0 100 100" className="w-full h-full p-0.5">
          {style === 'crest' && (
            <>
              <circle cx="50" cy="50" r="41" stroke={secondaryColor} strokeWidth="0.8" fill="none" opacity={0.35} />
              <text x="36" y="52" textAnchor="middle" dominantBaseline="middle" fill={primaryColor} style={{ fontFamily: "'Playfair Display', serif", fontSize: "45px", fontWeight: 300, fontStyle: "italic", opacity: 0.95 }}>{c1}</text>
              <line x1="26" y1="74" x2="74" y2="26" stroke={secondaryColor} strokeWidth="1.2" opacity={0.5} />
              <text x="64" y="68" textAnchor="middle" dominantBaseline="middle" fill={secondaryColor} style={{ fontFamily: "'Playfair Display', serif", fontSize: "47px", fontWeight: 800 }}>{c2}</text>
            </>
          )}
          {style === 'minimal' && (
            <>
              <text x="34" y="50" textAnchor="middle" dominantBaseline="middle" fill={primaryColor} style={{ fontFamily: "'Playfair Display', serif", fontSize: "49px", fontWeight: 400 }}>{c1}</text>
              <text x="64" y="68" textAnchor="middle" dominantBaseline="middle" fill={secondaryColor} style={{ fontFamily: "'Playfair Display', serif", fontSize: "52px", fontWeight: 700, fontStyle: "italic" }}>{c2}</text>
            </>
          )}
          {style === 'stamp' && (
            <>
              <circle cx="50" cy="50" r="42" stroke={primaryColor} strokeWidth="1" strokeDasharray="4,3" fill="none" opacity={0.5} />
              <circle cx="50" cy="50" r="38" stroke={secondaryColor} strokeWidth="0.6" fill="none" opacity={0.3} />
              <text x="44" y="48" textAnchor="middle" dominantBaseline="middle" fill={primaryColor} style={{ fontFamily: "'Playfair Display', serif", fontSize: "44px", fontWeight: 300 }}>{c1}</text>
              <text x="56" y="62" textAnchor="middle" dominantBaseline="middle" fill={secondaryColor} style={{ fontFamily: "'Playfair Display', serif", fontSize: "44px", fontWeight: 700 }}>{c2}</text>
            </>
          )}
          {style === 'modern' && (
            <>
              <path d="M15,35 L15,15 L35,15 M65,15 L85,15 L85,35 M85,65 L85,85 L65,85 M35,85 L15,85 L15,65" stroke={primaryColor} strokeWidth="1" fill="none" opacity={0.4} />
              <text x="35" y="48" textAnchor="middle" dominantBaseline="middle" fill={primaryColor} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "42px", fontWeight: 900, letterSpacing: "-2px" }}>{c1}</text>
              <text x="65" y="66" textAnchor="middle" dominantBaseline="middle" fill={secondaryColor} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "45px", fontWeight: 900, letterSpacing: "-2px" }}>{c2}</text>
            </>
          )}
        </svg>
      </div>
    );
  };

  return (
    <footer className={`${hideMap ? 'bg-slate-950 text-white' : 'mt-16 bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-slate-200'} no-print`}>
      
      {/* 1. MAP LOCATION SECTION */}
      {!hideMap && (
        <div className="max-w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-display font-semibold">
              <MapPin className="w-3.5 h-3.5 text-cyan-600" />
              <span>Store Location</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Visit L'Aura Gourmet Dining
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Experience our gourmet cuisine and 3D virtual menu previews at our flagship dining venue.
            </p>
          </div>

          {/* Map Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Side: Interactive Embedded Map */}
            <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 relative min-h-[380px] sm:min-h-[450px] group">
              <iframe
                title="L'Aura Gourmet Dining Google Map Location"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover transition-all duration-300 filter group-hover:contrast-105"
              />

              {/* Location Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg max-w-[240px]">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-xs text-slate-900 truncate">{brandName || "L'Aura Gourmet Dining"}</p>
                  <p className="text-[10px] text-slate-500 font-sans truncate">{brandLocation || "Dinajpur Sadar, Bangladesh"}</p>
                </div>
              </div>

              {/* Direct Directions Button */}
              <a
                href={directDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-10 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Right Side: Store Address & Hours Info */}
            <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-display font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>Restaurant Details</span>
                </h3>

                {/* Address */}
                <div className="flex items-start gap-3.5 text-slate-700 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-bold text-slate-900 mb-0.5">Address</span>
                    <p className="text-slate-600 leading-relaxed text-xs">
                      {brandLocation || "Gulshan Market, Goneshtola, Dinajpur Sadar, Dinajpur-5200, Bangladesh"}
                    </p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-start gap-3.5 text-slate-700 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-cyan-600 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-bold text-slate-900 mb-0.5">Contact Phone</span>
                    <a href={`tel:${(contactPhone || '+880 1712-345678').replace(/\s+/g, '')}`} className="text-slate-700 hover:text-cyan-600 font-mono text-xs font-semibold">
                      {contactPhone || '+880 1712-345678'}
                    </a>
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div className="flex items-start gap-3.5 text-slate-700 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="block font-display font-bold text-slate-900">WhatsApp</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700">Chat</span>
                    </div>
                    <a 
                      href={whatsappChatUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={lang === 'bn' ? 'হোয়াটসঅ্যাপে মেসেজ পাঠান' : 'Click to chat on WhatsApp'}
                      className="text-slate-700 hover:text-emerald-600 font-mono text-xs font-semibold inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
                    >
                      <span className="group-hover:underline">{whatsappNumber}</span>
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5 text-slate-700 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-purple-600 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="block font-display font-bold text-slate-900">Email Address</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-100 text-purple-700">Gmail</span>
                    </div>
                    <a 
                      href={gmailComposeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={lang === 'bn' ? 'জিমেইলে সরাসরি মেসেজ পাঠান' : 'Click to send message via Gmail'}
                      className="text-slate-700 hover:text-purple-600 font-mono text-xs font-semibold inline-flex items-center gap-1.5 transition-colors group cursor-pointer"
                    >
                      <span className="group-hover:underline">{emailAddress}</span>
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5 text-slate-700 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-emerald-700 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display font-bold text-slate-900 mb-0.5">Opening Hours</span>
                    <p className="text-slate-600 text-xs">Everyday: 10:00 AM - 10:00 PM</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                      Open All 7 Days
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={directDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs text-center transition-all shadow cursor-pointer flex items-center justify-center gap-2"
              >
                <span>View Map Directions</span>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

          </div>

        </div>
      )}

      {/* 2. FOOTER MULTI-COLUMN STRUCTURE */}
      <div className={`bg-slate-950 text-white py-14 px-4 sm:px-8 md:px-12 lg:px-16 ${hideMap ? '' : 'border-t border-slate-800'}`}>
        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 sm:px-8 md:px-12 lg:px-16">
          
          {/* BRAND COLUMN */}
          <div className="space-y-4">
            {/* Brand Logo Monogram */}
            <div className="mb-4">
              {brandLogoUrl ? (
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-0.5 shadow-lg border border-slate-800">
                  <img src={brandLogoUrl} alt="Brand Logo" className="w-full h-full object-cover rounded-2xl" />
                </div>
              ) : (
                renderMonogramLogo(false, 'md')
              )}
            </div>

            <h3 className="text-xl font-display font-extrabold text-white tracking-tight">
              {brandName || "L'Aura Gourmet Dining"}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Redefining luxury dining experiences in Bangladesh. Discover our exclusive chef-curated gourmet menu and 3D interactive WebAR food previews.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a href={socialLinks?.facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all shadow-sm" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={socialLinks?.instagram || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all shadow-sm" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={socialLinks?.youtube || "https://youtube.com"} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-all shadow-sm" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>

              <div className="w-px h-6 bg-slate-800 mx-1" />

              {user ? (
                <button 
                  type="button"
                  onClick={onLogout}
                  className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-all border border-rose-500/20 flex items-center justify-center cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={onLogin}
                  className="p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all border border-cyan-500/20 flex items-center justify-center cursor-pointer"
                  title="Login"
                >
                  <LogIn className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* GOURMET MENU COLUMN */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-bold text-slate-200 uppercase tracking-wider">
              Gourmet Menu
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li className="hover:text-white transition-colors cursor-pointer">Pizza & Appetizers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Artisanal Burgers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Refreshing Beverages</li>
              <li className="hover:text-white transition-colors cursor-pointer">Gourmet Desserts</li>
              <li className="hover:text-white transition-colors cursor-pointer">Fresh Tropical Fruits</li>
              <li className="hover:text-white transition-colors cursor-pointer">Chef's Specials</li>
            </ul>
          </div>

          {/* SUPPORT COLUMN */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-bold text-slate-200 uppercase tracking-wider">
              Support & Dining
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Frequently Asked Questions</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Table Service & Delivery</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Order Status Tracking</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Privacy Policy</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Terms & Conditions</span>
              </li>
            </ul>
          </div>

          {/* CONTACT & ADMIN LOGIN COLUMN */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-bold text-slate-200 uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="text-xs text-slate-400 space-y-2.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{brandLocation || "Gulshan Market, Goneshtola, Dinajpur Sadar, Dinajpur-5200, Bangladesh"}</span>
              </p>

              <p className="flex items-center gap-2 font-mono">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={`tel:${(contactPhone || '+880 1712-345678').replace(/\s+/g, '')}`} className="hover:text-cyan-300 transition-colors">
                  {contactPhone || '+880 1712-345678'}
                </a>
              </p>

              <p className="flex items-center gap-2 font-mono">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a 
                  href={whatsappChatUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={lang === 'bn' ? 'হোয়াটসঅ্যাপে সরাসরি মেসেজ পাঠান' : 'Chat on WhatsApp'}
                  className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <span>{whatsappNumber}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </p>

              <p className="flex items-center gap-2 font-mono">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a 
                  href={gmailComposeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title={lang === 'bn' ? 'জিমেইলে সরাসরি মেসেজ পাঠান' : 'Click to send message via Gmail'}
                  className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <span>{emailAddress}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </p>
            </div>

            <div className="pt-2">
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
