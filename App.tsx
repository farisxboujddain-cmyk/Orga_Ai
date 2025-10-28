
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Message, Product, StockData } from './types';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { getProductInfo, getStockPrice } from './services/mockApiService';
import { AXIOM_WELCOME_MESSAGE, TOOLS, SYSTEM_INSTRUCTION } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([AXIOM_WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    const initializeChat = () => {
      try {
        if (!process.env.API_KEY) {
          throw new Error("API_KEY environment variable not set.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          tools: TOOLS,
          systemInstruction: SYSTEM_INSTRUCTION,
        });
        chatRef.current = chat;
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'model',
          content: "Error: Could not initialize the AI assistant. Please check the API key and console for details."
        }]);
      }
    };
    initializeChat();
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);

    const chat = chatRef.current;
    if (!chat) {
        setIsLoading(false);
        setMessages(prev => [...prev, { id: 'error', role: 'model', content: 'Chat is not initialized.'}]);
        return;
    }

    try {
        let response = await chat.sendMessage({ message: text });
        
        while (response.functionCalls && response.functionCalls.length > 0) {
            const functionCalls = response.functionCalls;
            const functionResponses = [];

            for (const call of functionCalls) {
                let apiResult;
                if (call.name === 'getProductInfo' && call.args.productName) {
                    apiResult = await getProductInfo(call.args.productName as string);
                } else if (call.name === 'getStockPrice' && call.args.tickerSymbol) {
                    apiResult = await getStockPrice(call.args.tickerSymbol as string);
                }

                if (apiResult) {
                    functionResponses.push({
                        id: call.id,
                        name: call.name,
                        response: { result: JSON.stringify(apiResult) }
                    });
                }
            }
            
            // Send function responses back to the model
            response = await chat.sendMessage({ functionResponses });
        }

        // Add the final text response from the model
        if(response.text) {
          setMessages(prev => [...prev, {
              id: Date.now().toString() + '-model',
              role: 'model',
              content: response.text,
          }]);
        }
        
    } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setMessages(prev => [...prev, {
            id: 'error-' + Date.now(),
            role: 'model',
            content: `Sorry, I encountered an error: ${errorMessage}`
        }]);
    } finally {
        setIsLoading(false);
    }
  }, [isLoading]);
  
  // This is a special handler for messages that contain component data
  const handleToolResponse = useCallback(async (tool: 'product' | 'stock', data: Product | StockData[]) => {
      setIsLoading(true);
      const chat = chatRef.current;
      if (!chat) {
          setIsLoading(false);
          return;
      }
      
      const messageContent = tool === 'product' ?
          `Here is the product information for ${(data as Product).name}. What should I do next?` :
          `Here is the stock data for the requested symbol. What should I do next?`;
          
      const toolMessage: Message = { 
          id: Date.now().toString(), 
          role: 'model', 
          content: '',
          component: tool,
          componentData: data,
      };

      setMessages(prev => [...prev, toolMessage]);

      try {
        const response = await chat.sendMessage({ message: messageContent });
        if (response.text) {
             setMessages(prev => [...prev, {
                id: Date.now().toString() + '-model',
                role: 'model',
                content: response.text
             }]);
        }
      } catch (error) {
          console.error("Error after tool response:", error);
      } finally {
          setIsLoading(false);
      }
  }, []);

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <ChatWindow messages={messages} isLoading={isLoading} onToolResponse={handleToolResponse} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
