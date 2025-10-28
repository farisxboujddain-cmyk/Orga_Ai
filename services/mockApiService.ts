
import { Product, StockData } from '../types';

// Mock database of products
const MOCK_PRODUCTS: Record<string, Product> = {
  'smartphone': {
    name: 'AxiomPhone Pro',
    description: 'The latest smartphone from Axiomtech with a stunning 200MP camera and a 120Hz display. Experience performance like never before.',
    price: '$999.00',
    imageUrl: 'https://picsum.photos/seed/smartphone/400/400',
    rating: 4.8,
    reviews: 1250,
  },
  'laptop': {
    name: 'AxiomBook Air',
    description: 'Ultra-thin and powerful, the AxiomBook Air is designed for professionals on the go. Featuring the new M3 chip and an all-day battery life.',
    price: '$1299.00',
    imageUrl: 'https://picsum.photos/seed/laptop/400/400',
    rating: 4.9,
    reviews: 890,
  },
  'headphones': {
    name: 'AxiomPods Max',
    description: 'Immerse yourself in high-fidelity audio with industry-leading noise cancellation. Perfect for music, calls, and everything in between.',
    price: '$549.00',
    imageUrl: 'https://picsum.photos/seed/headphones/400/400',
    rating: 4.7,
    reviews: 2100,
  },
};

// Mock function to generate stock data
const generateMockStockData = (ticker: string): StockData[] => {
  const data: StockData[] = [];
  let price = Math.random() * 500 + 50; // Start price
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    price += (Math.random() - 0.5) * 10;
    price = Math.max(price, 10); // Ensure price doesn't go below 10
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2)),
    });
  }
  return data;
};

// Mock API calls
export const getProductInfo = async (productName: string): Promise<Product | { error: string }> => {
  console.log(`Searching for product: ${productName}`);
  const key = productName.toLowerCase();
  const product = MOCK_PRODUCTS[key];
  if (product) {
    return Promise.resolve(product);
  }
  return Promise.resolve({ error: `Product '${productName}' not found.` });
};

export const getStockPrice = async (tickerSymbol: string): Promise<StockData[] | { error: string }> => {
  console.log(`Fetching stock data for: ${tickerSymbol}`);
  if (tickerSymbol && typeof tickerSymbol === 'string' && tickerSymbol.length > 0) {
      return Promise.resolve(generateMockStockData(tickerSymbol));
  }
  return Promise.resolve({ error: `Invalid ticker symbol '${tickerSymbol}'.` });
};
