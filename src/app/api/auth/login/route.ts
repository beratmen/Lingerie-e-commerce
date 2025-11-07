import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// TODO: Replace with actual database authentication
// For now, using hardcoded credentials for demo purposes
const USER_CREDENTIALS = [
  {
    email: 'user@example.com',
    password: 'password123', // In production, this should be hashed
    id: '1',
    name: 'User'
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email and password
    // TODO: Replace with actual database query and password hashing verification
    const user = USER_CREDENTIALS.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Set session cookie
      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });

      response.cookies.set('lingerie_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

