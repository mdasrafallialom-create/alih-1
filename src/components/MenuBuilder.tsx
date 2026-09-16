import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  Box, 
  Save, 
  X,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Utensils,
  Eye,
  Database,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc, orderBy, increment, writeBatch, getDocs } from 'firebase/firestore';
import { MenuItem, MenuCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';

interface MenuBuilderProps {
  restaurantId: string;
  theme?: 'light' | 'dark';
}

export default function MenuBuilder({ restaurantId, theme = 'light' }: MenuBuilderProps) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);

  // Back button handling for the add/edit item modal
  const modalPopStateRef = useRef<boolean>(false);

  useEffect(() => {
    if (isModalOpen) {
      modalPopStateRef.current = false;
      // Push subModal state to history
      window.history.pushState({ view: 'admin', tab: 'menu', subModal: 'item-edit' }, '');

      const handlePopState = (e: PopStateEvent) => {
        if (e.state && e.state.subModal === 'item-edit') {
          // Already on this state
        } else {
          modalPopStateRef.current = true;
          setIsModalOpen(false);
          setEditingItem(null);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        // If closed manually via Cancel/Save/X buttons, pop the history we pushed
        if (!modalPopStateRef.current && window.history.state?.subModal === 'item-edit') {
          window.history.back();
        }
      };
    }
  }, [isModalOpen]);

  // Fallback categories if database has none
  const fallbackCategories = [
    { id: 'pizza', name: 'Pizza' },
    { id: 'burger', name: 'Burger' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'dry-food', name: 'Dry Food' }
  ];

  const getAvailableCategories = () => {
    if (categories && categories.length > 0) {
      return categories.map(c => ({ id: c.id, name: c.name }));
    }
    return fallbackCategories;
  };

  // Form State
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    ingredients: '',
    price: 0,
    category: 'Pizza',
    categoryId: 'pizza',
    image: '',
    glbUrl: '',
    isVegetarian: false,
    isChefSpecial: false,
    isPopular: false,
    isNew: false,
    isAvailable: true,
    published: true,
    is3DEnabled: false,
    calories: 250
  });

  useEffect(() => {
    if (!restaurantId || restaurantId.trim() === '') return;

    // Load Menu Items
    const q = query(
      collection(db, "restaurants", restaurantId, "menu")
    );
    const unsubscribeMenu = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuItem[];
      const sortedList = [...list].sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      setItems(sortedList);
      setLoading(false);
    }, (err) => {
      console.warn("Menu subscription warning in MenuBuilder:", err);
      setLoading(false);
    });

    // Load Categories
    const catQuery = query(
      collection(db, "restaurants", restaurantId, "categories"),
      orderBy("displayOrder", "asc")
    );
    const unsubscribeCats = onSnapshot(catQuery, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuCategory[];
      setCategories(list);
    }, (err) => {
      console.warn("Categories subscription warning in MenuBuilder:", err);
    });

    return () => {
      unsubscribeMenu();
      unsubscribeCats();
    };
  }, [restaurantId]);

  const handleOpenModal = (item?: MenuItem) => {
    const availCats = getAvailableCategories();
    const defaultCat = availCats[0] || { id: 'pizza', name: 'Pizza' };

    if (item) {
      setEditingItem(item);
      setFormData({
        ...item,
        category: item.category || defaultCat.name,
        categoryId: item.categoryId || defaultCat.id
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        ingredients: '',
        price: 0,
        category: defaultCat.name,
        categoryId: defaultCat.id,
        image: '',
        glbUrl: '',
        isVegetarian: false,
        isChefSpecial: false,
        isPopular: false,
        isNew: false,
        isAvailable: true,
        published: true,
        is3DEnabled: false,
        calories: 250
      });
    }
    setIsModalOpen(true);
  };

  const handleImportSamples = async () => {
    if (!window.confirm("This will clear your current menu and categories to restore the professional sample menu. Continue?")) return;
    setImportLoading(true);
    try {
      // 1. Clear existing menu items and categories
      const menuSnap = await getDocs(collection(db, "restaurants", restaurantId, "menu"));
      const catSnap = await getDocs(collection(db, "restaurants", restaurantId, "categories"));
      
      const chunks = [];
      const allDocs = [...menuSnap.docs, ...catSnap.docs];
      for (let i = 0; i < allDocs.length; i += 500) {
        chunks.push(allDocs.slice(i, i + 500));
      }
      
      for (const chunk of chunks) {
        const batch = writeBatch(db);
        chunk.forEach(d => batch.delete(d.ref));
        await batch.commit();
      }

      // 2. Add fixed categories (Pizza, Burgers, Drinks, Dry Food, Desserts)
      const fixedCategories = [
        { name: 'Pizza', displayOrder: 0 },
        { name: 'Burgers', displayOrder: 1 },
        { name: 'Drinks', displayOrder: 2 },
        { name: 'Dry Food', displayOrder: 3 },
        { name: 'Desserts', displayOrder: 4 },
        { name: 'All Fruits', displayOrder: 5 },
        { name: 'Eggs', displayOrder: 6 }
      ];

      for (const cat of fixedCategories) {
        await addDoc(collection(db, "restaurants", restaurantId, "categories"), {
          ...cat,
          restaurantId,
          isVisible: true,
          createdAt: Date.now()
        });
      }

      // 3. Add sample items in smaller batches
      const chunkSize = 25;
      for (let i = 0; i < MENU_ITEMS.length; i += chunkSize) {
        const chunk = MENU_ITEMS.slice(i, i + chunkSize);
        const batch = writeBatch(db);
        chunk.forEach((item) => {
          const docRef = doc(collection(db, "restaurants", restaurantId, "menu"));
          batch.set(docRef, {
            ...item,
            restaurantId,
            createdAt: Date.now()
          });
        });
        await batch.commit();
      }

      // 4. Reset restaurant item count
      const resRef = doc(db, "restaurants", restaurantId);
      await updateDoc(resRef, { menuItemCount: MENU_ITEMS.length });

      alert("Sample menu successfully restored!");
    } catch (error) {
      console.error("Import Error:", error);
      alert("Failed to restore sample menu.");
    } finally {
      setImportLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;

    // Fast state update
    const isEditing = !!editingItem;
    const tempId = isEditing ? editingItem!.id : 'temp-' + Date.now();
    const optimisticItem: MenuItem = {
      ...editingItem,
      ...formData,
      id: tempId,
      name: formData.name.trim(),
      restaurantId,
      createdAt: editingItem?.createdAt || Date.now()
    } as MenuItem;

    if (isEditing) {
      setItems(prev => prev.map(item => item.id === tempId ? optimisticItem : item));
    } else {
      setItems(prev => [...prev, optimisticItem].sort((a, b) => (a.name || "").localeCompare(b.name || "")));
    }

    // Instantly close modal! No waiting for database round-trips!
    setIsModalOpen(false);

    try {
      if (isEditing) {
        const docRef = doc(db, "restaurants", restaurantId, "menu", tempId);
        await updateDoc(docRef, formData);
      } else {
        await addDoc(collection(db, "restaurants", restaurantId, "menu"), {
          ...formData,
          restaurantId,
          createdAt: Date.now()
        });
        const resRef = doc(db, "restaurants", restaurantId);
        await updateDoc(resRef, { menuItemCount: increment(1) });
      }
    } catch (error) {
      console.error("Save Error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    // Instantly remove item from UI
    setItems(prev => prev.filter(item => item.id !== id));

    try {
      await deleteDoc(doc(db, "restaurants", restaurantId, "menu", id));
      const resRef = doc(db, "restaurants", restaurantId);
      await updateDoc(resRef, { menuItemCount: increment(-1) });
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const itemCatId = (item.categoryId || item.category || '').toLowerCase().trim();
    const activeCatId = selectedCategory.toLowerCase().trim();
    
    // Scoped category filtering
    const matchesCategory = selectedCategory === 'All' || 
                            selectedCategory === 'all-foods' ||
                            itemCatId === activeCatId;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-2xl outline-none border transition-all ${
                theme === 'dark' ? 'bg-[#1e1e1e] border-slate-800 text-white focus:border-blue-500' : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
              }`}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full no-scrollbar">
            {['All', ...categories.map(c => c.name)].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleImportSamples}
            disabled={importLoading}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 ${
              theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {importLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            Import Samples
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Item
          </button>
        </div>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-bold animate-pulse">Syncing catalog...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className={`p-20 rounded-[3rem] border border-dashed text-center space-y-6 ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
            theme === 'dark' ? 'bg-slate-800 text-slate-600' : 'bg-slate-50 text-slate-200'
          }`}>
            <Utensils className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No items found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">Start by adding your first dish or import sample items.</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={handleImportSamples}
              disabled={importLoading}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Database className="w-4 h-4" /> Import Sample Menu
            </button>
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" /> Add Custom Item
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative rounded-[2rem] overflow-hidden border transition-all ${
                  theme === 'dark' ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl'
                }`}
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex gap-2 w-full">
                      <button 
                        onClick={() => handleOpenModal(item)}
                        className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.isChefSpecial && (
                      <span className="px-3 py-1 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">Chef Special</span>
                    )}
                    {item.isNew && (
                      <span className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">New</span>
                    )}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{item.category}</p>
                      <h4 className={`font-black text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{item.name}</h4>
                    </div>
                    <p className="text-xl font-black text-blue-600">${item.price}</p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-3">
                    {item.glbUrl && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                        <Box className="w-3 h-3" />
                        <span className="text-[9px] font-black uppercase tracking-widest">3D / AR</span>
                      </div>
                    )}
                    {item.isVegetarian && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Veg</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-4xl max-h-full overflow-hidden flex flex-col rounded-[2.5rem] border shadow-2xl ${
                theme === 'dark' ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-slate-100'
              }`}
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-inherit flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all active:scale-95 text-xs font-bold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back / পিছনে যান</span>
                  </button>
                  <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20 shrink-0">
                    <Edit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {editingItem ? 'Edit MenuItem' : 'Create New Item'}
                    </h2>
                    <p className="text-slate-500 text-xs font-medium">Define your dish specifics and AR assets.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-3 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all active:scale-95"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <form onSubmit={handleSave} className="space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side: Basic Info & Content */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <span className="w-6 h-px bg-blue-600/20" />
                          General Information
                        </h4>
                        
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dish Name *</label>
                          <input 
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="e.g. Signature Truffle Pizza"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm focus:border-blue-500 focus:bg-white transition-all shadow-sm shadow-slate-100"
                          />
                        </div>

                        <div className="space-y-4 col-span-full">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Category (Click to Tick/Select) *</label>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              Required
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                            {getAvailableCategories().map((cat) => {
                              const isSelected = (formData.categoryId || formData.category) === cat.id || formData.category?.toLowerCase() === cat.name.toLowerCase();
                              return (
                                <button
                                  key={cat.id}
                                  type="button"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      category: cat.name,
                                      categoryId: cat.id
                                    });
                                  }}
                                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                    isSelected
                                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                                    isSelected ? 'bg-white/20 border-white' : 'border-slate-300 bg-white'
                                  }`}>
                                    {isSelected && (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                  <span>{cat.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Price ($) *</label>
                            <input 
                              type="number"
                              step="0.01"
                              required
                              min="0"
                              value={formData.price}
                              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm focus:border-blue-500 focus:bg-white transition-all shadow-sm shadow-slate-100"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detailed Description</label>
                          <textarea 
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Tell the story of this dish..."
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm focus:border-blue-500 focus:bg-white transition-all resize-none shadow-sm shadow-slate-100"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Ingredients</label>
                          <textarea 
                            rows={3}
                            value={formData.ingredients || ''}
                            onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                            placeholder="e.g. Fresh Mozzarella, Truffle Oil, Basil..."
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm focus:border-blue-500 focus:bg-white transition-all resize-none shadow-sm shadow-slate-100"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <span className="w-6 h-px bg-blue-600/20" />
                          Dietary & Nutritional
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calories (kcal)</label>
                            <input 
                              type="number"
                              min="0"
                              value={formData.calories || ''}
                              onChange={(e) => setFormData({...formData, calories: Number(e.target.value)})}
                              placeholder="e.g. 450"
                              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm focus:border-blue-500 focus:bg-white transition-all shadow-sm shadow-slate-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Spiciness Level</label>
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-1.5 rounded-2xl shadow-sm shadow-slate-100">
                              {[0, 1, 2, 3].map((level) => (
                                <button
                                  key={level}
                                  type="button"
                                  onClick={() => setFormData({...formData, spiciness: level})}
                                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    formData.spiciness === level 
                                      ? 'bg-blue-600 text-white shadow-md' 
                                      : 'text-slate-400 hover:text-slate-600'
                                  }`}
                                >
                                  {level === 0 ? 'Mild' : level === 1 ? '🌶️' : level === 2 ? '🌶️🌶️' : '🌶️🌶️🌶️'}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Media & Presentation */}
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <span className="w-6 h-px bg-blue-600/20" />
                          Visual Presentation
                        </h4>
                        
                        <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cover Image URL</label>
                            <div className="relative group">
                              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                              <input 
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm focus:border-blue-500 focus:bg-white transition-all shadow-sm shadow-slate-100"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3D / AR Asset URL (GLB)</label>
                            <div className="relative group">
                              <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                              <input 
                                type="text"
                                value={formData.glbUrl}
                                onChange={(e) => setFormData({...formData, glbUrl: e.target.value})}
                                placeholder="Public link to .glb file"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm focus:border-blue-500 focus:bg-white transition-all shadow-sm shadow-slate-100"
                              />
                            </div>
                          </div>
                        </div>

                        {formData.image ? (
                          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl group">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
                            <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-sm">Preview</div>
                          </div>
                        ) : (
                          <div className="aspect-video rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 bg-slate-50/50">
                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-300 shadow-sm">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">No image selected</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
                          <span className="w-6 h-px bg-blue-600/20" />
                          Display Badges
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { key: 'isVegetarian', label: 'Vegetarian', color: 'emerald' },
                            { key: 'isChefSpecial', label: 'Chef Special', color: 'amber' },
                            { key: 'isPopular', label: 'Popular Choice', color: 'blue' },
                            { key: 'isNew', label: 'New Arrival', color: 'violet' },
                            { key: 'isAvailable', label: 'Available Now', color: 'cyan' },
                            { key: 'published', label: 'Published (Public)', color: 'indigo' },
                            { key: 'is3DEnabled', label: '3D View Enabled', color: 'purple' }
                          ].map(flag => (
                            <button
                              key={flag.key}
                              type="button"
                              onClick={() => setFormData({...formData, [flag.key]: !formData[flag.key as keyof MenuItem]})}
                              className={`flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                                formData[flag.key as keyof MenuItem] 
                                  ? `bg-${flag.color}-50 border-${flag.color}-100 text-${flag.color}-600` 
                                  : 'bg-slate-50 border-slate-100 text-slate-500'
                              }`}
                            >
                              <span className="text-[10px] font-black uppercase tracking-widest">{flag.label}</span>
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                                formData[flag.key as keyof MenuItem] 
                                  ? `bg-${flag.color}-500 text-white rotate-0` 
                                  : 'bg-slate-200 text-white -rotate-90'
                              }`}>
                                {formData[flag.key as keyof MenuItem] ? <CheckCircle2 className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4 sticky bottom-0 bg-white/80 backdrop-blur-md py-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={saveLoading}
                      className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      {saveLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                      {editingItem ? 'Update Item' : 'Create Item'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
