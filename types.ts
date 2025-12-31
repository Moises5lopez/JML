
export type Category = 'All' | 'Vision' | 'Clothing' | 'Optics' | 'Footwear' | 'Headphones';
export type Gender = 'Neutral' | 'Mens' | 'Womens';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: Category;
  subCategory: string;
  image: string;
  videoUrl?: string;
  description: string;
  specs: string[];
  usage?: 'Casual' | 'Sport' | 'Business' | 'Training';
  gender?: Gender;
  batteryLife?: string;
  sizes?: string[];
  colors?: string[];
  isBestSeller?: boolean;
  mount?: 'L-Mount' | 'E-Mount' | 'Fixed';
  focalLength?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Filters {
  category: Category;
  priceRange: string;
  subCategory: string;
  usage?: string;
  size?: string;
  gender?: Gender;
}
