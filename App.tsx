
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ShoppingBag, X, Search, ArrowRight, RotateCcw, Send, MessageCircle, 
  Minimize2, ChevronDown, Trash2, Plus, Minus, CreditCard, Loader2, Zap, Info, Filter
} from 'lucide-react';
import { 
  PRODUCTS, 
  CATEGORIES, 
  PRICE_FILTERS, 
  MOUNT_FILTERS, 
  USAGE_FILTERS, 
  GENDER_FILTERS, 
  SHOE_SIZES, 
  CLOTHING_SIZES,
  COLOR_FILTERS
} from './constants';
import { Product, CartItem, Category, Gender } from './types';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

const ProductCard: React.FC<{ product: Product; onClick: (p: Product) => void }> = ({ product, onClick }) => (
  <div className="group flex flex-col gap-6 cursor-pointer" onClick={() => onClick(product)}>
    <div className="relative overflow-hidden aspect-[4/5] bg-[#F5F5F5] rounded-[3rem] transition-all duration-700 hover:shadow-2xl">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
    </div>
    <div className="flex flex-col px-4 text-center">
      <h3 className="text-xl font-black tracking-tighter uppercase mb-1">{product.name}</h3>
      <span className="text-sm font-bold text-gray-400">${product.price}</span>
    </div>
  </div>
);

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: 'SYSTEM CORE 0.1. How can I assist your search in the JML Archive?' }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { systemInstruction: "You are the JML Assistant. Monochromatic, efficient, professional. We sell high-fidelity instrumentation: Vision, Optics, Clothing, and Footwear." }
      });
      const result = await chat.sendMessage({ message: userText });
      setMessages(prev => [...prev, { role: 'model', text: result.text || 'Error.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'System stabilization required.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className="fixed bottom-10 right-10 z-[100] bg-black text-white p-6 rounded-full shadow-2xl hover:scale-110 transition-transform">
      <MessageCircle size={24} />
    </button>
  );

  return (
    <div className={`fixed bottom-10 right-10 z-[100] w-[400px] bg-white border border-gray-100 shadow-4xl rounded-[2.5rem] flex flex-col overflow-hidden transition-all duration-500 ${isMinimized ? 'h-16' : 'h-[600px]'}`}>
      <div className="bg-black text-white p-6 flex justify-between items-center cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
        <span className="text-[10px] font-black uppercase tracking-widest">JML SYSTEM CORE 0.1</span>
        <div className="flex gap-4">
          <button onClick={() => setIsMinimized(!isMinimized)}><Minimize2 size={16} /></button>
          <button onClick={() => setIsOpen(false)}><X size={18} /></button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[2rem] text-[13px] font-medium leading-relaxed ${m.role === 'user' ? 'bg-black text-white shadow-xl' : 'bg-gray-100 text-black'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-8 border-t border-gray-50 flex gap-4">
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-gray-100 border-none rounded-full px-6 py-4 text-sm outline-none font-bold" placeholder="Query system..." />
            <button onClick={handleSendMessage} className="bg-black text-white p-4 rounded-full"><Send size={18} /></button>
          </div>
        </>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'catalogue'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activePriceFilter, setActivePriceFilter] = useState('all');
  const [activeGenderFilter, setActiveGenderFilter] = useState<Gender | 'All'>('All');
  const [activeUsageFilter, setActiveUsageFilter] = useState<string | 'All'>('All');
  const [activeSizeFilter, setActiveSizeFilter] = useState<string | 'All'>('All');
  const [activeMountFilter, setActiveMountFilter] = useState<string | 'All'>('All');
  const [activeColorFilter, setActiveColorFilter] = useState<string | 'All'>('All');
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const resetFilters = () => {
    setActivePriceFilter('all');
    setActiveGenderFilter('All');
    setActiveUsageFilter('All');
    setActiveSizeFilter('All');
    setActiveMountFilter('All');
    setActiveColorFilter('All');
  };

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === selectedCategory);

    // Price Filter
    if (activePriceFilter !== 'all') {
      if (activePriceFilter === '0-300') result = result.filter(p => p.price < 300);
      else if (activePriceFilter === '300-1500') result = result.filter(p => p.price >= 300 && p.price <= 1500);
      else if (activePriceFilter === '1500-plus') result = result.filter(p => p.price > 1500);
    }

    // Gender Filter
    if (activeGenderFilter !== 'All') {
      result = result.filter(p => p.gender === activeGenderFilter || p.gender === 'Neutral');
    }

    // Usage Filter
    if (activeUsageFilter !== 'All') {
      result = result.filter(p => p.usage === activeUsageFilter);
    }

    // Size Filter
    if (activeSizeFilter !== 'All') {
      result = result.filter(p => p.sizes?.includes(activeSizeFilter));
    }

    // Mount Filter
    if (activeMountFilter !== 'All') {
      result = result.filter(p => p.mount === activeMountFilter);
    }

    // Color Filter
    if (activeColorFilter !== 'All') {
      result = result.filter(p => p.colors?.includes(activeColorFilter));
    }

    return result;
  }, [selectedCategory, activePriceFilter, activeGenderFilter, activeUsageFilter, activeSizeFilter, activeMountFilter, activeColorFilter]);

  const bestSellers = useMemo(() => PRODUCTS.filter(p => p.isBestSeller), []);

  const navToCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setView('catalogue');
    resetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navToHome = () => {
    setView('home');
    setSelectedCategory('All');
    resetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Helper for filter UI
  const FilterPill: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
    <button 
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${
        active 
          ? 'bg-black text-white border-black shadow-lg scale-105' 
          : 'bg-white text-gray-300 border-gray-100 hover:border-black hover:text-black'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md px-12 py-10 md:px-24 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-10 md:gap-16 lg:gap-24 overflow-hidden">
          <h1 className="text-4xl font-black tracking-tighter cursor-pointer shrink-0" onClick={navToHome}>JML</h1>
          <nav className="flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar py-2 scroll-smooth">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.value} 
                onClick={() => navToCategory(cat.value)}
                className={`nav-link whitespace-nowrap ${selectedCategory === cat.value && view === 'catalogue' ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-6 md:gap-10 ml-4 shrink-0">
          <button className="p-2 text-gray-300 hover:text-black transition-colors hidden sm:block"><Search size={22} /></button>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingBag size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {view === 'home' ? (
        <main className="pt-32 animate-fade">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03] w-full pointer-events-none select-none">
              <h1 className="text-[30vw] font-black jml-title uppercase">Future</h1>
            </div>
            <div className="space-y-6 mb-20">
              <span className="text-[10px] font-black tracking-[0.8em] uppercase text-gray-300 block">System Core 0.1 — Future Archive</span>
              <h1 className="text-8xl md:text-[15rem] font-black jml-title uppercase">JML</h1>
              <p className="text-2xl md:text-3xl font-medium tracking-tight max-w-4xl mx-auto leading-relaxed">
                Engineering tools for a focused existence.<br />Minimalist form. Maximalist utility.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={() => navToCategory('Vision')} className="pill-button pill-button-black">Browse the Registry</button>
              <button className="pill-button pill-button-white">Learn Philosophy</button>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="bg-black text-white py-64 px-12 md:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center text-left">
              <div className="space-y-16">
                <span className="text-[10px] font-black tracking-[0.6em] uppercase text-white/30">The JML Philosophy</span>
                <h2 className="text-8xl md:text-[10rem] font-black jml-title uppercase leading-none">Tools for Focus.</h2>
                <p className="text-2xl text-white/60 leading-relaxed font-light">
                  We reject the attention economy. Our artifacts are designed to augment human performance without demanding constant distraction.
                </p>
              </div>
              <div className="space-y-24">
                <div className="border-l-2 border-white/10 pl-12">
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-6">01. Cognitive Transparency</h3>
                  <p className="text-white/50 text-xl leading-relaxed font-light">Technology should be an invisible bridge. We utilize non-intrusive haptics and spatial sensing to ensure you remain in the physical world.</p>
                </div>
                <div className="border-l-2 border-white/10 pl-12">
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-6">02. Structural Integrity</h3>
                  <p className="text-white/50 text-xl leading-relaxed font-light">Material honesty is a moral imperative. From milled titanium to carbon-captured textiles, our physical components are engineered to endure.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Innovation Hub */}
          <section className="py-40 bg-[#F9F9F9] px-12 md:px-24 text-center">
             <div className="max-w-5xl mx-auto space-y-12">
                <span className="text-[10px] font-black tracking-[0.8em] uppercase text-gray-300 block">Innovation Hub</span>
                <h2 className="text-7xl md:text-9xl font-black jml-title uppercase">Beyond Boundaries.</h2>
                <p className="text-2xl text-gray-400 font-medium max-w-3xl mx-auto">
                  JML instruments are meticulously engineered to serve as high-fidelity extensions of the human experience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20">
                   <div className="space-y-6">
                      <div className="w-20 h-20 bg-white shadow-xl rounded-[2rem] flex items-center justify-center mx-auto"><Zap /></div>
                      <h4 className="font-black uppercase tracking-widest text-sm">AI Vision</h4>
                   </div>
                   <div className="space-y-6">
                      <div className="w-20 h-20 bg-white shadow-xl rounded-[2rem] flex items-center justify-center mx-auto"><Info /></div>
                      <h4 className="font-black uppercase tracking-widest text-sm">Pure Optics</h4>
                   </div>
                   <div className="space-y-6">
                      <div className="w-20 h-20 bg-white shadow-xl rounded-[2rem] flex items-center justify-center mx-auto"><RotateCcw /></div>
                      <h4 className="font-black uppercase tracking-widest text-sm">Neural Fit</h4>
                   </div>
                </div>
             </div>
          </section>

          {/* Registry Selection */}
          <section className="py-40 px-12 md:px-24">
            <div className="text-center mb-24">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-300 block mb-6">The Archive Categories</span>
              <h2 className="text-7xl md:text-9xl font-black jml-title uppercase">Registry Selection.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
              {CATEGORIES.map(cat => (
                <div key={cat.value} className="category-pill group cursor-pointer" onClick={() => navToCategory(cat.value)}>
                  <div className="aspect-[4/5] relative">
                    <img src={PRODUCTS.find(p => p.category === cat.value)?.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-5xl font-black tracking-tighter uppercase">{cat.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Best Sellers */}
          <section className="py-40 px-12 md:px-24 border-t border-gray-100">
             <div className="max-w-screen-2xl mx-auto">
                <h2 className="text-7xl md:text-9xl font-black jml-title uppercase mb-24 text-center">Elite Archives.</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
                  {bestSellers.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
                </div>
             </div>
          </section>
        </main>
      ) : (
        /* Catalogue View */
        <section id="catalogue" className="max-w-screen-2xl mx-auto px-12 md:px-24 py-56 animate-fade">
          <div className="flex flex-col gap-12 mb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div className="text-left">
                <button onClick={navToHome} className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6 hover:text-black transition-colors flex items-center gap-2">
                  <RotateCcw size={14} /> Back to Hub
                </button>
                <h2 className="text-8xl md:text-[10rem] font-black jml-title uppercase mb-6">
                  {selectedCategory}
                </h2>
                <p className="text-2xl text-gray-400 font-medium tracking-tight">
                  System matched: {filteredProducts.length} entries for current filter.
                </p>
              </div>
            </div>

            {/* Dynamic Filter Section */}
            <div className="bg-[#F9F9F9] p-10 md:p-16 rounded-[4rem] space-y-12 text-left">
               <div className="flex items-center gap-4 text-gray-400 mb-4">
                  <Filter size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Refine Registry</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                  {/* Common: Price Filter */}
                  <div className="space-y-6">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block">Price Range</span>
                    <div className="flex flex-wrap gap-3">
                      {PRICE_FILTERS.map(f => (
                        <FilterPill key={f.value} label={f.label} active={activePriceFilter === f.value} onClick={() => setActivePriceFilter(f.value)} />
                      ))}
                    </div>
                  </div>

                  {/* Common: Color Filter */}
                  <div className="space-y-6">
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block">Finish / Color</span>
                    <div className="flex flex-wrap gap-3 max-h-40 overflow-y-auto no-scrollbar p-1">
                      {['All', ...new Set(PRODUCTS.filter(p => p.category === selectedCategory || selectedCategory === 'All').flatMap(p => p.colors || []))].map(c => (
                        <FilterPill key={c} label={c} active={activeColorFilter === c} onClick={() => setActiveColorFilter(c)} />
                      ))}
                    </div>
                  </div>

                  {/* Category Specific: Mount (Optics only) */}
                  {selectedCategory === 'Optics' && (
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block">Mount System</span>
                      <div className="flex flex-wrap gap-3">
                        {['All', ...MOUNT_FILTERS].map(m => (
                          <FilterPill key={m} label={m} active={activeMountFilter === m} onClick={() => setActiveMountFilter(m)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category Specific: Gender (Clothing, Footwear, Audio, Vision) */}
                  {(selectedCategory === 'Clothing' || selectedCategory === 'Footwear' || selectedCategory === 'Headphones' || selectedCategory === 'Vision') && (
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block">Gender Target</span>
                      <div className="flex flex-wrap gap-3">
                        {['All', ...GENDER_FILTERS].map(g => (
                          <FilterPill key={g} label={g} active={activeGenderFilter === g} onClick={() => setActiveGenderFilter(g as Gender | 'All')} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category Specific: Usage (Clothing, Footwear, Vision) */}
                  {(selectedCategory === 'Clothing' || selectedCategory === 'Footwear' || selectedCategory === 'Vision') && (
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block">Usage Context</span>
                      <div className="flex flex-wrap gap-3">
                        {['All', ...USAGE_FILTERS].map(u => (
                          <FilterPill key={u} label={u} active={activeUsageFilter === u} onClick={() => setActiveUsageFilter(u)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category Specific: Sizes (Clothing, Footwear) */}
                  {selectedCategory === 'Clothing' && (
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block">Apparel Size</span>
                      <div className="flex flex-wrap gap-3">
                        {['All', ...CLOTHING_SIZES].map(s => (
                          <FilterPill key={s} label={s} active={activeSizeFilter === s} onClick={() => setActiveSizeFilter(s)} />
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCategory === 'Footwear' && (
                    <div className="space-y-6">
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block">Metric Size</span>
                      <div className="flex flex-wrap gap-3">
                        {['All', ...SHOE_SIZES].map(s => (
                          <FilterPill key={s} label={s} active={activeSizeFilter === s} onClick={() => setActiveSizeFilter(s)} />
                        ))}
                      </div>
                    </div>
                  )}
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-64 text-center">
                <h3 className="text-4xl font-black uppercase tracking-widest text-gray-200">No matching entries found</h3>
                <button onClick={resetFilters} className="mt-8 text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 hover:text-gray-400 transition-colors">Reset Archive Parameters</button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-64 px-12 md:px-24 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 text-left">
          <div className="col-span-1 lg:col-span-1 space-y-12">
            <h2 className="text-7xl font-black jml-title uppercase cursor-pointer" onClick={navToHome}>JML</h2>
            <p className="text-lg text-white/40 leading-relaxed font-light">
              Technical instrumentation for the conscious observer. Curated with intentional precision. Designed in California.
            </p>
          </div>
          <div className="space-y-10">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/20 block">The Archive</span>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest text-white/60">
               <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navToCategory('Vision')}>Vision Labs</li>
               <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navToCategory('Clothing')}>Technical Textiles</li>
               <li className="hover:text-white cursor-pointer transition-colors">Optical Hardware</li>
               <li className="hover:text-white cursor-pointer transition-colors" onClick={() => navToCategory('Footwear')}>Kinetic Footwear</li>
            </ul>
          </div>
          <div className="space-y-10">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/20 block">Registry Docs</span>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest text-white/60">
               <li className="hover:text-white cursor-pointer transition-colors">The Manifesto</li>
               <li className="hover:text-white cursor-pointer transition-colors">Supply Chain Ledger</li>
               <li className="hover:text-white cursor-pointer transition-colors">Privacy Protocol</li>
            </ul>
          </div>
          <div className="space-y-10">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/20 block">Channels</span>
            <ul className="space-y-6 text-sm font-bold uppercase tracking-widest text-white/60">
               <li className="hover:text-white cursor-pointer transition-colors">Signal</li>
               <li className="hover:text-white cursor-pointer transition-colors">Matrix</li>
               <li className="hover:text-white cursor-pointer transition-colors">X</li>
            </ul>
          </div>
        </div>
        <div className="max-w-screen-2xl mx-auto mt-40 pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
           <span className="text-[10px] font-black tracking-[0.8em] text-white/20 uppercase">© 2025 JML SYSTEM INC.</span>
           <div className="flex gap-10">
              <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">Terms</span>
              <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">Privacy</span>
           </div>
        </div>
      </footer>

      <AIAssistant />
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-12 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-7xl h-full md:h-auto bg-white md:rounded-[5rem] shadow-4xl overflow-hidden flex flex-col md:flex-row text-left">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-10 right-10 z-[1100] p-6 bg-black text-white rounded-full transition-transform hover:scale-110 active:scale-95 shadow-2xl"><X size={32} /></button>
            <div className="w-full md:w-3/5 bg-gray-100 h-[50vh] md:h-auto">
              <img src={selectedProduct.image} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-2/5 p-16 md:p-24 flex flex-col justify-center">
              <span className="text-[11px] font-black tracking-[0.5em] text-gray-300 uppercase mb-6">{selectedProduct.brand}</span>
              <h2 className="text-7xl md:text-8xl font-black jml-title uppercase mb-10 leading-none">{selectedProduct.name}</h2>
              <p className="text-4xl font-black mb-12">${selectedProduct.price}</p>
              <p className="text-gray-500 text-xl leading-relaxed mb-16 font-light">{selectedProduct.description}</p>
              
              <div className="mb-20 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 block">Registry Details</span>
                <div className="grid grid-cols-1 gap-4">
                  {selectedProduct.specs.map(spec => (
                    <div key={spec} className="flex items-center gap-4 text-base font-bold uppercase tracking-tight">
                      <Zap size={16} /> {spec}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} 
                className="pill-button pill-button-black w-full text-center"
              >
                Secure Acquisition
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-xl bg-white h-full shadow-4xl p-16 flex flex-col animate-in slide-in-from-right duration-500 text-left">
            <div className="flex items-center justify-between mb-20">
              <h2 className="text-4xl font-black tracking-tighter uppercase">Manifest.</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-4 hover:bg-gray-100 rounded-full transition-colors"><X size={32} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-12 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-200">
                  <h3 className="text-2xl font-black uppercase tracking-[0.5em]">System Empty.</h3>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-10 items-center">
                    <img src={item.image} className="w-32 h-32 rounded-[2rem] object-cover shadow-lg" />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-black text-2xl tracking-tighter uppercase">{item.name}</h3>
                      <div className="flex items-center gap-6">
                         <span className="text-lg font-bold text-gray-400">${item.price}</span>
                         <span className="text-xs font-black bg-gray-100 px-3 py-1 rounded-full text-gray-500">Q: {item.quantity}</span>
                      </div>
                    </div>
                    <p className="font-black text-2xl">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="pt-16 border-t border-gray-100 space-y-10">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 font-black uppercase text-[10px] tracking-[0.5em]">Grand Aggregate Total</span>
                  <span className="font-black text-5xl tracking-tighter">${cartItems.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}</span>
                </div>
                <button 
                  className="pill-button pill-button-black w-full"
                >
                  Finalize Acquisition
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
