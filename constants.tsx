
import { Product, Category, Gender } from './types';

export const PRODUCTS: Product[] = [
  // JEANS / PANTS (Archive 01)
  {
    id: 'levis-501-men',
    name: '501 Original Fit',
    brand: "Levi's",
    price: 98,
    category: 'Jeans / Pants',
    gender: 'MEN',
    recommendedSize: '32-34',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576708441444-8377328d9a0d?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The original straight-leg jean. Durable, timeless, and easy to style with sneakers or boots. A staple of functional fashion.',
    specs: ['100% Cotton', 'Straight Leg', 'Button Fly']
  },
  {
    id: 'levis-511-men',
    name: '511 Slim Fit',
    brand: "Levi's",
    price: 99,
    category: 'Jeans / Pants',
    gender: 'MEN',
    recommendedSize: '32',
    images: [
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1604176354204-926873ff34b0?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A modern slim silhouette that works for daily wear without feeling restrictive. Designed for the modern navigator.',
    specs: ['Stretch Denim', 'Slim Fit', 'Zip Fly']
  },
  {
    id: 'apc-pns-men',
    name: 'Petit New Standard',
    brand: 'A.P.C.',
    price: 215,
    category: 'Jeans / Pants',
    gender: 'MEN',
    recommendedSize: '32',
    images: [
      'https://images.unsplash.com/photo-1604176354204-926873ff34b0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565084888279-aff9969704bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Clean, minimalist premium denim for a sharp, effortless look. Japanese selvedge denim that ages with character.',
    specs: ['Japanese Selvedge', 'Raw Denim', 'Minimalist Design']
  },
  {
    id: 'diesel-dst-men',
    name: 'D-Strukt Slim',
    brand: 'Diesel',
    price: 198,
    category: 'Jeans / Pants',
    gender: 'MEN',
    recommendedSize: '32',
    images: [
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516762689617-e1cff9c24974?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Premium European denim with a slightly bolder attitude while remaining wearable. Engineered for urban exploration.',
    specs: ['Italian Design', 'Premium Stretch', 'Slim Tapered']
  },
  {
    id: 'levis-rib-women',
    name: 'Ribcage Straight',
    brand: "Levi's",
    price: 108,
    category: 'Jeans / Pants',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624372927124-e2fe8bd330b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A flattering high-rise jean that defines the waist and elongates the legs. Inspired by vintage aesthetics.',
    specs: ['12" Super High Rise', 'Straight Leg', 'Vintage Texture']
  },
  {
    id: 'agolde-90s-women',
    name: '90s Pinch Waist',
    brand: 'Agolde',
    price: 198,
    category: 'Jeans / Pants',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: [
      'https://images.unsplash.com/photo-1624372927124-e2fe8bd330b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Vintage-inspired premium denim with structure and style. Designed to hug the waist and fall into a relaxed leg.',
    specs: ['Organic Cotton', 'Pinch Waist', 'Sustainability Minded']
  },
  {
    id: 'frame-lhs-women',
    name: 'Le High Straight',
    brand: 'Frame',
    price: 228,
    category: 'Jeans / Pants',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: [
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565084888279-aff9969704bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624372927124-e2fe8bd330b1?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Polished, premium denim that transitions easily from day to night. Superior stretch and recovery.',
    specs: ['Premium Stretch', 'High Rise', 'Straight Leg']
  },
  {
    id: 'ysl-ss-women',
    name: 'Signature Skinny',
    brand: 'Saint Laurent',
    price: 890,
    category: 'Jeans / Pants',
    gender: 'WOMEN',
    recommendedSize: '27-28',
    images: [
      'https://images.unsplash.com/photo-1565084888279-aff9969704bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516762689617-e1cff9c24974?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A refined luxury jean with a sharp silhouette and timeless appeal. Crafted in Italy with meticulous attention.',
    specs: ['Luxury Italian Denim', 'Ultra-Slim Fit', 'Designer Finish']
  },

  // SHORTS (Archive 02)
  {
    id: 'nike-tf-men',
    name: 'Tech Fleece Shorts',
    brand: 'Nike',
    price: 95,
    category: 'Shorts',
    gender: 'MEN',
    recommendedSize: 'M',
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591195853730-4e78598448ec?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800'
    ],
    description: 'The definitive standard for technical athletic comfort. Lightweight warmth and streamlined style.',
    specs: ['Nike Tech Fleece', 'Bonded Zip Pocket', 'Elastic Waistband']
  },
  {
    id: 'nike-dri-men',
    name: 'Dri-FIT Icon Shorts',
    brand: 'Nike',
    price: 90,
    category: 'Shorts',
    gender: 'MEN',
    recommendedSize: 'M',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Performance-driven shorts engineered for high-intensity movement and breathability.',
    specs: ['Dri-FIT Technology', 'Breathable Mesh', 'Relaxed Fit']
  },
  {
    id: 'fog-ess-men',
    name: 'Sweat Shorts',
    brand: 'Fear of God Essentials',
    price: 170,
    category: 'Shorts',
    gender: 'MEN',
    recommendedSize: 'M',
    images: [
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516762689617-e1cff9c24974?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Minimalist luxury loungewear featuring the signature Fear of God aesthetic and oversized silhouette.',
    specs: ['Heavyweight Fleece', 'Elongated Drawstrings', 'Embossed Branding']
  },
  {
    id: 'levis-469-women',
    name: '469 Loose Shorts',
    brand: "Levi's",
    price: 95,
    category: 'Shorts',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: [
      'https://images.unsplash.com/photo-1540331547168-8b6402ff2269?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519058082700-12327e0f6584?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A relaxed, loose-fit denim short inspired by vintage styles and designed for all-day comfort.',
    specs: ['Mid Rise', 'Loose Through Hip', 'Raw Hem Option']
  },
  {
    id: 'levis-hrs-women',
    name: 'High-Rise Denim Shorts',
    brand: "Levi's",
    price: 98,
    category: 'Shorts',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: [
      'https://images.unsplash.com/photo-1519058082700-12327e0f6584?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1624372927124-e2fe8bd330b1?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The ultimate summer essential. A defining high-rise cut that pair effortlessly with any piece.',
    specs: ['High Rise', 'Classic Five-Pocket', 'Durable Denim']
  },
  {
    id: 'agolde-parker-women',
    name: 'Parker Short',
    brand: 'Agolde',
    price: 148,
    category: 'Shorts',
    gender: 'WOMEN',
    recommendedSize: '28',
    images: [
      'https://images.unsplash.com/photo-1540331547168-8b6402ff2269?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1519058082700-12327e0f6584?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'An elevated, premium denim short known for its clean silhouette and superior fabric integrity.',
    specs: ['Non-Stretch Denim', 'Button Fly', 'Signature Taper']
  },

  // SUNGLASSES (Archive 03)
  {
    id: 'rb-wayfarer-men',
    name: 'Wayfarer',
    brand: 'Ray-Ban',
    price: 163,
    category: 'Sunglasses',
    gender: 'MEN',
    recommendedSize: 'One size',
    images: [
      'https://images.unsplash.com/photo-1511499767390-91f19d303d8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The definitive standard in eyewear since 1952. A classic silhouette that adapts to every face and style.',
    specs: ['Acetate Frame', 'G-15 Lenses', 'UV400 Protection']
  },
  {
    id: 'rb-clubmaster-men',
    name: 'Clubmaster',
    brand: 'Ray-Ban',
    price: 170,
    category: 'Sunglasses',
    gender: 'MEN',
    recommendedSize: 'One size',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511499767390-91f19d303d8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A retro-inspired frame that balances vintage intellectualism with modern craftsmanship.',
    specs: ['Metal & Acetate', 'Adjustable Nose Pads', 'Signature Rivets']
  },
  {
    id: 'moscot-lemtosh-men',
    name: 'Lemtosh',
    brand: 'Moscot',
    price: 330,
    category: 'Sunglasses',
    gender: 'MEN',
    recommendedSize: 'One size',
    images: [
      'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511499767390-91f19d303d8c?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The legendary Lemtosh. Handcrafted luxury from the historic New York eyewear institution.',
    specs: ['Handcrafted Acetate', 'Diamond Rivets', 'Key Hole Bridge']
  },
  {
    id: 'rb-erika-women',
    name: 'Erika',
    brand: 'Ray-Ban',
    price: 148,
    category: 'Sunglasses',
    gender: 'WOMEN',
    recommendedSize: 'One size',
    images: [
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511499767390-91f19d303d8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'An oversized, classic silhouette with a soft gummy finish and ultra-thin metal temples.',
    specs: ['Nylon Front', 'Metal Temples', 'Gradient Lenses']
  },
  {
    id: 'celine-triomphe-women',
    name: 'Triomphe',
    brand: 'Celine',
    price: 430,
    category: 'Sunglasses',
    gender: 'WOMEN',
    recommendedSize: 'One size',
    images: [
      'https://images.unsplash.com/photo-1594411626019-383796696773?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511499767390-91f19d303d8c?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Iconic French luxury featuring the signature Triomphe logo. A bold, architectural presence.',
    specs: ['Premium Italian Acetate', 'Gold Logo Branding', 'Sculpted Temples']
  },
  {
    id: 'op-cary-women',
    name: 'Cary Grant',
    brand: 'Oliver Peoples',
    price: 495,
    category: 'Sunglasses',
    gender: 'WOMEN',
    recommendedSize: 'One size',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511499767390-91f19d303d8c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Timeless elegance inspired by a Hollywood legend. Refined, classic, and endlessly versatile.',
    specs: ['Custom Acetate', 'Hand-Laid Hinges', 'Photochromic Option']
  },

  // FOOTWEAR (Archive 04)
  {
    id: 'nike-af1-07-men',
    name: 'Air Force 1 ’07',
    brand: 'Nike',
    price: 110,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9–10',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The legend lives on in the Nike Air Force 1 07, a modern take on the iconic b-ball OG.',
    specs: ['Full-grain leather', 'Air cushioning', 'Non-marking rubber sole']
  },
  {
    id: 'adidas-samba-og-men',
    name: 'Samba OG',
    brand: 'Adidas',
    price: 100,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512374382149-4332c6c02151?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593010029315-779836367504?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Born on the pitch, the Samba is a timeless icon of street style. This version stays true to the legacy.',
    specs: ['Suede T-toe', 'Gum rubber outsole', 'Leather upper']
  },
  {
    id: 'cp-achilles-low-men',
    name: 'Achilles Low',
    brand: 'Common Projects',
    price: 425,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1449244445805-bc0d36816323?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The definitive luxury sneaker. Minimalist design, superior Italian craftsmanship, and signature gold stamp.',
    specs: ['Italian leather', 'Margom rubber sole', 'Gold foil serial number']
  },
  {
    id: 'gg-superstar-men',
    name: 'Superstar',
    brand: 'Golden Goose',
    price: 595,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Authentic distressing meets premium luxury. A handcrafted masterpiece from Venice.',
    specs: ['Hand-distressed', 'Leather and suede', 'Signature star patch']
  },
  {
    id: 'margiela-replica-men',
    name: 'Replica',
    brand: 'Maison Margiela',
    price: 670,
    category: 'Footwear',
    gender: 'MEN',
    recommendedSize: 'US 9',
    images: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Inspired by Austrian sports shoes from the 70s. A conceptual staple of the Margiela house.',
    specs: ['Lambskin leather', 'Suede overlays', 'Gum sole']
  },
  {
    id: 'nike-af1-shadow-women',
    name: 'Air Force 1 Shadow',
    brand: 'Nike',
    price: 125,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7–8',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A playful twist on a classic design. Using a layered approach, it doubles the branding and exaggerates the midsole.',
    specs: ['Layered materials', 'Foam midsole', 'Perforated toe']
  },
  {
    id: 'adidas-samba-og-women',
    name: 'Samba OG',
    brand: 'Adidas',
    price: 100,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7–8',
    images: [
      'https://images.unsplash.com/photo-1593010029315-779836367504?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512374382149-4332c6c02151?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The terrace classic refined for women. Sleek low-profile design that pairs with everything.',
    specs: ['Soft leather upper', 'Textile lining', 'Gum sole']
  },
  {
    id: 'gg-superstar-women',
    name: 'Superstar',
    brand: 'Golden Goose',
    price: 595,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Luxe materials and vintage charm. Venice-inspired sneakers for the modern professional.',
    specs: ['Calf leather', 'Star patch', 'Terry lining']
  },
  {
    id: 'veja-campo-women',
    name: 'Campo',
    brand: 'Veja',
    price: 175,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7–8',
    images: [
      'https://images.unsplash.com/photo-1449244445805-bc0d36816323?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Eco-conscious design without sacrificing style. Chrome-free leather and organic materials.',
    specs: ['ChromeFree leather', 'Amazonian rubber sole', 'Organic cotton laces']
  },
  {
    id: 'margiela-replica-women',
    name: 'Replica',
    brand: 'Maison Margiela',
    price: 670,
    category: 'Footwear',
    gender: 'WOMEN',
    recommendedSize: 'US 7',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The signature Replica sneaker in a refined women\'s silhouette. Avant-garde meets athletic heritage.',
    specs: ['Calfskin upper', 'Gum sole', 'Interior branding']
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
