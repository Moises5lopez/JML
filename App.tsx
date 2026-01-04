import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ShoppingBag, X, Search, Send, MessageCircle, 
  Minimize2, ChevronDown, Trash2, Filter,
  CheckCircle2, Maximize2, ArrowRight, Menu
} from 'lucide-react';
import { 
  PRODUCTS, 
  CATEGORIES, 
  PRICE_FILTERS, 
  GENDER_FILTERS, 
  SHOE_SIZES, 
  CLOTHING_SIZES
} from './constants';
import { Product, CartItem, Category, Gender } from './types';
import { GoogleGenAI } from "@google/genai";

// --- Category Descriptions ---
const CATEGORY_META = {
  'Jeans / Pants': 'Timeless straight-leg denim and premium cuts built for daily wear and modern living.',
  'Shorts': 'Soft, breathable, and ideal for warm climates, from resort-ready linen to tech-fleece performance.',
  'Sunglasses': 'Iconic craftsmanship and endlessly versatile eyewear combining Italian tradition with modern optics.',
  'Footwear': 'Timeless everyday sneakers and reliable running shoes balancing heritage with oversized luxury.',
  'Outerwear / Knitwear': 'Refined mid-premium layering pieces and functional jackets for practical warmth and style.',
  'Backpacks & Travel': 'Premium work and travel tools, from aerospace aluminum luggage to elegant tech-friendly designs.',
  'Caps': 'Minimalist and refined headwear, from global sports classics to designer streetwear staples.',
  'Wallets': 'Slim and practical everyday essentials crafted from compact luxury leather and heritage canvas.',
  'Belts': 'Classic craftsmanship and recognizable luxury accessories in premium Italian and heritage leather.',
  'Phone Cases': 'The intersection of luxury fashion and high-tech protection for the modern digital navigator.'
};

/**
 * High-Performance Scroll Animation Component
 */
