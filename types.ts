
export type Category = 
  | 'All' 
  | 'Jeans / Pants' 
  | 'Shorts' 
  | 'Sunglasses' 
  | 'Footwear' 
  | 'Outerwear / Knitwear' 
  | 'Backpacks & Travel' 
  | 'Caps' 
  | 'Wallets' 
  | 'Belts' 
  | 'Phone Cases';

export type Gender = 'MEN' | 'WOMEN' | 'UNISEX';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: Category;
  images: string[];
  description: string;
  specs: string[];
  gender: Gender;
  recommendedSize?: string;
  colors?: string[];
  isBestSeller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Filters {
  category: Category;
  priceRange: string;
  brand: string;
  gender?: Gender | 'All';
}
