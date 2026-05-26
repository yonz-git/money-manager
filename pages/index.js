import React from 'react';

// Mock data based on your image
const transactions = [
  { id: 1, name: 'Salary', type: 'Income', date: 'May 12, 2024', amount: '2,500.00', icon: '💼' },
  { id: 2, name: 'Grocery Store', type: 'Expense', date: 'May 12, 2024', amount: '45.60', icon: '🛒' },
  { id: 3, name: 'Coffee Shop', type: 'Expense', date: 'May 11, 2024', amount: '4.75', icon: '☕' },
  { id: 4, name: 'Electricity Bill', type: 'Expense', date: 'May 8, 2024', amount: '120.00', icon: '⚡' },
  { id: 5, name: 'Bus Pass', type: 'Expense', date: 'May 7, 2024', amount: '50.00', icon: '🚌' },
  { id: 6, name: 'Freelance Project', type: 'Income', date: 'May 6, 2024', amount: '450.00', icon: '🎁' },
];

export default function Transactions() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-md font-sans pb-10">
      
      {/* Top Header */}
      <header className="flex items-center px-4 py-3 border-b">
        <button className="text-xl mr-4">☰</button>
        <h1 className="text-lg font-semibold mx-auto pr-6">Transactions</h1>
      </header>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search transactions" 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
          />
        </div>

        {/* Filter and Sort Buttons */}
        <div className="grid grid-cols-2 gap-3 text-sm font-medium">
          <button className="flex items-center justify-center py-2 border rounded-lg hover:bg-gray-50">
            <span className="mr-2">⏳</span> Filter
          </button>
          <button className="flex items-center justify-center py-2 border rounded-lg hover:bg-gray-50">
            Sort <span className="ml-2">▼</span>
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {transactions.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-4 border rounded-xl bg-white shadow-sm"
            >
              {/* Left Side: Icon & Details */}
              <div className="flex items-center space-x-4">
                <div className="text-2xl bg-gray-100 p-2 rounded-lg">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.type} • {item.date}
                  </p>
                </div>
              </div>

              {/* Right Side: Amount */}
              <div className={`font-semibold text-sm ${item.type === 'Income' ? 'text-green-600' : 'text-gray-900'}`}>
                {item.type === 'Income' ? '' : '-'}{item.amount}
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Pull up text */}
        <div className="text-center text-xs text-gray-400 pt-4">
          Pull up to load more
        </div>
      </div>

    </div>
  );
}