
import React from 'react';
import { Product } from '../types';
import { StarIcon } from './Icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden my-2 border border-gray-200 dark:border-gray-600 max-w-sm">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">{product.price}</p>
          <div className="flex items-center space-x-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-500'}`} />
              ))}
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-xs">({product.reviews} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
