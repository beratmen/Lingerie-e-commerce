import { NextResponse } from 'next/server';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
}

// In-memory store for customers (replace with database in production)
export const customers: Customer[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    totalOrders: 5,
    totalSpent: 750.50,
    lastOrderDate: '2023-12-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@example.com',
    phone: '+1 (555) 987-6543',
    totalOrders: 3,
    totalSpent: 420.75,
    lastOrderDate: '2023-12-10T15:45:00Z'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    address: '456 Oak Ave, Los Angeles, CA 90001',
    totalOrders: 8,
    totalSpent: 1250.25,
    lastOrderDate: '2023-12-18T09:15:00Z'
  }
];

export async function GET() {
  return NextResponse.json(customers);
} 
