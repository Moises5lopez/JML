
import { Product, Category, Gender } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'vision-one',
    name: 'Vision One',
    brand: 'JMLxJML',
    price: 899,
    category: 'Vision',
    subCategory: 'Headset',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=1200',
    description: 'Instrumentation for the senses. A new perspective on the world you love.',
    specs: ['Retina Display', 'Haptic Audio'],
    batteryLife: '12h Active Use',
    isBestSeller: true,
    gender: 'Neutral',
    usage: 'Casual',
    colors: ['Obsidian', 'Stellar', 'Graphite']
  },
  {
    id: 'merino-tee-sport',
    name: 'Performance Merino',
    brand: 'JMLxJML APPAREL',
    price: 95,
    category: 'Clothing',
    subCategory: 'Shirt',
    usage: 'Sport',
    gender: 'Mens',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200',
    description: 'Moisture-wicking base layer for high intensity. Designed for maximum movement.',
    specs: ['Odor Resistant', 'Quick Dry'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Midnight', 'Bone', 'Slate'],
    isBestSeller: true
  },
  {
    id: 'tech-knit-womens',
    name: 'Aero Knit',
    brand: 'JMLxJML APPAREL',
    price: 110,
    category: 'Clothing',
    subCategory: 'Shirt',
    usage: 'Sport',
    gender: 'Womens',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    description: 'Engineered breathability for the female athlete. Zero-chafe construction.',
    specs: ['UV Protection', 'Ultra Lightweight'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Deep Sea', 'Sand', 'Cloud'],
    isBestSeller: false
  },
  {
    id: 'focus-c1',
    name: 'Focus C1',
    brand: 'JMLxJML OPTICS',
    price: 2499,
    category: 'Optics',
    subCategory: 'Body',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200',
    description: 'Full-frame precision with industry leading autofocus. Built for professionals.',
    specs: ['45MP Sensor', '8K Video', 'L-Mount'],
    batteryLife: '850 Shots/Charge',
    isBestSeller: true,
    mount: 'L-Mount',
    colors: ['Matte Black']
  },
  {
    id: 'lens-35mm-l',
    name: 'Prime 35mm F1.4',
    brand: 'JMLxJML OPTICS',
    price: 1299,
    category: 'Optics',
    subCategory: 'Lens',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80&w=1200',
    description: 'The definitive wide-angle lens for environmental portraiture and street photography.',
    specs: ['F1.4 Aperture', 'L-Mount', 'Weather Sealed'],
    mount: 'L-Mount',
    focalLength: '35mm',
    isBestSeller: false,
    colors: ['Black']
  },
  {
    id: 'lens-50mm-e',
    name: 'Standard 50mm F1.2',
    brand: 'JMLxJML OPTICS',
    price: 1599,
    category: 'Optics',
    subCategory: 'Lens',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    description: 'Extraordinary resolution and bokeh. The standard by which all other lenses are measured.',
    specs: ['F1.2 Aperture', 'E-Mount', 'Nano Coating'],
    mount: 'E-Mount',
    focalLength: '50mm',
    isBestSeller: true,
    colors: ['Black']
  },
  {
    id: 'audio-pure-h1',
    name: 'Pure H1',
    brand: 'JMLxJML AUDIO',
    price: 549,
    category: 'Headphones',
    subCategory: 'Over-Ear',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
    description: 'Acoustic transparency in a physical form. Pure sound reproduction without colored frequencies.',
    specs: ['Active Noise Cancellation', 'Lossless Wireless', 'Aluminum Body'],
    batteryLife: '30h Active Playback',
    isBestSeller: true,
    gender: 'Neutral',
    colors: ['Platinum', 'Carbon', 'Copper']
  },
  {
    id: 'urban-flux-8',
    name: 'Urban Flux S',
    brand: 'JMLxJML FOOTWEAR',
    price: 210,
    category: 'Footwear',
    subCategory: 'Sneakers',
    usage: 'Training',
    gender: 'Mens',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
    description: 'High-performance comfort for the modern city. Real-world durability.',
    specs: ['Energy Return Midsole'],
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Neon White', 'Stealth', 'Hyper Red'],
    isBestSeller: true
  },
  {
    id: 'executive-derby',
    name: 'Vanguard Derby',
    brand: 'JMLxJML FOOTWEAR',
    price: 350,
    category: 'Footwear',
    subCategory: 'Boots',
    usage: 'Business',
    gender: 'Mens',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200',
    description: 'Traditional aesthetics meet modern material science. Waterproof grain leather.',
    specs: ['Goodyear Welt', 'Memory Foam Insole'],
    sizes: ['9', '10', '11', '12'],
    colors: ['Cognac', 'Espresso', 'Midnight'],
    isBestSeller: false
  }
];

export const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'Vision', value: 'Vision' },
  { label: 'Audio', value: 'Headphones' },
  { label: 'Clothes', value: 'Clothing' },
  { label: 'Cameras', value: 'Optics' },
  { label: 'Shoes', value: 'Footwear' }
];

export const PRICE_FILTERS = [
  { label: 'All Prices', value: 'all' },
  { label: '< $300', value: '0-300' },
  { label: '$300 to $1500', value: '300-1500' },
  { label: '$1500+', value: '1500-plus' }
];

export const MOUNT_FILTERS = ['L-Mount', 'E-Mount', 'Fixed'];
export const USAGE_FILTERS = ['Casual', 'Sport', 'Business', 'Training'];
export const GENDER_FILTERS: Gender[] = ['Mens', 'Womens', 'Neutral'];
export const SHOE_SIZES = ['6', '7', '8', '9', '10', '11', '12'];
export const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL'];
export const COLOR_FILTERS = ['Obsidian', 'Stellar', 'Graphite', 'Midnight', 'Bone', 'Slate', 'Deep Sea', 'Sand', 'Cloud', 'Matte Black', 'Black', 'Platinum', 'Carbon', 'Copper', 'Neon White', 'Stealth', 'Hyper Red', 'Cognac', 'Espresso'];
