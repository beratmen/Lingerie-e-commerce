import { NextResponse } from 'next/server';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  sizes: string[];
  colors: string[];
  isPublished: boolean;
  updatedAt?: string;
  details?: string[];
  materials?: string[];
  careInstructions?: string[];
  reviews?: {
    rating: number;
    comment: string;
    author: string;
  }[];
  tags?: string[];
}

// In-memory store for products
export const products: Product[] = [
  // Bras
  {
    id: '1',
    name: 'Classic T-Shirt Bra',
    price: 39.99,
    description: 'Comfortable everyday t-shirt bra with smooth cups and adjustable straps.',
    imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=800',
    category: 'Bras',
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['Black', 'Nude', 'White'],
    isPublished: true,
    materials: ['90% Nylon', '10% Spandex'],
    careInstructions: ['Hand wash cold', 'Line dry']
  },
  {
    id: '2',
    name: 'Lace Balconette Bra',
    price: 44.99,
    description: 'Beautiful lace balconette bra with underwire support.',
    imageUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800',
    category: 'Bras',
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['Black', 'Red', 'Navy'],
    isPublished: true,
    materials: ['85% Nylon', '15% Spandex'],
    careInstructions: ['Hand wash cold', 'Line dry']
  },
  {
    id: '3',
    name: 'Wireless Comfort Bra',
    price: 34.99,
    description: 'Super comfortable wireless bra perfect for everyday wear.',
    imageUrl: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=800',
    category: 'Bras',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Black', 'Pink'],
    isPublished: true,
    materials: ['92% Cotton', '8% Spandex'],
    careInstructions: ['Machine wash cold', 'Tumble dry low']
  },

  // Panties
  {
    id: '4',
    name: 'Lace Hipster Panty',
    price: 14.99,
    description: 'Delicate lace hipster panty with cotton gusset.',
    imageUrl: 'https://images.unsplash.com/photo-1566355801161-eb8dc16ea4dd?w=800',
    category: 'Panties',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Red', 'Pink'],
    isPublished: true,
    materials: ['85% Nylon', '15% Spandex'],
    careInstructions: ['Machine wash cold', 'Tumble dry low']
  },
  {
    id: '5',
    name: 'Seamless Thong',
    price: 12.99,
    description: 'No-show seamless thong perfect under tight clothing.',
    imageUrl: 'https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=800',
    category: 'Panties',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Nude', 'Black', 'White'],
    isPublished: true,
    materials: ['90% Nylon', '10% Spandex'],
    careInstructions: ['Machine wash cold', 'Tumble dry low']
  },
  {
    id: '6',
    name: 'Cotton Bikini Set',
    price: 16.99,
    description: 'Comfortable cotton bikini panties in a set of three.',
    imageUrl: 'https://images.unsplash.com/photo-1566355801954-7d4f07513b56?w=800',
    category: 'Panties',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Mixed Pack'],
    isPublished: true,
    materials: ['95% Cotton', '5% Spandex'],
    careInstructions: ['Machine wash cold', 'Tumble dry low']
  },

  // Sets
  {
    id: '7',
    name: 'Lace Bra and Panty Set',
    price: 49.99,
    description: 'Beautiful matching set featuring a lace bra and coordinating panty.',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    category: 'Sets',
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['Black', 'Red'],
    isPublished: true,
    materials: ['80% Nylon', '20% Spandex'],
    careInstructions: ['Hand wash cold', 'Line dry']
  },
  {
    id: '8',
    name: 'Bridal Lingerie Set',
    price: 69.99,
    description: 'Elegant white lace set perfect for special occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1566355801438-60c919be6c51?w=800',
    category: 'Sets',
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['White', 'Ivory'],
    isPublished: true,
    materials: ['85% Nylon', '15% Spandex'],
    careInstructions: ['Hand wash cold', 'Line dry']
  },
  {
    id: '9',
    name: 'Everyday Comfort Set',
    price: 39.99,
    description: 'Comfortable t-shirt bra and hipster panty set.',
    imageUrl: 'https://images.unsplash.com/photo-1566355801183-c13de43d4ad3?w=800',
    category: 'Sets',
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['Black', 'Nude'],
    isPublished: true,
    materials: ['90% Nylon', '10% Spandex'],
    careInstructions: ['Machine wash cold', 'Tumble dry low']
  },

  // Sleepwear
  {
    id: '10',
    name: 'Silk Pajama Set',
    price: 89.99,
    description: 'Luxurious silk pajama set with long sleeve top and matching pants.',
    imageUrl: 'https://images.unsplash.com/photo-1573612664822-d7d347da7b80?w=800',
    category: 'Sleepwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Burgundy', 'Ivory'],
    isPublished: true,
    materials: ['100% Silk'],
    careInstructions: ['Dry clean only']
  },
  {
    id: '11',
    name: 'Satin Nightgown',
    price: 49.99,
    description: 'Elegant satin nightgown with lace trim.',
    imageUrl: 'https://images.unsplash.com/photo-1566355801438-60c919be6c51?w=800',
    category: 'Sleepwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Rose', 'Champagne'],
    isPublished: true,
    materials: ['100% Polyester'],
    careInstructions: ['Hand wash cold', 'Line dry']
  },
  {
    id: '12',
    name: 'Cotton Sleep Shirt',
    price: 34.99,
    description: 'Comfortable oversized sleep shirt in soft cotton.',
    imageUrl: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800',
    category: 'Sleepwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue Stripe', 'Pink Stripe'],
    isPublished: true,
    materials: ['100% Cotton'],
    careInstructions: ['Machine wash cold', 'Tumble dry low']
  },

  // Clothing
  {
    id: '13',
    name: 'Cozy Lounge Sweatpants',
    price: 45.99,
    description: 'Super soft and comfortable sweatpants perfect for lounging.',
    imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800',
    category: 'Clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Navy'],
    isPublished: true,
    materials: ['80% Cotton', '20% Polyester'],
    careInstructions: ['Machine wash cold', 'Tumble dry low']
  },
  {
    id: '14',
    name: 'Oversized Comfort Hoodie',
    price: 54.99,
    description: 'Oversized hoodie with a plush interior for maximum comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    category: 'Clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Pink'],
    isPublished: true,
    materials: ['80% Cotton', '20% Polyester'],
    careInstructions: ['Machine wash cold', 'Tumble dry low']
  },
  {
    id: '15',
    name: 'Lounge Shorts Set',
    price: 39.99,
    description: 'Comfortable shorts set with elastic waist and matching top.',
    imageUrl: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800',
    category: 'Clothing',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Navy'],
    isPublished: true,
    materials: ['95% Modal', '5% Spandex'],
    careInstructions: ['Machine wash cold', 'Tumble dry low']
  },

  // Accessories
  {
    id: '16',
    name: 'Silk Sleep Mask',
    price: 19.99,
    description: 'Luxurious silk sleep mask for a peaceful night\'s rest.',
    imageUrl: 'https://images.unsplash.com/photo-1613521973937-dd9a162bb262?w=800',
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Pink', 'Navy'],
    isPublished: true,
    materials: ['100% Silk'],
    careInstructions: ['Hand wash cold', 'Line dry']
  },
  {
    id: '17',
    name: 'Satin Hair Scrunchies Set',
    price: 14.99,
    description: 'Set of three satin scrunchies to protect your hair while you sleep.',
    imageUrl: 'https://images.unsplash.com/photo-1599446794254-16ca27707203?w=800',
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['Mixed Pack'],
    isPublished: true,
    materials: ['100% Polyester Satin'],
    careInstructions: ['Hand wash cold', 'Line dry']
  },
  {
    id: '18',
    name: 'Lingerie Wash Bag Set',
    price: 16.99,
    description: 'Set of mesh wash bags in various sizes for delicate garments.',
    imageUrl: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800',
    category: 'Accessories',
    sizes: ['One Size'],
    colors: ['White'],
    isPublished: true,
    materials: ['100% Polyester Mesh'],
    careInstructions: ['Machine wash cold']
  }
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const product = await request.json();
  
  // Add validation here
  
  const newProduct = {
    id: (products.length + 1).toString(),
    ...product,
    isPublished: false
  };
  
  products.push(newProduct);
  
  return NextResponse.json(newProduct);
}
