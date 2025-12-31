
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ShoppingBag, X, Search, Filter, ArrowRight, ChevronDown, 
  Trash2, Plus, Minus, Mail, Phone, MapPin, MessageCircle, 
  Minimize2, RotateCcw, Send, ShieldCheck, Zap, Globe, 
  CheckCircle2, CreditCard, Truck, PackageCheck, Info, Loader2, Mic, MicOff 
} from 'lucide-react';
import { 
  PRODUCTS, CATEGORIES, PRICE_FILTERS, USAGE_FILTERS, 
  SHOE_SIZES, CLOTHING_SIZES, MOUNT_FILTERS, FOCAL_FILTERS, GENDER_FILTERS 
} from './constants';
import { Product, CartItem, Category, Gender } from './types';
import { GoogleGenAI } from "@google/genai";
import { createClient } from '@supabase/supabase-js';

// --- Supabase Initialization ---
const SUPABASE_URL = 'https://ewmybzstnarjtueokdbf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bXlienN0bmFyanR1ZW9rZGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NTc0NjAsImV4cCI6MjA4MjAzMzQ2MH0.SZWgbytMc8IxgFzH2fM6ZnfXdf9eLoFnVdFmq6S-1w8';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- AI Assistant Logic ---

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to CLARITY. I am your technical concierge. How can I assist your selection today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isMinimized && isOpen) {
      scrollToBottom();
    }
  }, [messages, isMinimized, isOpen]);

  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('System calibration required: Your browser does not support the Clarity Voice Protocol.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    const newMessages = [...messages, { role: 'user', text: userText }] as ChatMessage[];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        history: history,
        config: {
          systemInstruction: `You are the CLARITY AI Concierge. We sell premium tech: Vision headsets, Clothing, High-end Cameras, Lenses, Headphones, and Footwear. Available products: ${PRODUCTS.map(p => `${p.name} ($${p.price})`).join(', ')}. Highlight specs, maintain a technical, elite, and ultra-concise tone.`,
        },
      });

      const result = await chat.sendMessage({ message: userText });
      const modelText = result.text || 'I apologize, I could not process that request.';
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'System stabilization in progress. Please retry.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{ role: 'model', text: 'Session reset. How can I assist your selection today?' }]);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[999] bg-black text-white p-5 md:p-6 rounded-full shadow-4xl hover:scale-110 active:scale-95 transition-all flex items-center gap-3 font-bold uppercase tracking-widest text-[10px]"
      >
        <MessageCircle size={20} /> <span className="hidden sm:inline">AI Concierge</span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[999] w-[calc(100%-3rem)] md:w-[400px] bg-white rounded-[32px] md:rounded-[40px] shadow-4xl border border-gray-100 flex flex-col transition-all duration-500 overflow-hidden ${isMinimized ? 'h-16' : 'h-[75vh] md:h-[600px]'}`}>
      <div className="bg-black text-white px-6 md:px-8 py-4 flex items-center justify-between cursor-pointer select-none" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Clarity AI</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-2 text-white/60 hover:text-white transition-colors">
            {isMinimized ? <Minimize2 size={16} /> : <ChevronDown size={18} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-2 text-white/60 hover:text-white transition-colors">
            <X size={22} strokeWidth={2.5} />
          </button>
          {!isMinimized && (
            <button onClick={(e) => { e.stopPropagation(); resetChat(); }} className="p-2 text-white/60 hover:text-white transition-colors">
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-6 no-scrollbar overscroll-contain">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 md:p-5 rounded-[20px] md:rounded-[24px] text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-black text-white shadow-md' : 'bg-gray-50 text-black border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 p-4 rounded-[20px] animate-pulse flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="px-6 md:px-8 py-6 md:py-8 border-t border-gray-50 bg-white">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Message system..."
                  className="w-full bg-gray-50 border-none rounded-full py-4 pl-6 pr-12 text-sm font-medium outline-none focus:ring-1 focus:ring-black/10"
                />
                <button 
                  onClick={startSpeechRecognition}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-300 hover:text-black'}`}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
              </div>
              <button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading} className="p-4 bg-black text-white rounded-full disabled:opacity-20 transition-opacity">
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- Checkout Modal ---

const CheckoutModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  clearCart: () => void;
}> = ({ isOpen, onClose, items, clearCart }) => {
  const [step, setStep] = useState<'address' | 'payment' | 'review' | 'success'>('address');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: ''
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (subtotal * 0.08) + (subtotal > 500 ? 0 : 25);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('orders').insert([{
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        total_amount: total,
        items: items
      }]);
      if (error) throw error;
      setStep('success');
      setTimeout(() => {
        clearCart();
        onClose();
        setStep('address');
      }, 3000);
    } catch (err) {
      console.error('Order Failure:', err);
      alert('Order Ingestion Error. Please check connectivity.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={onClose} />
      <div className="relative w-full max-w-4xl h-full md:h-auto bg-[#F3F4F6] md:rounded-[40px] shadow-4xl overflow-hidden flex flex-col">
        <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-xl font-black tracking-tighter uppercase">Protocol: Acquisition</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 md:p-12 no-scrollbar">
          {step === 'address' && (
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-black tracking-tighter">Manifest: Destination</h3>
              <div className="grid grid-cols-2 gap-6">
                <input placeholder="First Name" onChange={e => setFormData({...formData, firstName: e.target.value})} className="bg-gray-50 border-none p-4 rounded-xl font-bold outline-none" />
                <input placeholder="Last Name" onChange={e => setFormData({...formData, lastName: e.target.value})} className="bg-gray-50 border-none p-4 rounded-xl font-bold outline-none" />
                <input placeholder="Email" className="col-span-2 bg-gray-50 border-none p-4 rounded-xl font-bold outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
                <input placeholder="Street Address" className="col-span-2 bg-gray-50 border-none p-4 rounded-xl font-bold outline-none" onChange={e => setFormData({...formData, address: e.target.value})} />
                <input placeholder="City" className="bg-gray-50 border-none p-4 rounded-xl font-bold outline-none" onChange={e => setFormData({...formData, city: e.target.value})} />
                <input placeholder="Zip" className="bg-gray-50 border-none p-4 rounded-xl font-bold outline-none" onChange={e => setFormData({...formData, zip: e.target.value})} />
              </div>
              <button onClick={() => setStep('payment')} className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-widest text-[10px]">Continue</button>
            </div>
          )}
          {step === 'payment' && (
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-black tracking-tighter">Manifest: Secure Credit</h3>
              <input placeholder="Card Number" className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold outline-none" onChange={e => setFormData({...formData, cardNumber: e.target.value})} />
              <div className="grid grid-cols-2 gap-6">
                <input placeholder="MM/YY" className="bg-gray-50 border-none p-4 rounded-xl font-bold outline-none" />
                <input placeholder="CVV" type="password" className="bg-gray-50 border-none p-4 rounded-xl font-bold outline-none" />
              </div>
              <button onClick={() => setStep('review')} className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-widest text-[10px]">Final Review</button>
            </div>
          )}
          {step === 'review' && (
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
               <h3 className="text-2xl font-black tracking-tighter">Manifest: Verification</h3>
               <div className="space-y-4">
                  <div className="flex justify-between font-bold border-b pb-4"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between font-black text-2xl pt-4"><span>Total Due</span><span>${total.toFixed(2)}</span></div>
               </div>
               <button onClick={handlePlaceOrder} disabled={isSubmitting} className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                 {isSubmitting ? <Loader2 className="animate-spin" /> : 'Finalize Acquisition'}
               </button>
            </div>
          )}
          {step === 'success' && (
            <div className="text-center py-20 space-y-8 animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center mx-auto shadow-4xl"><CheckCircle2 size={40} /></div>
              <h3 className="text-4xl font-black tracking-tighter uppercase">Synchronized.</h3>
              <p className="text-gray-400">Your technical package is being prepared for dispatch.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Product Components ---

const ProductCard: React.FC<{ product: Product; onClick: (p: Product) => void }> = ({ product, onClick }) => (
  <div className="group flex flex-col gap-6 relative" onClick={() => onClick(product)}>
    <div className="relative overflow-hidden aspect-[4/5] bg-gray-50 rounded-[40px] cursor-pointer shadow-sm hover:shadow-4xl transition-all duration-700 hover:-translate-y-2">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 text-white backdrop-blur-[2px]">
        <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-500">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block opacity-60">View Details</span>
           <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Launch Protocol</span>
              <ArrowRight size={18} />
           </div>
        </div>
      </div>
      {product.isBestSeller && <div className="absolute top-6 left-6 bg-white/90 text-black text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-lg z-10">Elite Grade</div>}
    </div>
    <div className="flex flex-col px-4">
      <span className="text-[9px] font-black tracking-[0.3em] uppercase text-gray-200 mb-1">{product.brand}</span>
      <h3 className="text-2xl font-black tracking-tighter leading-none mb-2">{product.name}</h3>
      <span className="text-lg font-bold">${product.price}</span>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => 
    selectedCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === selectedCategory),
    [selectedCategory]
  );

  const addToCart = (product: Product, options: { color?: string; size?: string }) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === options.color && item.selectedSize === options.size);
      if (existing) {
        return prev.map(item => (item.id === product.id) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedColor: options.color, selectedSize: options.size }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tighter cursor-pointer" onClick={() => setSelectedCategory('All')}>CLARITY</h1>
          <nav className="hidden md:flex gap-10">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.value} 
                onClick={() => setSelectedCategory(cat.value)} 
                className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${selectedCategory === cat.value ? 'text-black border-b-2 border-black pb-1' : 'text-gray-300 hover:text-black'}`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingBag size={22} />
            {cartItems.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>}
          </button>
        </div>
      </header>

      {/* Hero */}
      {selectedCategory === 'All' && (
        <section className="h-[90vh] relative overflow-hidden flex items-center justify-center text-white">
          <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-[0.4] scale-105 animate-[drift_40s_linear_infinite]">
              <source src="https://cdn.pixabay.com/video/2024/02/09/200021-912165039_large.mp4" type="video/mp4" />
            </video>
            <div className="scanline" />
          </div>
          <div className="relative z-10 text-center px-6">
            <span className="text-[10px] font-black tracking-[0.8em] uppercase text-white/40 mb-10 block">System Core: Activated</span>
            <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none mb-12 hero-title">CLARITY</h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light mb-16">Instrumentation for the discerning user. Minimalist forms with maximal intent.</p>
            <button 
              onClick={() => {
                const element = document.getElementById('catalogue');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-black px-16 py-6 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:scale-110 transition-all shadow-4xl flex items-center gap-4 mx-auto"
            >
              Initialize Protocol <ArrowRight size={20} />
            </button>
          </div>
        </section>
      )}

      {/* Category Bar & Product Feed */}
      <section id="catalogue" className="max-w-screen-2xl mx-auto px-6 md:px-12 py-24 md:py-40">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4">
              {selectedCategory === 'All' ? 'Catalogue' : selectedCategory}
            </h2>
            <p className="text-gray-400 font-medium tracking-tight text-lg">
              Showing {filteredProducts.length} technical items.
            </p>
          </div>
          
          {/* Enhanced Category Bar */}
          <div className="flex flex-wrap gap-2 md:gap-4 items-center">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                  selectedCategory === cat.value 
                    ? 'bg-black text-white border-black shadow-lg scale-105' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} onClick={setSelectedProduct} />)}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-40 text-center">
              <Info className="mx-auto mb-6 text-gray-200" size={48} />
              <h3 className="text-2xl font-black uppercase tracking-widest text-gray-300">No Data Synchronized</h3>
              <p className="text-gray-400 mt-2">Try adjusting your filters or search parameters.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-black text-white py-40 px-12 text-center">
        <div className="flex flex-col items-center gap-12 max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-8">CLARITY</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-y border-white/10 py-12">
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Context</span>
              <ul className="text-xs font-bold space-y-2"><li>Vision</li><li>Audio</li><li>Clothing</li></ul>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Support</span>
              <ul className="text-xs font-bold space-y-2"><li>Protocols</li><li>Returns</li><li>Technical</li></ul>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Contact</span>
              <ul className="text-xs font-bold space-y-2"><li>Comms</li><li>Intelligence</li><li>HQ</li></ul>
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Social</span>
              <ul className="text-xs font-bold space-y-2"><li>Signal</li><li>Matrix</li><li>X</li></ul>
            </div>
          </div>
          <p className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase mt-8">© 2025 CLARITY SYSTEM DYNAMICS | ALL RIGHTS RESERVED</p>
        </div>
      </footer>

      <AIAssistant />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} clearCart={() => setCartItems([])} />
      
      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-6xl h-full md:h-auto bg-white md:rounded-[60px] shadow-4xl overflow-hidden flex flex-col md:flex-row">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-50 p-4 bg-black text-white rounded-full transition-transform hover:scale-110 active:scale-95 shadow-xl"><X size={24} /></button>
            <div className="w-full md:w-1/2 bg-gray-50 h-[50vh] md:h-auto overflow-hidden">
              <img src={selectedProduct.image} className="w-full h-full object-cover animate-in zoom-in-105 duration-1000" />
            </div>
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-white">
              <span className="text-[11px] font-black tracking-widest text-gray-300 uppercase mb-4">{selectedProduct.brand}</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">{selectedProduct.name}</h2>
              <p className="text-2xl font-light mb-12 flex items-center gap-4">
                <span className="font-bold">${selectedProduct.price}</span>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 uppercase tracking-widest font-black">Instock</span>
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-12 font-medium">{selectedProduct.description}</p>
              
              <div className="mb-12">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 block mb-4">Specifications</span>
                <div className="grid grid-cols-2 gap-4">
                  {selectedProduct.specs.map(spec => (
                    <div key={spec} className="flex items-center gap-2 text-sm font-bold">
                      <Zap size={14} className="text-black" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => { addToCart(selectedProduct, {}); setSelectedProduct(null); }} 
                className="w-full bg-black text-white py-8 rounded-full font-black uppercase tracking-[0.4em] text-[11px] shadow-4xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 active:scale-95"
              >
                Secure Acquisition <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-4xl p-10 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <PackageCheck size={28} />
                <h2 className="text-2xl font-black tracking-tighter uppercase">Manifest</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar pb-10">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-300">
                  <ShoppingBag size={48} className="mb-6 opacity-20" />
                  <p className="font-black uppercase tracking-widest">System Empty</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-6 items-center p-4 rounded-3xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <img src={item.image} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <h3 className="font-black text-lg tracking-tight uppercase">{item.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                         <span className="text-sm font-black text-gray-400">${item.price}</span>
                         <span className="text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-500">x{item.quantity}</span>
                      </div>
                    </div>
                    <p className="font-black text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="pt-10 border-t border-gray-100 space-y-6 bg-white">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Aggregate Total</span>
                  <span className="font-black text-3xl tracking-tighter">${cartItems.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} 
                  className="w-full bg-black text-white py-8 rounded-full font-black uppercase tracking-widest text-[11px] shadow-4xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  Initialize Checkout <CreditCard size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
