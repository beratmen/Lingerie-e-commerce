export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  category: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Lace Trim Satin Cami Set',
    description: "Elegant satin camisole set with delicate lace trim details. Perfect for a luxurious night's sleep.",
    price: 49.99,
    tags: ['satin', 'lace', 'sleepwear', 'new'],
    category: 'Sleepwear',
    images: ['https://images.pexels.com/photos/6311662/pexels-photo-6311662.jpeg'],
  },
  {
    id: '2',
    name: 'Floral Lace Bodysuit',
    description: 'Beautiful floral lace bodysuit with scalloped edges and adjustable straps.',
    price: 59.99,
    tags: ['lace', 'bodysuit', 'featured'],
    category: 'Bodysuits',
    images: ['https://images.pexels.com/photos/7760867/pexels-photo-7760867.jpeg'],
  },
  {
    id: '3',
    name: 'Silk Robe with Lace Details',
    description: 'Luxurious silk robe with intricate lace details on the sleeves and hem.',
    price: 89.99,
    tags: ['silk', 'robe', 'premium'],
    category: 'Robes',
    images: ['https://images.pexels.com/photos/6311658/pexels-photo-6311658.jpeg'],
  },
  {
    id: '4',
    name: 'Mesh and Lace Bralette Set',
    description: 'Delicate mesh bralette with lace overlay and matching underwear.',
    price: 44.99,
    tags: ['mesh', 'lace', 'bralette', 'set'],
    category: 'Bras',
    images: ['https://images.pexels.com/photos/7760915/pexels-photo-7760915.jpeg'],
  },
  {
    id: '5',
    name: 'Satin Pajama Set',
    description: 'Classic satin pajama set with contrast piping. Includes long-sleeve top and pants.',
    price: 69.99,
    tags: ['satin', 'pajama', 'sleepwear', 'bestseller'],
    category: 'Sleepwear',
    images: ['https://images.pexels.com/photos/6311638/pexels-photo-6311638.jpeg'],
  },
  {
    id: '6',
    name: 'Lace Trim Chemise',
    description: 'Elegant chemise with delicate lace trim and adjustable straps.',
    price: 39.99,
    tags: ['chemise', 'lace', 'nightwear'],
    category: 'Nightwear',
    images: ['https://images.pexels.com/photos/7760860/pexels-photo-7760860.jpeg'],
  }
]; 
