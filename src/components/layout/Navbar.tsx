'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const navigation = {
  categories: [
    { name: 'New Arrivals', href: '/category/new-arrivals' },
    { name: 'Bras', href: '/category/bras' },
    { name: 'Panties', href: '/category/panties' },
    { name: 'Sets', href: '/category/sets' },
    { name: 'Sleepwear', href: '/category/sleepwear' },
    { name: 'Accessories', href: '/category/accessories' },
  ],
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { itemCount } = useCart();

  return (
    <div className="bg-white">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-semibold text-pink-600">Lingerie</span>
              </Link>
            </div>

            {/* Navigation links */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
              <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-pink-600"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center">
              <div className="flex space-x-6">
                <Link
                  href="/search"
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Search</span>
                  <Search className="h-6 w-6" />
                </Link>

                <Link
                  href={user ? '/account' : '/auth/login'}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Account</span>
                  <User className="h-6 w-6" />
                </Link>

                <Link
                  href="/cart"
                  className="group -m-2 flex items-center p-2"
                >
                  <ShoppingBag
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {itemCount}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="relative z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 z-40 flex">
            <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-2">
                <ul className="px-4 py-6 space-y-6">
                  {navigation.categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        className="text-sm font-medium text-gray-900 hover:text-pink-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
