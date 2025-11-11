'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/app/api/products/route';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['All', 'Bras', 'Panties', 'Sets', 'Sleepwear', 'Clothing', 'Accessories'];

  useEffect(() => {
    fetchProducts();
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

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Products</h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category.toLowerCase()
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="relative aspect-[3/4] mb-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAAAAAAAAAAAAAAAAAAEAGAAAwNgAAQAAAABDLwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5yWFlaAAABKAAAABRnWFlaAAABPAAAABRiWFlaAAABUAAAABR3dHB0AAABZAAAABRjcHJ0AAABeAAAADhjaGFkAAABsAAAACxkbW5kAAAB4AAAACx2Y2d0AAACGAAAAA5tbmRpAAAAKAAAAA5tZGRpAAAANAAAAA5nVFJDAAABZAAAACBprVFJDAAABWQAAAAgYnVFUwAABQQAAAAgclhZWgAAAPQAAAAgYlhZWgAAAPwAAAAgZGFyawAAASgAAAAkZW5VUwAABPgAAAAeZW5VUwAABPgAAAAeZGVzYwAAAAAAAAAEc1JHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACIAAAAcAEcASQBNAFAAIABiAHUAaQBsAHQALQBpAG4AIABzAFIARwBCbWx1YwAAAAAAAAABAAAADGVuVVMAAAAwAAAAHABQAHUAYgBsAGkAYwAgAEQAbwBtAGEAaQBuAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBuWFlaIAAAAAAAAG+gAAA49QAAA5BYWVogAAAAAAAAJJ8AAA+EAAC2xFhZWiAAAAAAAABilwAAt4cAABjZcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltjaHJtAAAAAAADAAAAAKPXAABUfAAATM0AAJmaAAAmZwAAD1xtbW9kAAAAAAAABhAAAKAMAAAAABzySgAAAAAAAAAAAAAAAAAAAAB2Y2d0AAAAAAAAAAAAAwEAAAIAAAAEABQAMABcAJYA5QFVAfICowN5BIUFvgceB6MI/wpAC6gNMw7TEJkSZxRNFmAYwhtqHkYhSSRrKAMrBC3dMN4z8jYtOYo9fUHXRptLLE6OUxtX1VzMYiBoPG2Pcuh5sH+GhpSOhJgrnZ2oG7LmvjnK4djZ553++gwxGcwoxDQbQ8JT0mVreayOAJ+luzbQzOZm+bwS0C31VAxjJps8GWFR0YFIvcwBG1V6t7cdF4JL4oIV1lgf/UQ1pXcV2aM9TK2v4WxWB7GU+AEom1wd9etPXL37gGcS4Jt1wQl5dxF8oY8/4fgN1yP/vTQY7pVuoiEZ45x7OxXf2dBlHzXDNFT8vZ0PxwPgOgAAAAAAAAZTAAADWQAAA/EAAAQyAAAEmwAABRsAAAW4AAAGagAABxcAAAeCAAAH6QAACFAAAAixAAAJSAAACaQAAAoCAAAKXwAACrsAAAsaAAALdwAAC9UAAAxwAAAM0AAADTAAAA2OAAw5AgAAABQIAAACAAAABAAUADAAbgC8ASkBsgJyAy0D+ATnBhYHXAi1ChwLtQ1tDzwRLBNJFZQYORrVHY8gaSNVJmApqi1VMGkz2jdeOxg/KEPXR4NMPlEKVihbh2EXZxpuLHWVfVSG9JEJnEyo5bXTxT7TFeFz8DQAAAAAAAAGUwAAAfQAAAK1AAADdgAABDcAAASGAAAE1QAABSQAAAWEAAAFuwAABe4AAAYhAAAGVAAABocAAAa6AAAHLQAABw4AAAdaAAAHpwAAB/QAAAhBAAAIjgAACN4AAAkuAAAJfgAACc8AAAofAAAKeQAL5AAAABPoAAACAAAABAAUAC8AagC6ASkBwQJ/AzwEFwUHBhsHQgh+CdALQgzYDowQZxJhFIUW2xllHAcexiGyJMQnAipmLf4x0DXYOjk/Z0T2S6ZShll0YVdqQ3Mye4yFMJAgnVqrt7pzyZrbDO1O/98AAAAAAAAGUwAAAZoAAAJbAAACuwAAAwsAAANbAAADqwAAA/sAAAROAAAEogAABPYAAAVKAAAFngAABfMAAAZIAAAGnQAABvIAAAdjAAAH1QAACEgAAAi7AAAL5AAAA6gAAABEAAAACAAAAAQAFAAwAHEAvwEyAaYCWQMjA/kE7AYEByMIWgnqC50NjA+hEfYUchc1GgEdxiGaJX8piS3HMjY3+j4gRZhNblY0YHhrjXggiayXGa3VxNrdL/PrDqwAAAAAAAAGUwAAAU0AAAIKAAACgAAAAz0AAAN6AAADtgAAA/MAAAQwAAAEbQAABKoAAAToAAAFJgAABWQAAAWjAAAF4gAABiEAAAZgAAAGnwAABt8AAAcfAAAHYAAAB6AAAAfhAAAIIggACAAAAAsAAAAEABUAMwB5AMwBTgHnApEDVAQtBSQGQgePCRMLxw6sEcUVHBlEHoQj6SlKLuQ03jxGRQpPO1qqZZ9ymILsl4i1h9o2BGgAAAAAAAAGUwAAASkAAAG3AAACRAAAApEAAALUAAADFwAAA1oAAAOdAAAD4AAABCMAAAQiAAAEYQAABKAAAATfAAAFHwAABV8AAAWfAAAF3wAABh8AAAZgAAAGnwAABt8AAAccAAAHXQAAB54ABwAAAAkAAAAEABQAMgB8ANYBaQIYAtsDxQTLBgYIeQs1DyIUQBrQIqIr7ja3Q/ZTSGZPe8STL6xX0OD8VSpyAAAAAAAABlMAAAEGAAABjwAAAhcAAAKfAAAC4AAAAyEAAANjAAADpAAAA+UAAAQnAAAEaAAABKkAAATrAAAFLAAABW0AAAWvAAAF8AAABjIAAAZ0AAAGtgAABvgAAAc6AAAHfAAACRYAAAo4AAALWgYAAAAHAAAABAAVADUAhADrAagChgOEBKoGJAjqDV8T/h3GKtM5e0xEYVx5MY41rB/Mc/3IKgAAAAAAABlMAAABAwAAAYoAAAIQAAACkAAAAtAAAAMQAAADUAAAA5AAAAPRAAAEEgAABFMAAASTAAAE1AAABRUAAAVWAAAFlwAABdgAAAYaAAAGWwAABp0AAAbfAAAHIAAAB2IAAAekAAAH5gAABQAAAAYAAAAEABUANwCMAP4B3gLYBCAGzgriEG4aQCcOOEZNn2c6iHy0cvLr/wAAAAAAACBMAAABAAAAATsAAAG7AAACOwAAAnsAAAL8AAADfQAAA/4AAAOiAAAEIwAABGQAAASoAAAE6gAABSwAAAVuAAAFsAAABfMAAAY1AAAGeAAABrsAAAfAAAAIRAAACV0AAApsAAALewQAAAAFAAAABAAUADgAlQEWAncEHQcwDXAXAiZ0OSxR1G8KnX/cQQAAAAAAAC1MAAABAAAAAOAAAAFQAAACEAAAApAAAAMQAAADkQAABBIAAAOiAAAEIwAABGQAAASoAAAE6gAABSwAAAVuAAAFsQAABfQAAAY2AAAGegAABr0AAAfDAAAISgAACWMAAAp2AAAL5AMAAAAEAAAABAAUADoAoAE0BNAJJhN3I2g4K1LRjf/lYwAAAAAAAEBMAAAAAAAAAEAAAACQAAABEAAAApAAAAMQAAADkQAABBIAAAOiAAAEIwAABGQAAASoAAAE6gAABSwAAAVuAAAFsQAABfQAAAY3AAAGfAAABsEAAAfIAAAIUAAACWsAAApzAgAAAAQAAAAEABQAPACzAXEFXA6THgM2nVTIjWr6/wAAAAAAAFRMAAAAAAAAACAAAABQAAAA0AAAARAAAAKQAAADEQAABCMAAAOiAAAEIwAABGQAAASoAAAE6gAABSwAAAVuAAAFsQAABfQAAAY3AAAGfAAABsEAAAfIAAAIUAAACXEAQAAAAQAAAAQAAAAEABYAQgDMAcsG2xT3KKxFi20M7P8AAAAAAABwTAAAAAAAAAAAAAAAACAAAABwAAAA4AAAATAAAAJQAAADkQAAA6IAAAQjAAAEZAAABKgAAATqAAAFLAAABW4AAAWxAAAF9AAABjcAAAZ8AAAGwQAAB8gAAAhQAAAAAAEAAAAEAAAABAAaAFMA+QgDGcQxbVUkof/VgAAAAAAAAJBMAAAAAAAAAAAAAAAAAAAAACAAAABwAAAA4AAAATAAAAJQAAADkQAAA6IAAAQjAAAEZAAABKgAAATqAAAFLAAABW4AAAWxAAAF9AAABjcAAAZ8AAAGwQAAB8g="
                    className="object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                  />
                  <button 
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      // TODO: Add to wishlist functionality
                    }}
                  >
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm font-medium text-gray-700">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              </Link>
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
} 

