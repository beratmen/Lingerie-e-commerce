'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Star, Gift, Truck, CreditCard } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { products } from '@/app/api/products/route';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  categories: string[];
  externalUrl: string;
  isPublished: boolean;
}

function getProductsByCategory(category: string) {
  return products.filter(product => 
    product.category === category && product.isPublished
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  const promos = [
    {
      main: "FREE SHIPPING",
      sub: "on orders over $75",
      extra: "Plus, free returns on all orders"
    },
    {
      main: "BUY 2 GET 1 FREE",
      sub: "on all Bras",
      extra: "Limited time offer"
    },
    {
      main: "NEW COLLECTION",
      sub: "Spring Romance 2024",
      extra: "Shop exclusive styles"
    },
    {
      main: "MEMBERS GET 15% OFF",
      sub: "Join now",
      extra: "Plus early access to sales"
    }
  ];

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      setActivePromoIndex((current) => (current + 1) % promos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.filter((product: Product) => product.isPublished));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Enhanced Promo Banner */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3">
        <div className="max-w-[500px] mx-auto px-4">
          <div className="flex justify-center items-center h-[70px]">
            {promos.map((promo, index) => (
              <div
                key={index}
                className={`absolute transition-all duration-500 text-center ${
                  index === activePromoIndex ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
                }`}
              >
                <div className="text-xl font-bold tracking-wide mb-0.5">{promo.main}</div>
                <div className="text-base font-medium">{promo.sub}</div>
                <div className="text-sm text-white/90">{promo.extra}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-900">
        <Image
          src="/images/hero.jpg"
          alt="Hero"
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-lg">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Spring Romance Collection
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Discover our most romantic collection yet, featuring delicate laces and luxurious silks.
              </p>
              <div className="space-x-4">
                <Link
                  href="/category/new-arrivals"
                  className="inline-block bg-pink-600 text-white px-8 py-4 rounded-full hover:bg-pink-700 transition-colors text-lg font-medium"
                >
                  Shop New Arrivals
                </Link>
                <Link
                  href="/category/sets"
                  className="inline-block bg-white text-pink-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg font-medium"
                >
                  Shop Sets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-gray-100 py-6 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center space-x-2">
              <Truck className="h-6 w-6 text-pink-600" />
              <span className="text-sm font-medium text-gray-800">Free Shipping Over $75</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Gift className="h-6 w-6 text-pink-600" />
              <span className="text-sm font-medium text-gray-800">Free Gift Wrapping</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-6 w-6 text-pink-600" />
              <span className="text-sm font-medium text-gray-800">Premium Quality</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <CreditCard className="h-6 w-6 text-pink-600" />
              <span className="text-sm font-medium text-gray-800">Secure Payment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Shop by Category
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our curated collection of premium lingerie, swimwear, and loungewear
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'Bras', image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800' },
              { name: 'Panties', image: 'https://images.unsplash.com/photo-1566355801161-eb8dc16ea4dd?w=800' },
              { name: 'Sets', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800' },
              { name: 'Swimwear', image: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=800' },
              { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800' },
              { name: 'Loungewear', image: 'https://images.unsplash.com/photo-1573612664822-d7d347da7b80?w=800' },
              { name: 'Sleepwear', image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800' },
              { name: 'Accessories', image: 'https://images.unsplash.com/photo-1613521973937-dd9a162bb262?w=800' },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase()}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                  <span className="text-sm text-white/90">Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Featured Collections
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Discover our most loved collections, curated just for you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/collection/spring-romance" className="group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1619784299133-f691ffaea42f?w=800"
                  alt="Spring Romance"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">Spring Romance</h3>
                  <p className="text-white/90 mb-4">Delicate laces and romantic silhouettes</p>
                  <span className="inline-block bg-white text-pink-600 px-6 py-2 rounded-full text-sm font-medium">
                    Explore Collection
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/collection/summer-essentials" className="group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
                  alt="Summer Essentials"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">Summer Essentials</h3>
                  <p className="text-white/90 mb-4">Swimwear, tees, and casual comfort</p>
                  <span className="inline-block bg-white text-pink-600 px-6 py-2 rounded-full text-sm font-medium">
                    Explore Collection
                  </span>
                </div>
              </div>
            </Link>
            <Link href="/collection/lounge-and-sleep" className="group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573612664822-d7d347da7b80?w=800"
                  alt="Lounge & Sleep"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">Lounge & Sleep</h3>
                  <p className="text-white/90 mb-4">Cozy loungewear and sleepwear</p>
                  <span className="inline-block bg-white text-pink-600 px-6 py-2 rounded-full text-sm font-medium">
                    Explore Collection
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Best Sellers</h2>
              <p className="text-gray-600 mt-2">Our most loved styles</p>
            </div>
            <Link
              href="/best-sellers"
              className="text-pink-600 hover:text-pink-700 flex items-center text-lg font-medium"
            >
              View All <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                id: '2',
                name: 'Lace Balconette Bra',
                price: 44.99,
                imageUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800',
                category: 'Bras'
              },
              {
                id: '7',
                name: 'Lace Bra and Panty Set',
                price: 49.99,
                imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
                category: 'Sets'
              },
              {
                id: '10',
                name: 'Silk Pajama Set',
                price: 89.99,
                imageUrl: 'https://images.unsplash.com/photo-1573612664822-d7d347da7b80?w=800',
                category: 'Sleepwear'
              },
              {
                id: '14',
                name: 'Oversized Comfort Hoodie',
                price: 54.99,
                imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
                category: 'Clothing'
              }
            ].map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button 
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: Add to wishlist functionality
                    }}
                  >
                    <Heart className="h-5 w-5 text-pink-600" />
                  </button>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                <p className="text-lg font-medium text-pink-600">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Join The Club
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Subscribe to receive exclusive offers, early access to new collections, and $15 off your first purchase.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors text-lg font-medium"
              >
                Subscribe
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Shop Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/category/new-arrivals" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link href="/category/bras" className="text-gray-400 hover:text-white transition-colors">Bras</Link></li>
                <li><Link href="/category/panties" className="text-gray-400 hover:text-white transition-colors">Panties</Link></li>
                <li><Link href="/category/sets" className="text-gray-400 hover:text-white transition-colors">Lingerie Sets</Link></li>
                <li><Link href="/category/sleepwear" className="text-gray-400 hover:text-white transition-colors">Sleepwear</Link></li>
                <li><Link href="/category/swimwear" className="text-gray-400 hover:text-white transition-colors">Swimwear</Link></li>
                <li><Link href="/best-sellers" className="text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
              </ul>
            </div>

            {/* Customer Service Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Information</Link></li>
                <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link></li>
                <li><Link href="/size-guide" className="text-gray-400 hover:text-white transition-colors">Size Guide</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/track-order" className="text-gray-400 hover:text-white transition-colors">Track Your Order</Link></li>
              </ul>
            </div>

            {/* About Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Our Story</Link></li>
                <li><Link href="/sustainability" className="text-gray-400 hover:text-white transition-colors">Sustainability</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Pinterest</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Customer Service Hours:</h4>
                  <p className="text-gray-400">Mon-Fri: 9AM - 6PM EST</p>
                  <p className="text-gray-400">Sat-Sun: 10AM - 5PM EST</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Contact:</h4>
                  <p className="text-gray-400">Email: support@example.com</p>
                  <p className="text-gray-400">Phone: 1-800-123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <img src="/images/payment/visa.svg" alt="Visa" className="h-8" />
                <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-8" />
                <img src="/images/payment/amex.svg" alt="American Express" className="h-8" />
                <img src="/images/payment/paypal.svg" alt="PayPal" className="h-8" />
              </div>
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Your Brand Name. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

