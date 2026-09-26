import re

file_path = 'src/components/OrderManagementAdmin.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the Search settings bar completely from the Settings sidebar
# Let's locate the Search Bar in Settings sidebar and remove it
search_bar_pattern = r'{/\* Search Bar \*/}\s*<div className="relative">.*?</div>\s*</div>'
# Let's inspect the actual markup around the Search Bar in settings sidebar
# It is between:
# {lang === 'bn' ? '৭টি সেকশন' : '7 Sections'}
# </span>
# </div>
# and
# {/* Clean & Sleek Settings Navigation Stack
# Let's use a robust replace
old_search_block = """                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          value={settingsSearchQuery}
                          onChange={e => setSettingsSearchQuery(e.target.value)}
                          placeholder={lang === 'bn' ? '🔍 নাম, ফোন, ম্যাপ, ডোমেইন...' : '🔍 Search settings...'}
                          className="w-full pl-10 pr-8 py-2.5 rounded-2xl text-xs font-bold outline-none transition-all bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-blue-500"
                        />
                        {settingsSearchQuery && (
                          <button 
                            type="button"
                            onClick={() => setSettingsSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>"""

content = content.replace(old_search_block, "")

# 2. Remove leading numbers (1., 2., ১., ২.) from the Settings Navigation list items
content = content.replace("label: lang === 'bn' ? '১. ব্র্যান্ড ও ফোন' : '1. Brand & Contact'", "label: lang === 'bn' ? 'ব্র্যান্ড ও ফোন' : 'Brand & Contact'")
content = content.replace("label: lang === 'bn' ? '২. সিকিউরিটি ও পিন' : '2. Security & PIN'", "label: lang === 'bn' ? 'সিকিউরিটি ও পিন' : 'Security & PIN'")
content = content.replace("label: lang === 'bn' ? '৩. থিম ও ম্যাপস' : '3. Theme & Maps'", "label: lang === 'bn' ? 'থিম ও ম্যাপস' : 'Theme & Maps'")
content = content.replace("label: lang === 'bn' ? '৪. শেফ গ্যালারি' : '4. Chef Showcase'", "label: lang === 'bn' ? 'শেফ গ্যালারি' : 'Chef Showcase'")
content = content.replace("label: lang === 'bn' ? '৫. সোশ্যাল ও ব্যানার' : '5. Social & Banners'", "label: lang === 'bn' ? 'সোশ্যাল ও ব্যানার' : 'Social & Banners'")
content = content.replace("label: lang === 'bn' ? '৬. সিস্টেম ডিপ্লয়' : '6. System Update'", "label: lang === 'bn' ? 'সিস্টেম ডিপ্লয়' : 'System Update'")
content = content.replace("label: lang === 'bn' ? '৭. ডোমেইন ও কাস্টম লিংক' : '7. Domains & Custom URL'", "label: lang === 'bn' ? 'ডোমেইন ও কাস্টম লিংক' : 'Domains & Custom URL'")

# 3. Clean up Card Headers on the right to remove click handlers, hover states, View Full Page pills and leading numbers
# We will do this for all 7 cards!

# Card 2 (Security)
card2_old_header = """                {/* 2. ADMIN SECURITY, PASSWORD & PUBLIC BUTTON LOCK CARD */}
                {isSectionVisible('security', ['security', 'password', 'পাসওয়ার্ড', 'pin', 'পিন', 'lock', 'লক', 'secret', 'admin button', 'বাটন', 'কাস্টমার', 'public']) && (
                  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300 w-full">
                    {/* Header bar (Clean White) */}
                    <div 
                      onClick={() => {
                        if (settingsCategoryTab === 'all') {
                          openSettingsCategory('security');
                        }
                      }}
                      className={`w-full p-6 sm:p-8 flex items-center justify-between border-b border-slate-100 bg-white ${
                        settingsCategoryTab === 'all' ? 'cursor-pointer hover:bg-slate-50/80 transition-colors' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shrink-0">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900">{lang === 'bn' ? '২. সিকিউরিটি পাসওয়ার্ড ও এক্সেস পিন' : '2. Admin Security Password & PIN Lock'}</h2>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                              🔑 Protected
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'অ্যাডমিন প্যানেলে ঢোকার গোপন পাসওয়ার্ড এবং কাস্টমারদের জন্য "Admin" বাটন বন্ধ বা চালু রাখা।' : 'Change owner secret password and toggle public customer Admin button.'}
                          </p>
                        </div>
                      </div>

                      {settingsCategoryTab === 'all' && (
                        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-100">
                          <span>{lang === 'bn' ? 'সম্পূর্ণ পেজ দেখুন' : 'View Full Page'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>"""

