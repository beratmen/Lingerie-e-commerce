import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('lingerie_session');
    
    if (session && session.value === 'authenticated') {
      // In a real application, you would fetch user data from database
      // For now, return a mock user
      return NextResponse.json({
        user: {
          id: '1',
          name: 'User',
          email: 'user@example.com'
        }
      });
    }
    
    return NextResponse.json({ user: null });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ user: null });
  }
}

