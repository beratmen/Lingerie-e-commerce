import { NextResponse } from 'next/server';
import { products } from '../../route';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { isPublished } = await request.json();

    // Find and update the product
    const product = products.find(p => p.id === id);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update the product status
    product.isPublished = isPublished;
    product.updatedAt = new Date().toISOString();

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Error toggling product status:', error);
    return NextResponse.json(
      { error: 'Failed to update product status' },
      { status: 500 }
    );
  }
} 
