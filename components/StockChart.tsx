
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StockData } from '../types';

interface StockChartProps {
  data: StockData[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="p-4 text-center text-gray-500">No stock data available.</div>;
    }
    
    const minPrice = Math.min(...data.map(d => d.price));
    const maxPrice = Math.max(...data.map(d => d.price));
    
    // Determine color based on trend
    const startPrice = data[0].price;
    const endPrice = data[data.length - 1].price;
    const strokeColor = endPrice >= startPrice ? '#22c55e' : '#ef4444'; // green or red

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 my-2 border border-gray-200 dark:border-gray-600 w-full max-w-lg">
      <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-4">Stock Price (Last 30 Days)</h4>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric'})} />
            <YAxis domain={[minPrice * 0.98, maxPrice * 1.02]} tick={{ fontSize: 12 }} tickFormatter={(tick) => `$${tick.toFixed(0)}`} />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: 'rgba(31, 41, 55, 0.8)', // bg-gray-800 with opacity
                    border: '1px solid #4b5563', // border-gray-600
                    borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#f9fafb' }} // text-gray-50
                itemStyle={{ color: strokeColor }}
                formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend />
            <Line type="monotone" dataKey="price" stroke={strokeColor} strokeWidth={2} dot={false} name="Price" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