card2_new_header = """                {/* 2. ADMIN SECURITY, PASSWORD & PUBLIC BUTTON LOCK CARD */}
                {isSectionVisible('security', ['security', 'password', 'পাসওয়ার্ড', 'pin', 'পিন', 'lock', 'লক', 'secret', 'admin button', 'বাটন', 'কাস্টমার', 'public']) && (
                  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300 w-full">
                    {/* Header bar (Clean White) */}
                    <div className="w-full p-6 sm:p-8 flex items-center justify-between border-b border-slate-100 bg-white">
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 shrink-0">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900">{lang === 'bn' ? 'সিকিউরিটি পাসওয়ার্ড ও এক্সেস পিন' : 'Admin Security Password & PIN Lock'}</h2>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                              🔑 Protected
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'অ্যাডমিন প্যানেলে ঢোকার গোপন পাসওয়ার্ড এবং কাস্টমারদের জন্য "Admin" বাটন বন্ধ বা চালু রাখা।' : 'Change owner secret password and toggle public customer Admin button.'}
                          </p>
                        </div>
                      </div>
                    </div>"""

content = content.replace(card2_old_header, card2_new_header)

# Card 3 (Theme & Maps)
card3_old_header = """                {/* 3. WEBSITE DARK/LIGHT THEME & GOOGLE MAPS LOCATION DISPLAY CARD */}
                {isSectionVisible('features', ['theme', 'থিম', 'dark', 'light', 'কালো', 'সاده', 'map', 'ম্যাপ', 'google map', 'গুগল ম্যাপ', 'location', 'লোケーション', 'personalization']) && (
                  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-300 w-full">
                    <div 
                      onClick={() => {
                        if (settingsCategoryTab === 'all') {
                          openSettingsCategory('features');
                        }
                      }}
                      className={`w-full p-6 sm:p-8 flex items-center justify-between border-b border-slate-100 bg-white ${
                        settingsCategoryTab === 'all' ? 'cursor-pointer hover:bg-slate-50/80 transition-colors' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-black text-slate-900">{lang === 'bn' ? '৩. ওয়েবসাইট থিম ও গুগল ম্যাপস ডিসপ্লে' : '3. Website Theme & Google Maps Display'}</h2>
                            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                              {localBrandSettings.showGoogleMap !== false ? (lang === 'bn' ? 'ম্যাপ চালু' : 'Map Active') : (lang === 'bn' ? 'ম্যাপ বন্ধ' : 'Map Off')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {lang === 'bn' ? 'অ্যাডমিন প্যানেলের ডার্ক/লাইট মোড এবং কাস্টমার ওয়েবসাইটে গুগল ম্যাপস ও লাইভ লোকেশন প্রদর্শন।' : 'Toggle dark/light mode and turn Google Maps live location on/off.'}
                          </p>
                        </div>
                      </div>

                      {settingsCategoryTab === 'all' && (
                        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-100">
                          <span>{lang === 'bn' ? 'সম্পূর্ণ পেজ দেখুন' : 'View Full Page'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>"""

# Let's search card3_old_header flexibly because it has special character 'সاده' or something
# We can search for the globe icon block
# Let's inspect the exact Card 3 start with Python first before doing the replacement
"""
