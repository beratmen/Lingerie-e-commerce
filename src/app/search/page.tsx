'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { products, type Product } from '../../data/products';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products primarily by name, then by category if no name matches
  const filteredProducts = products.filter((product: Product) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true; // Show all products when no search query

    const nameMatch = product.name.toLowerCase().includes(query);
    const categoryMatch = product.category.toLowerCase().includes(query);
    
    return nameMatch || categoryMatch;
  });

  // Sort results to prioritize name matches
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aNameMatch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    const bNameMatch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
              placeholder="Search by product name..."
              autoFocus
            />
          </div>
          {searchQuery && (
            <div className="mt-2 text-sm text-gray-500">
              Found {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
          {sortedProducts.map((product: Product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative"
            >
              <div className="aspect-w-4 aspect-h-5 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={400}
                  height={500}
                  className="object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {searchQuery && sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Try searching for a different product name or category.
            </p>
          </div>
        )}
      </main>
    </div>
  );
} 

