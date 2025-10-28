
import React, { useEffect, useRef, memo } from 'react';
import { Message, Product, StockData } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onToolResponse: (tool: 'product' | 'stock', data: Product | StockData[]) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onToolResponse }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onToolResponse={onToolResponse} />
      ))}
      {isLoading && (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5M12 4.5v-1.5m0 18v-1.5M5.636 5.636l-1.06-1.06M5.636 18.364l-1.06 1.06M18.364 5.636l1.06-1.06M18.364 18.364l1.06 1.06" /></svg>
            </div>
            <div className="flex items-center justify-center space-x-1.5 mt-2 bg-white dark:bg-gray-800 px-4 py-3 rounded-xl rounded-tl-none shadow-md">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
        </div>
      )}
      <div ref={endOfMessagesRef} />
    </main>
  );
};

export default memo(ChatWindow);
