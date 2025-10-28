
import { FunctionDeclaration, Type } from '@google/genai';
import { Message } from './types';

export const SYSTEM_INSTRUCTION = `You are "Axiom", a friendly and highly capable AI assistant from Axiomtech.
Your expertise is in e-commerce and finance.
You must use the tools provided to answer questions about products and stock prices.
When a user asks for product information, call the 'getProductInfo' function.
When a user asks for a stock price or chart, call the 'getStockPrice' function.
After a tool is used successfully, the data will appear in the chat. You should then analyze or comment on this data as requested by the user.
Be proactive and helpful. Your tone should be professional yet approachable.`;

export const TOOLS: { functionDeclarations: FunctionDeclaration[] }[] = [
  {
    functionDeclarations: [
      {
        name: 'getProductInfo',
        description: 'Get detailed information about a specific product.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            productName: {
              type: Type.STRING,
              description: 'The name of the product to search for.',
            },
          },
          required: ['productName'],
        },
      },
      {
        name: 'getStockPrice',
        description: 'Get historical stock price data for a given ticker symbol to display a chart.',
        parameters: {
          type: Type.OBJECT,
          properties: {
            tickerSymbol: {
              type: Type.STRING,
              description: 'The stock ticker symbol (e.g., "GOOGL", "AAPL").',
            },
          },
          required: ['tickerSymbol'],
        },
      },
    ],
  },
];

export const AXIOM_WELCOME_MESSAGE: Message = {
    id: 'axiom-initial-message',
    role: 'model',
    content: "Welcome to Axiomtech! I'm Axiom, your AI assistant for e-commerce and finance. How can I help you today? You can ask me for information about products like 'smartphones' or 'laptops', or get stock data for symbols like 'TSLA' or 'MSFT'."
};
