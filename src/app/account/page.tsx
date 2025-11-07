'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Package, Heart, LogOut } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

// Mock data - in a real app, this would come from an API
const orders = [
  {
    id: '#12345',
    date: '2024-02-15',
    total: 189.98,
    status: 'Delivered',
    items: [
      {
        id: 1,
        name: 'Lace Balconette Bra',
        price: 59.99,
        image: '/images/products/product-1.jpg',
      },
      {
        id: 2,
        name: 'Silk Pajama Set',
        price: 129.99,
        image: '/images/products/product-2.jpg',
      },
    ],
  },
  // Add more orders...
];

const accountTabs = [
  { name: 'Profile', icon: User },
  { name: 'Orders', icon: Package },
  { name: 'Wishlist', icon: Heart },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">sarah@example.com</p>
                </div>
              </div>

              <nav className="space-y-1">
                {accountTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        activeTab === tab.name
                          ? 'bg-pink-50 text-pink-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
                <button
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="mt-10 lg:mt-0 lg:col-span-9">
            {activeTab === 'Profile' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Account Settings
                  </h2>
                </div>
                <div className="px-6 py-4 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue="Sarah Johnson"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue="sarah@example.com"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Orders' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Order History
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <div key={order.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Order {order.id}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${order.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-green-600">{order.status}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4"
                          >
                            <div className="flex-shrink-0 w-16 h-16">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover object-center rounded-md"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                ${item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Wishlist' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    My Wishlist
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-500">No items in your wishlist yet.</p>
                  <Link
                    href="/"
                    className="mt-4 inline-block text-pink-600 hover:text-pink-700"
                  >
                    Continue Shopping →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 
