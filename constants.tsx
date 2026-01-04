
import { Product, Category, Gender } from './types';

export const PRODUCTS: Product[] = [
  // --- JEANS / PANTS (8 Items) ---
  {
    id: '1',
    name: '501 Original Fit',
    brand: "Levi's",
    price: 98,
    category: 'Jeans / Pants',
    gender: 'MEN',
    recommendedSize: '32-34',
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800'],
    description: 'A timeless straight-leg jean built for everyday wear. Durable, versatile, and easy to style with sneakers or boots.',
    specs: ['100% Cotton', 'Straight Leg', 'Button Fly']
  },
  {
    id: '2',
    name: '511 Slim Fit',
    brand: "Levi's",
    price: 99,
    category: 'Jeans / Pants',
    gender: 'MEN',
    recommendedSize: '32',
    images: ['https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=800'],
    description: 'A modern slim cut that feels clean without being restrictive. Ideal for daily use and casual nights out.',
    specs: ['Stretch Denim', 'Slim Fit', 'Zip Fly']
  },
  {
    id: '3',
    name: 'D-Strukt Slim',
    brand: 'Diesel',
    price: 198,
    category: 'Jeans / Pants',
    gender: 'MEN',
    recommendedSize: '32',
    images: ['https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800'],
    description: 'Premium European denim with a sharp silhouette and long-lasting construction.',
    specs: ['Italian Design', 'Premium Stretch', 'Slim Tapered']
  },
  {
    id: '4',
    name: '531 Athletic Taper',
    brand: "Levi's",
    price: 110,
    category: 'Jeans / Pants',
    gender: 'MEN',
    recommendedSize: '33',
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800'],
    description: 'Designed for comfort through the leg with a clean taper. A great everyday premium option.',
    specs: ['Comfort Stretch', 'Tapered Leg', 'Durable Finish']
  },
  {
    id: '5',
    name: 'Ribcage Straight',
    brand: "Levi's",
    price: 108,
    category: 'Jeans / Pants',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: ['https://images.unsplash.com/photo-1624372927124-e2fe8bd330b1?q=80&w=800'],
    description: 'High-rise denim that defines the waist and flatters the figure. A modern essential.',
    specs: ['Super High Rise', 'Straight Leg', 'Vintage Texture']
  },
  {
    id: '6',
    name: 'Slim Straight',
    brand: 'Diesel',
    price: 210,
    category: 'Jeans / Pants',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: ['https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=800'],
    description: 'Premium denim with a structured feel and refined finish.',
    specs: ['Premium Italian Denim', 'Straight Cut', 'Refined Wash']
  },
  {
    id: '7',
    name: 'Premium High-Rise',
    brand: "Levi's",
    price: 120,
    category: 'Jeans / Pants',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: ['https://images.unsplash.com/photo-1565084888279-aff9969704bc?q=80&w=800'],
    description: 'An elevated take on a classic silhouette, perfect for daily wear.',
    specs: ['High-Quality Cotton', 'Standard Fit', 'Durable Construction']
  },
  {
    id: '8',
    name: 'High-Waist Denim',
    brand: 'Diesel',
    price: 230,
    category: 'Jeans / Pants',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: ['https://images.unsplash.com/photo-1516762689617-e1cff9c24974?q=80&w=800'],
    description: 'Fashion-forward premium denim with durability and structure.',
    specs: ['Contemporary Silhouette', 'Premium Finish', 'Signature Branding']
  },

  // --- SHORTS (6 Items) ---
  {
    id: '9',
    name: 'Tech Fleece Shorts',
    brand: 'Nike',
    price: 95,
    category: 'Shorts',
    gender: 'MEN',
    recommendedSize: 'M',
    images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800'],
    description: 'Soft, breathable, and ideal for warm weather or travel.',
    specs: ['Tech Fleece Fabric', 'Zip Pockets', 'Lightweight Warmth']
  },
  {
    id: '10',
    name: 'Premium Essential Shorts',
    brand: 'Adidas',
    price: 90,
    category: 'Shorts',
    gender: 'MEN',
    recommendedSize: 'M',
    images: ['https://images.unsplash.com/photo-1591195853730-4e78598448ec?q=80&w=800'],
    description: 'Clean design with everyday comfort.',
    specs: ['Cotton Blend', 'Elastic Waist', 'Minimal Logo']
  },
  {
    id: '11',
    name: 'Cotton Shorts',
    brand: 'Polo Ralph Lauren',
    price: 145,
    category: 'Shorts',
    gender: 'MEN',
    recommendedSize: 'M',
    images: ['https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800'],
    description: 'Classic premium shorts with a refined, casual look.',
    specs: ['100% Twill Cotton', 'Signature Pony Logo', 'Tailored Fit']
  },
  {
    id: '12',
    name: '469 Loose Shorts',
    brand: "Levi's",
    price: 95,
    category: 'Shorts',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: ['https://images.unsplash.com/photo-1540331547168-8b6402ff2269?q=80&w=800'],
    description: 'Relaxed denim shorts perfect for everyday wear.',
    specs: ['Mid Rise', 'Loose Leg', 'Raw Hem']
  },
  {
    id: '13',
    name: 'High-Rise Denim Shorts',
    brand: "Levi's",
    price: 98,
    category: 'Shorts',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: ['https://images.unsplash.com/photo-1519058082700-12327e0f6584?q=80&w=800'],
    description: 'A summer staple with a flattering fit.',
    specs: ['Defines Waist', 'Durable Denim', 'Iconic Silhouette']
  },
  {
    id: '14',
    name: 'Premium Denim Shorts',
    brand: 'Diesel',
    price: 185,
    category: 'Shorts',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800'],
    description: 'High-quality denim with a bold yet wearable style.',
    specs: ['Premium Finish', 'Contemporary Cut', 'Signature Detail']
  },

  // --- SUNGLASSES (8 Items) ---
  {
    id: '15',
    name: 'Wayfarer',
    brand: 'Ray-Ban',
    price: 163,
    category: 'Sunglasses',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1511499767390-91f19d303d8c?q=80&w=800'],
    description: 'An iconic frame that works with any outfit.',
    specs: ['Acetate Frame', 'Classic Lenses', 'UV Protection']
  },
  {
    id: '16',
    name: 'Holbrook',
    brand: 'Oakley',
    price: 180,
    category: 'Sunglasses',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800'],
    description: 'Sport-premium sunglasses built for durability and comfort.',
    specs: ['O Matter™ Frame', 'Prizm™ Lenses', 'Impact Protection']
  },
  {
    id: '17',
    name: 'Sunglasses',
    brand: 'Tom Ford',
    price: 420,
    category: 'Sunglasses',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800'],
    description: 'Elegant, modern frames with premium materials.',
    specs: ['Luxury Finish', 'Designer Branding', 'Superior Optics']
  },
  {
    id: '18',
    name: 'Sunglasses',
    brand: 'Gucci',
    price: 480,
    category: 'Sunglasses',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1594411626019-383796696773?q=80&w=800'],
    description: 'Bold, fashion-forward design with strong brand identity.',
    specs: ['Oversized Frame', 'Signature Detail', 'Made in Italy']
  },
  {
    id: '19',
    name: 'Sunglasses',
    brand: 'Prada',
    price: 450,
    category: 'Sunglasses',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800'],
    description: 'Minimalist luxury with refined finishes.',
    specs: ['Geometric Design', 'Triangle Logo', 'Premium Optics']
  },
  {
    id: '20',
    name: 'Sunglasses',
    brand: 'Miu Miu',
    price: 420,
    category: 'Sunglasses',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800'],
    description: 'Playful yet elegant premium eyewear.',
    specs: ['Artisanal Construction', 'Distinctive Shape', 'High UV Protection']
  },
  {
    id: '21',
    name: 'Check Frame',
    brand: 'Burberry',
    price: 390,
    category: 'Sunglasses',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=80&w=800'],
    description: 'Classic British style adapted for everyday wear.',
    specs: ['Signature Check Print', 'Robust Frame', 'Timeless Appeal']
  },
  {
    id: '22',
    name: 'Sunglasses',
    brand: 'Louis Vuitton',
    price: 650,
    category: 'Sunglasses',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1625591338076-2f0858e7230b?q=80&w=800'],
    description: 'Selective luxury piece that elevates the collection.',
    specs: ['Monogram Details', 'Gold-Tone Finish', 'Exceptional Craftsmanship']
  },

  // --- FOOTWEAR (10 Items) ---
  {
    id: '23',
    name: 'Air Force 1 ’07',
    brand: 'Nike',
    price: 110,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9–10',
    images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800'],
    description: 'Comfortable, durable, and endlessly versatile.',
    specs: ['Leather Upper', 'Air Sole Unit', 'Rubber Outsole']
  },
  {
    id: '24',
    name: 'Samba OG',
    brand: 'Adidas',
    price: 100,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9',
    images: ['https://images.unsplash.com/photo-1512374382149-4332c6c02151?q=80&w=800'],
    description: 'Lightweight classic with timeless appeal.',
    specs: ['Suede T-Toe', 'Leather Frame', 'Gum Sole']
  },
  {
    id: '25',
    name: 'Superstar',
    brand: 'Golden Goose',
    price: 595,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800'],
    description: 'Premium sneaker with a worn-in luxury aesthetic.',
    specs: ['Hand-Distressed', 'Calf Leather', 'Venice Heritage']
  },
  {
    id: '26',
    name: 'Replica',
    brand: 'Maison Margiela',
    price: 670,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9',
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800'],
    description: 'Iconic design with understated branding and fashion heritage.',
    specs: ['Lambskin/Suede', 'Conceptual Staple', 'Signature Stitching']
  },
  {
    id: '27',
    name: 'Leather Sneaker',
    brand: 'Ferragamo',
    price: 720,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9',
    images: ['https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=800'],
    description: 'Italian craftsmanship meets everyday wearability.',
    specs: ['Calf Leather', 'Gancini Logo', 'Luxury Cushioning']
  },
  {
    id: '28',
    name: 'Air Force 1 Shadow',
    brand: 'Nike',
    price: 125,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7–8',
    images: ['https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800'],
    description: 'Platform design with added presence and comfort.',
    specs: ['Layered Panels', 'Exaggerated Midsole', 'Signature Look']
  },
  {
    id: '29',
    name: 'Samba OG',
    brand: 'Adidas',
    price: 100,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7–8',
    images: ['https://images.unsplash.com/photo-1593010029315-779836367504?q=80&w=800'],
    description: 'Easy to wear and always in style.',
    specs: ['Low Profile', 'Leather Upper', 'Iconic Silhouette']
  },
  {
    id: '30',
    name: 'Superstar',
    brand: 'Golden Goose',
    price: 595,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800'],
    description: 'Premium casual sneaker with strong identity.',
    specs: ['Signature Star', 'Authentic Distressing', 'Made in Italy']
  },
  {
    id: '31',
    name: 'Replica',
    brand: 'Maison Margiela',
    price: 670,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7',
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800'], // User requested repeat for 26 and 31
    description: 'Luxury sneaker that elevates simple outfits.',
    specs: ['Vintage Inspired', 'Calfskin & Suede', 'Minimal Branding']
  },
  {
    id: '32',
    name: 'Leather Sneaker',
    brand: 'Prada',
    price: 780,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7',
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800'],
    description: 'Refined, modern sneaker with premium materials.',
    specs: ['Saffiano Detail', 'Sculpted Sole', 'Triangle Branding']
  },

  // --- OUTERWEAR / KNITWEAR / SHIRTS (6 Items) ---
  {
    id: '33',
    name: 'Trucker Jacket',
    brand: "Levi's",
    price: 120,
    category: 'Outerwear / Knitwear',
    gender: 'MEN',
    recommendedSize: 'M–L',
    images: ['https://images.unsplash.com/photo-1495064447529-9aa3e4505f33?q=80&w=800'],
    description: 'A timeless jacket that works year-round.',
    specs: ['Durable Denim', 'Metal Shank Buttons', 'Classic Fit']
  },
  {
    id: '34',
    name: 'Nuptse',
    brand: 'The North Face',
    price: 330,
    category: 'Outerwear / Knitwear',
    gender: 'MEN',
    recommendedSize: 'M',
    images: ['https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=800'],
    description: 'Reliable warmth for travel and cooler climates.',
    specs: ['700-Fill Down', 'Boxy Silhouette', 'Water Repellent']
  },
  {
    id: '35',
    name: 'Quarter Zip',
    brand: 'Polo Ralph Lauren',
    price: 145,
    category: 'Outerwear / Knitwear',
    gender: 'MEN',
    recommendedSize: 'M',
    images: ['https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=800'],
    description: 'Clean, versatile layer suitable for casual or smart-casual looks.',
    specs: ['Soft Knit Cotton', 'Logo Embroidery', 'Refined Collar']
  },
  {
    id: '36',
    name: 'Trucker Jacket',
    brand: "Levi's",
    price: 120,
    category: 'Outerwear / Knitwear',
    gender: 'WOMEN',
    recommendedSize: 'M',
    images: ['https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=800'],
    description: 'An everyday essential with classic style.',
    specs: ['Standard Fit', 'Indigo Wash', 'Chest Pockets']
  },
  {
    id: '37',
    name: 'Quarter Zip',
    brand: 'Polo Ralph Lauren',
    price: 145,
    category: 'Outerwear / Knitwear',
    gender: 'WOMEN',
    recommendedSize: 'M',
    images: ['https://images.unsplash.com/photo-1532453288672-3a27e9be4efd?q=80&w=800'],
    description: 'Comfortable, polished, and easy to style.',
    specs: ['Premium Knit', 'Iconic Branding', 'Modern Silhouette']
  },
  {
    id: '38',
    name: 'Cotton Shirt',
    brand: 'Tom Ford',
    price: 520,
    category: 'Outerwear / Knitwear',
    gender: 'MEN',
    recommendedSize: 'M',
    images: ['https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?q=80&w=800'],
    description: 'Premium shirt with refined tailoring and luxury feel.',
    specs: ['Egyptian Cotton', 'Point Collar', 'Mother of Pearl Buttons']
  },

  // --- BACKPACKS & TRAVEL (6 Items) ---
  {
    id: '39',
    name: 'Alpha Bravo Backpack',
    brand: 'TUMI',
    price: 525,
    category: 'Backpacks & Travel',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800'],
    description: 'Durable, functional, and designed for work or travel.',
    specs: ['Ballistic Nylon', 'Laptop Sleeve', 'Add-A-Bag Strap']
  },
  {
    id: '40',
    name: 'Alpha Bravo Slim Backpack',
    brand: 'TUMI',
    price: 495,
    category: 'Backpacks & Travel',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800'],
    description: 'Sleeker profile for everyday urban use.',
    specs: ['Professional Design', 'Compact Storage', 'Highly Durable']
  },
  {
    id: '41',
    name: 'Voyageur Backpack',
    brand: 'TUMI',
    price: 495,
    category: 'Backpacks & Travel',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800'],
    description: 'Lightweight and elegant for daily carry.',
    specs: ['Nylon with Leather Trim', 'Multiple Compartments', 'Refined Look']
  },
  {
    id: '42',
    name: 'Carson Backpack',
    brand: 'TUMI',
    price: 450,
    category: 'Backpacks & Travel',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800'],
    description: 'Clean design with smart organization.',
    specs: ['Functional Pockets', 'Lightweight', 'High-End Finish']
  },
  {
    id: '43',
    name: 'Original Cabin',
    brand: 'Rimowa',
    price: 1200,
    category: 'Backpacks & Travel',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1566908829550-e6551b00979b?q=80&w=800'],
    description: 'High-end travel piece built to last for years.',
    specs: ['Aerospace Aluminum', 'Multiwheel® System', 'TSA Lock']
  },
  {
    id: '44',
    name: 'Essential Cabin',
    brand: 'Rimowa',
    price: 950,
    category: 'Backpacks & Travel',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=800'],
    description: 'Lightweight, modern, and practical.',
    specs: ['Polycarbonate', 'Precision Wheels', 'Lifetime Guarantee']
  },

  // --- CAPS (4 Items) ---
  {
    id: '45',
    name: 'Premium Cap',
    brand: 'Nike',
    price: 90,
    category: 'Caps',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800'],
    description: 'Everyday comfort with a clean look.',
    specs: ['Breathable Fabric', 'Adjustable Strap', 'Standard Fit']
  },
  {
    id: '46',
    name: 'Premium Cap',
    brand: 'Adidas',
    price: 90,
    category: 'Caps',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800'],
    description: 'Minimal and easy to wear.',
    specs: ['Soft Feel', 'Embroidered Logo', 'Modern Silhouette']
  },
  {
    id: '47',
    name: 'Cap',
    brand: 'Polo Ralph Lauren',
    price: 120,
    category: 'Caps',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1596455607700-d73010f91030?q=80&w=800'],
    description: 'Classic premium accessory.',
    specs: ['Chino Twill', 'Signature Branding', 'Adjustable Buckle']
  },
  {
    id: '48',
    name: 'Canvas Cap',
    brand: 'Gucci',
    price: 420,
    category: 'Caps',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800'],
    description: 'Fashion-forward statement piece.',
    specs: ['Signature Monogram', 'Leather Detail', 'Made in Italy']
  },

  // --- WALLETS (4 Items) ---
  {
    id: '49',
    name: 'Leather Wallet',
    brand: 'Montblanc',
    price: 345,
    category: 'Wallets',
    gender: 'MEN',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800'],
    description: 'Refined design with excellent durability.',
    specs: ['Calfskin Leather', 'Emblem Detail', 'Card Slots']
  },
  {
    id: '50',
    name: 'Leather Wallet',
    brand: 'Ferragamo',
    price: 395,
    category: 'Wallets',
    gender: 'MEN',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800'],
    description: 'Italian craftsmanship for everyday use.',
    specs: ['Gancini Stamp', 'Multiple Compartments', 'Luxury Finish']
  },
  {
    id: '51',
    name: 'Wallet',
    brand: 'Louis Vuitton',
    price: 690,
    category: 'Wallets',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800'],
    description: 'Luxury wallet designed for long-term wear.',
    specs: ['Canvas Monogram', 'Compact Design', 'Selective Luxury']
  },
  {
    id: '52',
    name: 'Premium Wallet',
    brand: 'Coach',
    price: 250,
    category: 'Wallets',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800'],
    description: 'Accessible premium option with quality materials.',
    specs: ['Pebbled Leather', 'Gold-Tone Hardware', 'Zippered Storage']
  },

  // --- BELTS (4 Items) ---
  {
    id: '53',
    name: 'Leather Belt',
    brand: 'Polo Ralph Lauren',
    price: 95,
    category: 'Belts',
    gender: 'MEN',
    images: ['https://images.unsplash.com/photo-1624222247344-550fbadecdc0?q=80&w=800'],
    description: 'A reliable classic that pairs with any outfit.',
    specs: ['Genuine Leather', 'Metal Buckle', 'Standard Width']
  },
  {
    id: '54',
    name: 'Gancini Belt',
    brand: 'Ferragamo',
    price: 395,
    category: 'Belts',
    gender: 'MEN',
    images: ['https://images.unsplash.com/photo-1624222247344-550fbadecdc0?q=80&w=800'],
    description: 'Elegant premium belt with iconic hardware.',
    specs: ['Reversible Design', 'Iconic Buckle', 'High-End Finish']
  },
  {
    id: '55',
    name: 'Marmont Belt',
    brand: 'Gucci',
    price: 520,
    category: 'Belts',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1624222247344-550fbadecdc0?q=80&w=800'],
    description: 'Recognizable design that elevates any look.',
    specs: ['Double G Buckle', 'Supple Leather', 'Signature Piece']
  },
  {
    id: '56',
    name: 'H Belt',
    brand: 'Hermès',
    price: 1100,
    category: 'Belts',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1624222247344-550fbadecdc0?q=80&w=800'],
    description: 'Selective luxury piece with timeless appeal.',
    specs: ['Gold-Plated Hardware', 'Epsom Leather', 'Exceptional Craftsmanship']
  },

  // --- PHONE CASES (4 Items) ---
  {
    id: '57',
    name: 'Leather iPhone Case',
    brand: 'TUMI',
    price: 150,
    category: 'Phone Cases',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbab?q=80&w=800'],
    description: 'Premium leather protection with a professional finish.',
    specs: ['MagSafe Compatible', 'Slim Fit', 'Raised Edges']
  },
  {
    id: '58',
    name: 'Textured Protective Case',
    brand: 'TUMI',
    price: 120,
    category: 'Phone Cases',
    gender: 'UNISEX',
    images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbab?q=80&w=800'],
    description: 'Durable and clean design for daily use.',
    specs: ['Impact Protection', 'Textured Grip', 'Branded Detail']
  },
  {
    id: '59',
    name: 'Leather MagSafe Case',
    brand: 'Apple',
    price: 99,
    category: 'Phone Cases',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbab?q=80&w=800'],
    description: 'Official Apple accessory with slim profile and premium feel.',
    specs: ['Soft-Touch Leather', 'Apple Eco-System', 'Reliable Protection']
  },
  {
    id: '60',
    name: 'iPhone Case',
    brand: 'Louis Vuitton',
    price: 450,
    category: 'Phone Cases',
    gender: 'WOMEN',
    images: ['https://images.unsplash.com/photo-1601784551446-20c9e07cdbab?q=80&w=800'],
    description: 'Luxury phone case combining fashion and function.',
    specs: ['Monogram Canvas', 'Microfiber Lining', 'Designer Presence']
  }
];

export const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'Pants', value: 'Jeans / Pants' },
  { label: 'Shorts', value: 'Shorts' },
  { label: 'Sunglasses', value: 'Sunglasses' },
  { label: 'Footwear', value: 'Footwear' },
  { label: 'Outerwear', value: 'Outerwear / Knitwear' },
  { label: 'Travel', value: 'Backpacks & Travel' },
  { label: 'Hats', value: 'Caps' },
  { label: 'Wallets', value: 'Wallets' },
  { label: 'Belts', value: 'Belts' },
  { label: 'Phone Cases', value: 'Phone Cases' }
];

export const PRICE_FILTERS = [
  { label: 'All', value: 'all' },
  { label: '$90 - $200', value: '0-200' },
  { label: '$200 - $1000', value: '200-1000' },
  { label: '$1000+', value: '1000-plus' }
];

export const GENDER_FILTERS: Gender[] = ['MEN', 'WOMEN', 'UNISEX'];
export const SHOE_SIZES = ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'];
export const CLOTHING_SIZES = ['S', 'M', 'L', 'XL'];
