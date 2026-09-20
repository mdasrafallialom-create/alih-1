import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  GripVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  X,
  Loader2,
  ListTree,
  Tag,
  ArrowLeft
} from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc, orderBy, writeBatch } from 'firebase/firestore';
import { MenuCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CategoryManagerProps {
  restaurantId: string;
  theme?: 'light' | 'dark';
}

export default function CategoryManager({ restaurantId, theme = 'light' }: CategoryManagerProps) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  // Back button handling for the category modal
  const modalPopStateRef = useRef<boolean>(false);

  useEffect(() => {
    if (isModalOpen) {
      modalPopStateRef.current = false;
      // Push subModal state to history
      window.history.pushState({ view: 'admin', tab: 'categories', subModal: 'category-edit' }, '');

      const handlePopState = (e: PopStateEvent) => {
        if (e.state && e.state.subModal === 'category-edit') {
          // Already on this state
        } else {
          modalPopStateRef.current = true;
          setIsModalOpen(false);
          setEditingCategory(null);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        // If closed manually via Cancel/Save/X buttons, pop the history we pushed
        if (!modalPopStateRef.current && window.history.state?.subModal === 'category-edit') {
          window.history.back();
        }
      };
    }
  }, [isModalOpen]);

  // Form State
  const [formData, setFormData] = useState<Partial<MenuCategory>>({
    name: '',
    displayOrder: 0,
    isVisible: true
  });

  // Keywords State
  const [keywords, setKeywords] = useState<{ id: string; text: string }[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywordLoading, setKeywordLoading] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;

    const q = query(collection(db, "restaurants", restaurantId, "keywords"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as { id: string; text: string }[];
      const sorted = [...list].sort((a: any, b: any) => (a.createdAt || 0) - (b.createdAt || 0));
      setKeywords(sorted);
    }, (err) => {
      console.warn("Keywords subscription warning:", err);
    });

    return () => unsubscribe();
  }, [restaurantId]);

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywordInput.trim() || keywordLoading) return;

    const text = keywordInput.trim();
    setKeywordInput('');
    
    // Optimistic local update
    const tempId = 'temp-' + Date.now();
    setKeywords(prev => [...prev, { id: tempId, text }]);

    try {
      await addDoc(collection(db, "restaurants", restaurantId, "keywords"), {
        text,
        createdAt: Date.now()
      });
    } catch (error) {
      console.error("Add Keyword Error:", error);
      // Rollback on error
      setKeywords(prev => prev.filter(kw => kw.id !== tempId));
    }
  };

  const handleDeleteKeyword = async (id: string) => {
    try {
      await deleteDoc(doc(db, "restaurants", restaurantId, "keywords", id));
    } catch (error) {
      console.error("Delete Keyword Error:", error);
    }
  };

  useEffect(() => {
    if (!restaurantId) return;

    const q = query(
      collection(db, "restaurants", restaurantId, "categories"),
      orderBy("displayOrder", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuCategory[];
      setCategories(list);
      setLoading(false);
    }, (err) => {
      console.warn("Categories subscription warning in CategoryManager:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [restaurantId]);

  const handleOpenModal = (cat?: MenuCategory) => {
    if (cat) {
      setEditingCategory(cat);
      setFormData(cat);
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        displayOrder: categories.length > 0 ? Math.max(...categories.map(c => c.displayOrder)) + 1 : 0,
        isVisible: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) return;
    
    const isEditing = !!editingCategory;
    const tempId = isEditing ? editingCategory!.id : 'temp-' + Date.now();
    const optimisticCategory: MenuCategory = {
      id: tempId,
      name: formData.name.trim(),
      displayOrder: formData.displayOrder || 0,
      isVisible: formData.isVisible !== false,
      restaurantId,
      createdAt: editingCategory?.createdAt || Date.now()
    };

    // Fast state update
    if (isEditing) {
      setCategories(prev => prev.map(c => c.id === tempId ? optimisticCategory : c));
    } else {
      setCategories(prev => [...prev, optimisticCategory]);
    }

    // Instantly close modal!
    setIsModalOpen(false);

    try {
      if (isEditing) {
        const docRef = doc(db, "restaurants", restaurantId, "categories", tempId);
        await updateDoc(docRef, {
          name: optimisticCategory.name,
          displayOrder: optimisticCategory.displayOrder,
          isVisible: optimisticCategory.isVisible
        });
      } else {
        await addDoc(collection(db, "restaurants", restaurantId, "categories"), {
          name: optimisticCategory.name,
          displayOrder: optimisticCategory.displayOrder,
          isVisible: optimisticCategory.isVisible,
          restaurantId,
          createdAt: Date.now()
        });
      }
    } catch (error) {
      console.error("Save Category Error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure? Items in this category will remain but might not be filtered correctly.")) return;
    
    // Fast state update
    setCategories(prev => prev.filter(c => c.id !== id));

    try {
      await deleteDoc(doc(db, "restaurants", restaurantId, "categories", id));
    } catch (error) {
      console.error("Delete Category Error:", error);
    }
  };

  const toggleVisibility = async (cat: MenuCategory) => {
    // Fast state update
    setCategories(prev => prev.map(c => c.id === cat.id ? { ...c, isVisible: !c.isVisible } : c));

    try {
      const docRef = doc(db, "restaurants", restaurantId, "categories", cat.id);
      await updateDoc(docRef, { isVisible: !cat.isVisible });
    } catch (error) {
      console.error("Toggle Visibility Error:", error);
    }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === categories.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const list = [...categories];
    
    // Swap displayOrder values
    const tempOrder = list[index].displayOrder;
    list[index].displayOrder = list[newIndex].displayOrder;
    list[newIndex].displayOrder = tempOrder;

    const batch = writeBatch(db);
    batch.update(doc(db, "restaurants", restaurantId, "categories", list[index].id), { displayOrder: list[index].displayOrder });
    batch.update(doc(db, "restaurants", restaurantId, "categories", list[newIndex].id), { displayOrder: list[newIndex].displayOrder });
    
    try {
      await batch.commit();
    } catch (error) {
      console.error("Move Order Error:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Menu Categories</h2>
          <p className="text-slate-500 text-sm font-medium">Manage navigation sections and visibility.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <div className={`p-20 rounded-[3rem] border border-dashed text-center space-y-6 ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
            theme === 'dark' ? 'bg-slate-800 text-slate-600' : 'bg-slate-50 text-slate-200'
          }`}>
            <ListTree className="w-10 h-10" />
          </div>
          <p className="text-slate-500 font-bold">No categories found. Add one to start.</p>
        </div>
      ) : (
        <div className={`rounded-3xl border overflow-hidden ${
          theme === 'dark' ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b ${theme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-50 text-slate-500'}`}>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Order</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Category Name</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-center">Visibility</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-slate-800' : 'divide-slate-50'}`}>
                {categories.map((cat, index) => (
                  <tr key={cat.id} className="group hover:bg-blue-600/[0.02] transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-slate-300" />
                        <div className="flex flex-col gap-1">
                          <button 
                            disabled={index === 0}
                            onClick={() => moveOrder(index, 'up')}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md disabled:opacity-20"
                          >
                            <X className="w-3 h-3 rotate-180" />
                          </button>
                          <button 
                            disabled={index === categories.length - 1}
                            onClick={() => moveOrder(index, 'down')}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md disabled:opacity-20"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {cat.name}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => toggleVisibility(cat)}
                          className={`p-3 rounded-xl transition-all ${
                            cat.isVisible 
                              ? 'bg-emerald-50 text-emerald-600' 
                              : 'bg-rose-50 text-rose-400'
                          }`}
                        >
                          {cat.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(cat)}
                          className="p-3 rounded-xl hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat.id)}
                          className="p-3 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
         MENU KEYWORDS MANAGER (EXTRA OPTION - TASK 1)
         ===================================================================== */}
      <div className={`p-8 rounded-[2rem] border ${
        theme === 'dark' ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-slate-100 shadow-sm'
      } space-y-6`}>
        <div className="space-y-1">
          <h3 className="text-lg font-black flex items-center gap-2">
            <Tag className="w-5 h-5 text-blue-500 animate-pulse" />
            <span>Menu Keywords (Trending Highlights)</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Add keywords (e.g. Biryani, Pizza, Burger, Rosomalai) that will appear at the top of the menu as clickable tags for quick filtering.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddKeyword} className="flex gap-3 max-w-md">
          <input
            type="text"
            required
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder="e.g. Biryani"
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-xl outline-none font-bold text-xs focus:border-blue-500 transition-all text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={!keywordInput.trim()}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/10 hover:bg-blue-500 active:scale-95 transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>

        {/* Keywords list wrap */}
        <div className="pt-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">
            Active Keywords List ({keywords.length})
          </span>
          {keywords.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No keywords added yet. Add some keywords above to show them to customers.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {keywords.map((kw) => (
                <div
                  key={kw.id}
                  className="px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-100/50 dark:border-blue-900/40 flex items-center gap-2 group hover:border-blue-300 transition-all"
                >
                  <span>{kw.text}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteKeyword(kw.id)}
                    className="p-0.5 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full transition-all text-blue-400 hover:text-blue-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative w-full max-w-md rounded-[2.5rem] border shadow-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-[#1e1e1e] border-slate-800' : 'bg-white border-slate-100'
              }`}
            >
              <div className="p-8 border-b border-inherit flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all active:scale-95 text-xs font-bold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back / পিছনে</span>
                  </button>
                  <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {editingCategory ? 'Edit Category' : 'New Category'}
                  </h3>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category Name</label>
                  <input 
                    type="text"
                    required
                    autoFocus
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Pizza"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-sm focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Visibility</span>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, isVisible: !formData.isVisible})}
                    className={`p-2 rounded-lg transition-all ${
                      formData.isVisible ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-white'
                    }`}
                  >
                    {formData.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={saveLoading}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Category
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
