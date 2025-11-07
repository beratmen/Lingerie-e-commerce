'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const shipping = cartItems.length > 0 ? 5.99 : 0;
  const tax = cartTotal * 0.1; // 10% tax
  const total = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex py-6 border-b border-gray-200"
                >
                  <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover object-center rounded-md"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          <Link href={`/product/${item.id}`}>
                            {item.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Color: {item.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${item.price}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-gray-50"
                        >
                          <Minus className="h-4 w-4 text-gray-400" />
                        </button>
                        <span className="px-4 py-1 text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-50"
                        >
                          <Plus className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 lg:mt-0 lg:col-span-5">
              <div className="bg-gray-50 rounded-lg px-6 py-8">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Order Summary
                </h2>
                <div className="flow-root">
                  <dl className="space-y-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="text-gray-900">${cartTotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd className="text-gray-900">${shipping.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Tax</dt>
                      <dd className="text-gray-900">${tax.toFixed(2)}</dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <dt className="text-lg font-medium text-gray-900">Total</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ${total.toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => {
                      // Add checkout logic here
                      console.log('Proceeding to checkout...');
                    }}
                    className="w-full bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 
