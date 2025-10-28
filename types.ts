
export type MessageRole = 'user' | 'model';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  component?: 'product' | 'stock';
  componentData?: Product | StockData[];
}

export interface Product {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  rating: number;
  reviews: number;
}

export interface StockData {
  date: string;
  price: number;
}
