import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function OrderSystem() {
  const [orderNumber, setOrderNumber] = useState('');
  const [nowServing, setNowServing] = useState(['001', '002', '005']);
  const [nowPreparing, setNowPreparing] = useState(['003', '004', '006']);

  const addOrder = (e) => {
    e.preventDefault();
    if (orderNumber.trim() !== '') {
      setNowPreparing(prev => [...prev, orderNumber.padStart(3, '0')]);
      setOrderNumber('');
    }
  };

  const moveToServing = (order) => {
    setNowPreparing(prev => prev.filter(item => item !== order));
    setNowServing(prev => [...prev, order]);
  };

  const removeFromServing = (order) => {
    setNowServing(prev => prev.filter(item => item !== order));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Order System</h1>
      
      <div className="grid grid-cols-2 mb-6 border-2 border-black">
        {/* Now Serving Section */}
        <div className="border-r-2 border-black">
          <div className="bg-green-400 p-2 border-b-2 border-black">
            <h2 className="text-white text-xl font-bold text-center">Now Serving</h2>
          </div>
          <div className="bg-white">
            {nowServing.map((order, index) => (
              <div key={order} className="flex items-center justify-between p-2 border-b border-gray-300">
                <span className="text-xl font-bold">{order}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => removeFromServing(order)}
                    className="mr-2"
                  >
                    <X className="h-6 w-5" />
                  </button>
                  {index === 0 && <span className="text-red-500 text-xl font-bold">3</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Now Preparing Section */}
        <div>
          <div className="bg-gray-400 p-2 border-b-2 border-black">
            <h2 className="text-white text-xl font-bold text-center">Now Preparing</h2>
          </div>
          <div className="bg-white">
            {nowPreparing.map((order, index) => (
              <div key={order} className="flex items-center justify-between p-2 border-b border-gray-300">
                <span className="text-xl font-bold">{order}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => moveToServing(order)}
                    className="mr-2"
                  >
                    <svg className="h-6 w-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  {index === 0 && <span className="text-red-500 text-xl font-bold">2</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Order Form */}
      <form onSubmit={addOrder} className="flex justify-center gap-2">
        <input
          type="text"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="Order Number"
          className="border border-gray-300 p-2 w-64 rounded-medium"
          maxLength={3}
        />
        <button type="submit" className="bg-green-400 text-white font-bold py-2 px-6 border border-black rounded-full">
          Add
        </button>
      </form>
    </div>
  );
}

