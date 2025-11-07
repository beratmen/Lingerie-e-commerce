'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
            <p className="text-gray-600 text-sm">
              Premium lingerie and sleepwear designed for comfort and confidence.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/category/bras" className="text-gray-600 hover:text-pink-600 text-sm">
                  Bras
                </Link>
              </li>
              <li>
                <Link href="/category/panties" className="text-gray-600 hover:text-pink-600 text-sm">
                  Panties
                </Link>
              </li>
              <li>
                <Link href="/category/sleepwear" className="text-gray-600 hover:text-pink-600 text-sm">
                  Sleepwear
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-gray-600 hover:text-pink-600 text-sm">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-pink-600 text-sm">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-pink-600 text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-600 hover:text-pink-600 text-sm">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-pink-600 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 text-sm">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 text-sm">
                  Pinterest
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-pink-600 text-sm">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Lingerie Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 