const ScrollSection: React.FC<{ children: React.ReactNode; className?: string; fullHeight?: boolean }> = ({ children, className = "", fullHeight = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    let isIntersecting = false;

    const updateStyles = () => {
      if (!isIntersecting || !containerRef.current || !contentRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      
      const distanceFromCenter = (sectionCenter - viewportCenter) / viewportHeight;
      const absDist = Math.abs(distanceFromCenter);
      
      const progress = Math.max(0, 1 - absDist * 1.5);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const el = contentRef.current;
      el.style.opacity = `${Math.min(1, progress * 4)}`;
      
      const scale = 0.95 + (0.05 * easeProgress);
      const translateY = distanceFromCenter * 100; 
      el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      
      el.style.filter = `brightness(${0.6 + (0.4 * easeProgress)})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateStyles);
    };

    const observer = new IntersectionObserver((entries) => {
      isIntersecting = entries[0].isIntersecting;
      if (isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        updateStyles();
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    }, { threshold: Array.from({length: 100}, (_, i) => i / 100) });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className={`relative w-full ${fullHeight ? 'min-h-screen' : 'py-16 md:py-32'} flex items-center justify-center overflow-hidden ${className}`}
    >
      <div 
        ref={contentRef}
        className="w-full h-full flex items-center justify-center will-change-transform"
        style={{
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.5s ease-out',
        }}
      >
        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          {children}
        </div>
      </div>
    </section>
  );
};

/**
 * Enhanced Parallax Image Component for Categories
 */
const CategoryImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let frameId: number;
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const centerOffset = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
      imgRef.current.style.transform = `scale(1.25) translateY(${centerOffset * 15}%)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden rounded-[2rem] bg-[#fcfcfc] shadow-2xl">
      <img 
        ref={imgRef}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: 'scale(1.25)' }}
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onClick: (p: Product) => void }> = ({ product, onClick }) => (
  <div className="group flex flex-col gap-5 cursor-pointer animate-fade" onClick={() => onClick(product)}>
    <div className="relative overflow-hidden aspect-[1/1] bg-[#F7F7F7] rounded-2xl transition-all duration-700 group-hover:shadow-3xl border border-transparent group-hover:border-black/5">
      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-500" />
    </div>
    <div className="flex flex-col px-1">
      <h3 className="text-xs font-bold tracking-tight uppercase mb-0.5">{product.name}</h3>
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{product.brand}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest">${product.price}</span>
      </div>
    </div>
  </div>
);

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: 'JML – Just Mad Lucky support active. How can I assist with your artifact selection today?' }]);
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
        config: { systemInstruction: "You are Just Mad Lucky (JML) Support. Minimalist, objective, helpful. Recommend products from our catalog: Jeans, Shorts, Sunglasses, Footwear, Outerwear, Backpacks, Caps, Wallets, Belts, Phone Cases. Be concise and professional." }
      });
      const result = await chat.sendMessage({ message: userText });
      setMessages(prev => [...prev, { role: 'model', text: result.text || 'Error.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Service temporarily unavailable.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !isMinimized) chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isMinimized]);

  if (!isOpen) return (
    <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-[5000] bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform">
      <MessageCircle size={24} />
    </button>
  );

  if (isMinimized) return (
    <div 
      onClick={() => setIsMinimized(false)}
      className="fixed bottom-6 right-6 z-[5000] bg-white border border-gray-100 shadow-xl rounded-full px-6 py-3 cursor-pointer hover:bg-gray-50 flex items-center gap-3 border-2 border-black/5"
    >
      <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-widest">JML Concierge</span>
      <Maximize2 size={12} className="text-gray-400" />
    </div>
  );

  return (
    <div className="fixed bottom-0 right-0 md:bottom-10 md:right-10 z-[6000] w-full md:w-[380px] bg-white border-t md:border border-gray-100 shadow-5xl rounded-t-3xl md:rounded-3xl flex flex-col overflow-hidden transition-all duration-500 h-[70vh] md:h-[500px]">
      <div className="bg-black text-white p-5 flex justify-between items-center shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-widest">JML Support</span>
        <div className="flex gap-4">
          <button onClick={() => setIsMinimized(true)} className="hover:opacity-60 transition-opacity"><Minimize2 size={16} /></button>
          <button onClick={() => setIsOpen(false)} className="hover:opacity-60 transition-opacity"><X size={18} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] font-medium leading-relaxed ${m.role === 'user' ? 'bg-black text-white' : 'bg-gray-50 text-black border border-gray-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className="bg-gray-50 p-3 rounded-2xl animate-pulse text-[10px] font-bold uppercase text-gray-400">Thinking...</div></div>}
        <div ref={chatEndRef} />
      </div>
      <div className="p-6 border-t border-gray-50 flex gap-3 bg-white pb-10 md:pb-6">
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-gray-50 border-none rounded-full px-5 py-3 text-sm outline-none font-medium" placeholder="How can Just Mad Lucky help?" />
        <button onClick={handleSendMessage} className="bg-black text-white p-3 rounded-full hover:scale-105 transition-transform"><Send size={18} /></button>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'catalogue' | 'checkout' | 'success'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activePriceFilter, setActivePriceFilter] = useState('all');
  const [activeGenderFilter, setActiveGenderFilter] = useState<Gender | 'All'>('All');
  const [activeBrandFilter, setActiveBrandFilter] = useState<string | 'All'>('All');
  
  const uniqueBrands = useMemo(() => {
    const productsToFilter = selectedCategory === 'All' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === selectedCategory);
    const brands = Array.from(new Set(productsToFilter.map(p => p.brand)));
    return ['All', ...brands.sort()];
  }, [selectedCategory]);

  const [isHeaderSearchOpen, setIsHeaderSearchOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [catalogueSearchQuery, setCatalogueSearchQuery] = useState('');
  const headerSearchInputRef = useRef<HTMLInputElement>(null);

  const [isFilterBarVisible, setIsFilterBarVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [shippingInfo, setShippingInfo] = useState({ fullName: '', address: '', city: '', zip: '', country: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });

  useEffect(() => {
    if (selectedProduct) {
      setActiveImgIdx(0);
    }
  }, [selectedProduct]);

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === selectedCategory);
    if (catalogueSearchQuery.trim()) {
      const q = catalogueSearchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q)
      );
    }
    if (activeBrandFilter !== 'All') result = result.filter(p => p.brand === activeBrandFilter);
    if (activePriceFilter !== 'all') {
      if (activePriceFilter === '0-200') result = result.filter(p => p.price < 200);
      else if (activePriceFilter === '200-1000') result = result.filter(p => p.price >= 200 && p.price <= 1000);
      else if (activePriceFilter === '1000-plus') result = result.filter(p => p.price > 1000);
    }
    if (activeGenderFilter !== 'All') result = result.filter(p => p.gender === activeGenderFilter || p.gender === 'UNISEX');
    return result;
  }, [selectedCategory, catalogueSearchQuery, activeBrandFilter, activePriceFilter, activeGenderFilter]);

  const headerSearchSuggestions = useMemo(() => {
    if (!headerSearchQuery.trim()) return [];
    const query = headerSearchQuery.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.brand.toLowerCase().includes(query)
    ).slice(0, 10); 
  }, [headerSearchQuery]);

  const navToCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setActiveBrandFilter('All'); 
    setActivePriceFilter('all'); 
    setView('catalogue');
    setIsFilterBarVisible(false);
    setIsMobileMenuOpen(false);
    setIsHeaderSearchOpen(false);
    setCatalogueSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size?: string | null, color?: string | null) => {
    setCartItems(prev => {
      const cartKey = `${product.id}-${size || 'none'}-${color || 'none'}`;
      const existing = prev.find(i => `${i.id}-${i.selectedSize || 'none'}-${i.selectedColor || 'none'}` === cartKey);
      if (existing) return prev.map(i => `${i.id}-${i.selectedSize || 'none'}-${i.selectedColor || 'none'}` === cartKey ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1, selectedSize: size || undefined, selectedColor: color || undefined }];
    });
    setSelectedProduct(null);
  };

  const removeFromCart = (cartKey: string) => {
    setCartItems(prev => prev.filter(i => `${i.id}-${i.selectedSize || 'none'}-${i.selectedColor || 'none'}` !== cartKey));
  };

  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const toggleHeaderSearch = () => {
    setIsHeaderSearchOpen(!isHeaderSearchOpen);
    if (!isHeaderSearchOpen) {
      setTimeout(() => headerSearchInputRef.current?.focus(), 100);
    } else {
      setHeaderSearchQuery('');
    }
  };

  const handleHeaderSuggestionClick = (p: Product) => {
    setSelectedProduct(p);
    setIsHeaderSearchOpen(false);
    setHeaderSearchQuery('');
  };

  const FilterDropdown: React.FC<{ label: string; id: string; currentValue: string; options: string[]; onSelect: (v: string) => void }> = ({ label, id, currentValue, options, onSelect }) => {
    const isOpen = activeDropdown === id;
    return (
      <div className="relative">
        <button 
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${isOpen || (currentValue !== 'All' && currentValue !== 'all') ? 'bg-black text-white' : 'bg-white text-gray-400 border-gray-100'}`}
        >
          {label}: {currentValue}
          <ChevronDown size={12} className={isOpen ? 'rotate-180' : ''} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 min-w-[220px] max-h-[300px] overflow-y-auto bg-white border border-gray-100 shadow-xl rounded-2xl p-2 z-[200] no-scrollbar">
            {options.map(o => (
              <button key={o} onClick={() => { onSelect(o); setActiveDropdown(null); }} className="block w-full text-left px-4 py-2 text-[10px] font-bold uppercase hover:bg-gray-50 rounded-lg">
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-black bg-white selection:bg-black selection:text-white">
      {isHeaderSearchOpen && (
        <div className="fixed inset-0 z-[6000] flex flex-col items-center pt-[10vh]">
          <div className="absolute inset-0 bg-white/95 backdrop-blur-3xl animate-fade" onClick={toggleHeaderSearch} />
          <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-12 animate-fade">
            <div className="flex justify-end">
               <button onClick={toggleHeaderSearch} className="p-4 hover:bg-gray-100 rounded-full transition-colors group">
                <X size={32} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              <div className="relative flex items-center border-b-4 border-black pb-4">
                <Search className="absolute left-0 text-gray-300" size={36} />
                <input 
                  ref={headerSearchInputRef}
                  type="text"
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  placeholder="TYPE TO EXPLORE ARCHIVE..."
                  className="w-full pl-14 text-5xl md:text-8xl font-black tracking-tighter outline-none uppercase placeholder:text-gray-100 text-black bg-transparent"
                />
              </div>
              <div className="overflow-y-auto max-h-[50vh] no-scrollbar pb-20">
                {headerSearchSuggestions.length > 0 ? (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300">Artifact Matches</span>
                      <span className="text-[10px] font-bold text-gray-400">{headerSearchSuggestions.length} items found</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {headerSearchSuggestions.map(p => (
                        <button 
                          key={p.id} 
                          onClick={() => handleHeaderSuggestionClick(p)}
                          className="flex flex-col gap-4 p-4 bg-gray-50/50 hover:bg-white hover:shadow-2xl rounded-3xl transition-all group text-left border border-transparent hover:border-black/5"
                        >
                          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                            <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          </div>
                          <div>
                            <h4 className="text-[11px] font-black uppercase tracking-tight">{p.name}</h4>
                            <p className="text-[9px] font-bold uppercase opacity-30">{p.brand}</p>
                            <p className="text-[11px] font-bold mt-2">${p.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : headerSearchQuery.trim() ? (
                  <div className="py-20 text-center"><p className="text-gray-200 text-2xl font-black uppercase tracking-widest">Archive Empty for Query</p></div>
                ) : (
                  <div className="py-20 grid grid-cols-2 md:grid-cols-5 gap-4">
                    {CATEGORIES.map(cat => (
                      <button key={cat.value} onClick={() => navToCategory(cat.value)} className="px-6 py-12 rounded-3xl bg-gray-50 text-center hover:bg-black hover:text-white transition-all">
                        <span className="text-[10px] font-bold uppercase tracking-widest">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header - Refined for logo visibility on all screens */}
      <header className="fixed top-0 left-0 w-full z-[1500] bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-[80px] md:h-[100px]">
          {/* Logo - Ensuring it stays visible */}
          <div className="flex-none shrink-0">
            <h1 className="text-xl md:text-2xl font-black tracking-widest cursor-pointer hover:opacity-70 transition-opacity" onClick={() => { setView('home'); window.scrollTo(0,0); }}>JML</h1>
          </div>

          {/* Center Navigation - Horizontal Scrolling for all devices */}
          <nav className="flex-1 flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar mask-fade-right scroll-smooth whitespace-nowrap px-8 mx-4">
            {view !== 'checkout' && view !== 'success' && (
              <>
                <button onClick={() => navToCategory('All')} className={`nav-link shrink-0 ${selectedCategory === 'All' && view === 'catalogue' ? 'active' : ''}`}>Shop All</button>
                {CATEGORIES.map(cat => (
                  <button key={cat.value} onClick={() => navToCategory(cat.value)} className={`nav-link shrink-0 ${selectedCategory === cat.value && view === 'catalogue' ? 'active' : ''}`}>{cat.label}</button>
                ))}
              </>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex-none flex items-center gap-4 md:gap-8 shrink-0">
            <button onClick={toggleHeaderSearch} className="transition-colors text-gray-300 hover:text-black">
              <Search size={20} />
            </button>
            <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative p-1">
              <ShoppingBag size={22} />
              {cartItems.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1 md:hidden">
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-[80px] z-[1400] bg-white animate-fade overflow-y-auto px-6 py-12">
            <nav className="flex flex-col gap-10">
              <button onClick={() => navToCategory('All')} className="text-5xl font-black uppercase clarity-title text-left hover:text-gray-400 transition-colors">Shop All</button>
              {CATEGORIES.map(cat => (
                <button key={cat.value} onClick={() => navToCategory(cat.value)} className="text-5xl font-black uppercase clarity-title text-left hover:text-gray-400 transition-colors">{cat.label}</button>
              ))}
            </nav>
          </div>
        )}

        {/* Cart Dropdown */}
        {isCartOpen && (
          <div className="absolute right-6 md:right-12 lg:right-24 top-full mt-2 w-[320px] md:w-[380px] bg-white border border-gray-100 shadow-5xl rounded-3xl overflow-hidden p-8 animate-fade z-[2000]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold uppercase tracking-tight">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)}><X size={20} /></button>
            </div>
            <div className="max-h-[350px] overflow-y-auto no-scrollbar space-y-4 mb-8">
              {cartItems.length === 0 ? <p className="text-gray-400 text-xs font-medium py-10 text-center uppercase tracking-widest">Bag is empty</p> : 
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <img src={item.images[0]} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1"><h3 className="text-[10px] font-bold uppercase">{item.name}</h3><p className="text-[9px] text-gray-400 uppercase">{item.brand}</p></div>
                    <button onClick={() => removeFromCart(`${item.id}-${item.selectedSize || 'none'}-${item.selectedColor || 'none'}`)} className="text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
                    <p className="text-[10px] font-bold">${item.price}</p>
                  </div>
                ))
              }
            </div>
            {cartItems.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-gray-50">
                <div className="flex justify-between font-bold uppercase text-sm"><span>Total</span><span>${cartTotal}</span></div>
                <button onClick={() => { setView('checkout'); setIsCartOpen(false); }} className="pill-button pill-button-black w-full text-center py-4">Checkout</button>
              </div>
            )}
          </div>
        )}
      </header>

      {view === 'home' ? (
        <main>
          <ScrollSection fullHeight className="bg-white">
            <div className="text-center px-4 max-w-5xl">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-300 block mb-8">Just Mad Lucky — JML</span>
              <h1 className="text-7xl md:text-[12rem] font-black clarity-title uppercase mb-12">EST. 2025</h1>
              <p className="text-lg md:text-2xl font-medium tracking-tight text-gray-500 max-w-3xl mx-auto leading-relaxed">JML — Just Mad Lucky is a modern retail brand focused on carefully selected products that combine design, functionality, and presence.</p>
              <div className="mt-16 flex flex-wrap justify-center gap-6">
                <button onClick={() => navToCategory('All')} className="pill-button pill-button-black px-12">The Archive</button>
                <button className="pill-button pill-button-white px-12">Philosophy</button>
              </div>
            </div>
          </ScrollSection>
          <ScrollSection fullHeight className="bg-black text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-8">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">The JML Philosophy</span>
                <h2 className="text-5xl md:text-8xl font-black clarity-title uppercase">Zero Noise.</h2>
                <p className="text-xl md:text-2xl text-white/50 leading-relaxed">We believe less noise creates more impact. JML is built on clarity, precision, and confidence. Every product earns its place.</p>
              </div>
              <div className="space-y-12">
                <div className="border-l-2 border-white/10 pl-8"><h3 className="text-2xl font-bold uppercase mb-4">Our Mission</h3><p className="text-white/40 text-lg">Our mission is to offer products that feel curated, not mass-produced.</p></div>
                <div className="border-l-2 border-white/10 pl-8"><h3 className="text-2xl font-bold uppercase mb-4">Material Integrity</h3><p className="text-white/40 text-lg">We prioritize materials that last.</p></div>
              </div>
            </div>
          </ScrollSection>
          {CATEGORIES.map((cat, i) => (
            <ScrollSection key={cat.value} fullHeight className="bg-white">
              <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20`}>
                <div className="flex-1 space-y-6 lg:max-w-lg">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-gray-300 uppercase block">Archive 0{i + 1}</span>
                  <h3 className="text-5xl md:text-7xl font-black clarity-title uppercase">{cat.label}</h3>
                  <p className="text-xl text-gray-400 font-medium leading-relaxed">{CATEGORY_META[cat.value as keyof typeof CATEGORY_META]}</p>
                  <button onClick={() => navToCategory(cat.value)} className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest border-b-2 border-black pb-2 transition-all hover:gap-8">Explore JML {cat.label} <ArrowRight size={16} /></button>
                </div>
                <div className="flex-1 w-full aspect-[4/3] group cursor-pointer" onClick={() => navToCategory(cat.value)}>
                   <CategoryImage src={PRODUCTS.find(p => p.category === cat.value)?.images[0] || ''} alt={cat.label} />
                </div>
              </div>
            </ScrollSection>
          ))}
        </main>
      ) : view === 'catalogue' ? (
        <section className="pt-40 md:pt-48 pb-48 px-6 md:px-12 lg:px-24 animate-fade max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-12 mb-24">
            <div>
              <h2 className="text-6xl md:text-9xl font-black clarity-title uppercase mb-8">{selectedCategory === 'All' ? 'Full Archive' : selectedCategory}</h2>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                    <input type="text" value={catalogueSearchQuery} onChange={(e) => setCatalogueSearchQuery(e.target.value)} placeholder={`Search ${selectedCategory === 'All' ? 'Full Archive' : selectedCategory}...`} className="w-full bg-gray-50 border border-transparent rounded-2xl pl-12 pr-6 py-4 text-sm font-medium focus:bg-white focus:border-black/10 outline-none transition-all" />
                  </div>
                  <p className="text-sm text-gray-400 font-medium">Displaying {filteredProducts.length} artifacts.</p>
                </div>
                <button onClick={() => setIsFilterBarVisible(!isFilterBarVisible)} className={`flex items-center gap-2 px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${isFilterBarVisible ? 'bg-black text-white' : 'bg-white text-black border-gray-100'}`}><Filter size={14} /> Parameters</button>
              </div>
            </div>
            {isFilterBarVisible && (
              <div className="flex flex-wrap gap-4 p-8 bg-gray-50/50 rounded-3xl animate-fade">
                <FilterDropdown id="brand" label="Maker" currentValue={activeBrandFilter} options={uniqueBrands} onSelect={setActiveBrandFilter} />
                <FilterDropdown id="price" label="Logistics" currentValue={activePriceFilter} options={PRICE_FILTERS.map(f => f.label)} onSelect={(v) => setActivePriceFilter(PRICE_FILTERS.find(f => f.label === v)?.value || 'all')} />
                <FilterDropdown id="gender" label="Target" currentValue={activeGenderFilter} options={['All', ...GENDER_FILTERS]} onSelect={(v) => setActiveGenderFilter(v as Gender | 'All')} />
                <button onClick={() => { setActivePriceFilter('all'); setActiveGenderFilter('All'); setCatalogueSearchQuery(''); setActiveBrandFilter('All'); }} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black ml-4">Reset Parameters</button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-16">{filteredProducts.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}</div>
          {filteredProducts.length === 0 && <div className="py-48 text-center"><h3 className="text-xl font-bold uppercase text-gray-200">Archive empty for criteria</h3></div>}
        </section>
      ) : view === 'checkout' ? (
        <section className="pt-40 md:pt-48 pb-48 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto animate-fade">
          <h2 className="text-5xl font-black clarity-title uppercase mb-16">Settlement</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className={`p-8 rounded-3xl border transition-all ${checkoutStep === 1 ? 'border-black bg-white shadow-xl' : 'border-gray-100 bg-gray-50 opacity-50'}`}>
                <h3 className="text-sm font-bold uppercase mb-6 flex items-center gap-3">01. Dispatch {checkoutStep > 1 && <button onClick={() => setCheckoutStep(1)} className="text-[10px] font-bold text-gray-400 underline ml-auto">Edit</button>}</h3>
                {checkoutStep === 1 && (
                  <div className="space-y-4">
                    <input value={shippingInfo.fullName} onChange={e => setShippingInfo({...shippingInfo, fullName: e.target.value})} className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-3 text-sm focus:border-black outline-none" placeholder="Full Name" />
                    <input value={shippingInfo.address} onChange={e => setShippingInfo({...shippingInfo, address: e.target.value})} className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-3 text-sm focus:border-black outline-none" placeholder="Dispatch Address" />
                    <button onClick={() => setCheckoutStep(2)} className="pill-button pill-button-black w-full text-center py-4 mt-4">Confirm Logistics</button>
                  </div>
                )}
              </div>
              <div className={`p-8 rounded-3xl border transition-all ${checkoutStep === 2 ? 'border-black bg-white shadow-xl' : 'border-gray-100 bg-gray-50 opacity-50'}`}>
                <h3 className="text-sm font-bold uppercase mb-6 flex items-center gap-3">02. Settlement</h3>
                {checkoutStep === 2 && (
                  <div className="space-y-4">
                    <input value={paymentInfo.cardNumber} onChange={e => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})} className="w-full bg-gray-50 border border-transparent rounded-xl px-5 py-3 text-sm focus:border-black outline-none" placeholder="Card Number" />
                    <button onClick={() => setView('success')} className="pill-button pill-button-black w-full text-center py-4 mt-4">Purchase Artifacts — ${cartTotal}</button>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50/50 p-10 rounded-3xl h-fit sticky top-32 border border-gray-100">
              <h3 className="text-sm font-bold uppercase mb-8 border-b pb-4">Artifact Details</h3>
              <div className="space-y-6">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] font-bold uppercase"><span className="text-gray-400">{item.name} x {item.quantity}</span><span>${item.price * item.quantity}</span></div>
                ))}
                <div className="pt-6 border-t flex justify-between items-end"><span className="text-xs font-bold uppercase">Total Settlement</span><span className="text-3xl font-black tracking-tighter">${cartTotal}</span></div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="min-h-screen flex flex-col items-center justify-center text-center animate-fade">
          <CheckCircle2 size={80} className="mb-8" /><h2 className="text-6xl font-black clarity-title uppercase mb-6">Confirmed.</h2>
          <p className="text-xl text-gray-400 font-medium mb-12">Your JML artifacts have been prepared for global dispatch.</p>
          <button onClick={() => { setView('home'); setCartItems([]); }} className="pill-button pill-button-black px-16">Return to Archive</button>
        </section>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-[7000] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-fade p-4 md:p-10">
          <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} />
          <div className="relative z-10 w-full max-w-6xl bg-white rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-6xl max-h-[90vh]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-3 bg-black text-white rounded-full z-20 transition-transform hover:rotate-90"><X size={20} /></button>
            <div className="w-full lg:w-1/2 flex flex-col bg-[#f9f9f9]">
              <div className="flex-1 flex items-center justify-center p-12 overflow-hidden"><img src={selectedProduct.images[activeImgIdx]} className="w-full h-full object-contain transition-all duration-500 hover:scale-105" /></div>
              <div className="flex gap-4 p-6 justify-center overflow-x-auto no-scrollbar bg-gray-50/50">
                {selectedProduct.images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImgIdx(idx)} className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImgIdx === idx ? 'border-black' : 'border-transparent opacity-40 hover:opacity-100'}`}><img src={img} className="w-full h-full object-cover" /></button>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 p-10 md:p-16 overflow-y-auto no-scrollbar bg-white">
              <div className="mb-10"><span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase block mb-4">{selectedProduct.brand}</span><h2 className="text-5xl font-black clarity-title uppercase mb-6">{selectedProduct.name}</h2><p className="text-4xl font-black tracking-tighter mb-8">${selectedProduct.price}</p><p className="text-gray-500 text-lg leading-relaxed">{selectedProduct.description}</p></div>
              <div className="mb-10 space-y-4"><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Recommended Metric</span><div className="flex flex-wrap gap-2"><div className="px-6 py-3 rounded-full text-[10px] font-bold border-2 border-black bg-black text-white">{selectedProduct.recommendedSize || 'ONE SIZE'}</div></div></div>
              <div className="space-y-4 mb-12"><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Specifications</span><div className="grid grid-cols-2 gap-4">{selectedProduct.specs.map(spec => (<div key={spec} className="flex items-center gap-3 text-[11px] font-bold uppercase text-gray-500"><div className="w-1.5 h-1.5 bg-black rounded-full" /> {spec}</div>))}</div></div>
              <button onClick={() => addToCart(selectedProduct, selectedProduct.recommendedSize)} className="pill-button pill-button-black w-full text-center py-6">Acquire for Archive</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-black text-white pt-32 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24 mb-32">
          <div className="md:col-span-2"><h2 className="text-3xl font-black tracking-widest uppercase mb-8">JML</h2><p className="text-white/30 text-lg font-light leading-relaxed max-w-sm">JML — Just Mad Lucky is a modern retail brand focused on carefully selected products that combine design, functionality, and presence.</p></div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-6">Archive Sections</h4><ul className="space-y-4 text-[10px] font-bold uppercase text-white/50"><li className="hover:text-white cursor-pointer transition-colors" onClick={() => navToCategory('All')}>Shop All</li>{CATEGORIES.slice(0, 5).map(cat => (<li key={cat.value} className="hover:text-white cursor-pointer transition-colors" onClick={() => navToCategory(cat.value)}>{cat.label}</li>))}</ul></div>
          <div><h4 className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-6">Network</h4><ul className="space-y-4 text-[10px] font-bold uppercase text-white/50"><li className="hover:text-white cursor-pointer transition-colors">Instagram</li><li className="hover:text-white cursor-pointer transition-colors">X — Archive</li><li className="hover:text-white cursor-pointer transition-colors">LinkedIn</li></ul></div>
        </div>
        <div className="max-w-screen-2xl mx-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">© 2025 JML — Just Mad Lucky Group. All Rights Reserved.</p></div>
      </footer>
      <AIAssistant />
    </div>
  );
}
