'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Users, 
  DollarSign,
  TrendingUp 
} from 'lucide-react';

const stats = [
  { name: 'Total Products', value: '48', icon: ShoppingBag, change: '+12%', changeType: 'increase' },
  { name: 'Total Customers', value: '2.6k', icon: Users, change: '+5.4%', changeType: 'increase' },
  { name: 'Average Order Value', value: '$89.99', icon: DollarSign, change: '+3.2%', changeType: 'increase' },
  { name: 'Revenue', value: '$48.5k', icon: TrendingUp, change: '+9.1%', changeType: 'increase' },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          An overview of your store's performance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-lg shadow px-6 py-5 transform transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </span>
              <span className="text-sm text-gray-500"> vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="px-6 py-5">
            <p className="text-sm text-gray-500">Coming soon...</p>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Popular Products</h3>
          </div>
          <div className="px-6 py-5">
            <p className="text-sm text-gray-500">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
} 

