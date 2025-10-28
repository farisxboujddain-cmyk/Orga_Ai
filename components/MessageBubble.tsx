
import React from 'react';
import { Message, Product, StockData } from '../types';
import { UserIcon, AxiomtechIcon } from './Icons';
import ProductCard from './ProductCard';
import StockChart from './StockChart';

interface MessageBubbleProps {
  message: Message;
  onToolResponse: (tool: 'product' | 'stock', data: Product | StockData[]) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const renderContent = () => {
    if (message.component === 'product' && message.componentData) {
      return <ProductCard product={message.componentData as Product} />;
    }
    if (message.component === 'stock' && message.componentData) {
      return <StockChart data={message.componentData as StockData[]} />;
    }
    // Basic markdown for bolding with **text**
    const parts = message.content.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
  };

  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white rounded-br-none'
    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none';
  
  const containerClasses = isUser
    ? 'flex items-end justify-end space-x-2'
    : 'flex items-end space-x-2';

  return (
    <div className={containerClasses}>
      {!isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
          <AxiomtechIcon className="h-6 w-6 text-blue-400" />
        </div>
      )}
      <div className={`max-w-md md:max-w-lg lg:max-w-2xl px-4 py-3 rounded-xl shadow-md ${bubbleClasses}`}>
        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2">
            {renderContent()}
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
