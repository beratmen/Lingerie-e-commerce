import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = cookies();
    
    // Clear all session-related cookies
    const cookiesToClear = ['session', 'user', 'token', 'auth'];
    cookiesToClear.forEach(name => {
      cookieStore.delete(name);
    });
    
    // Set headers to clear client-side cookies with all necessary attributes
    const headers = new Headers();
    cookiesToClear.forEach(name => {
      headers.append(
        'Set-Cookie',
        `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`
      );
    });

    return new NextResponse(
      JSON.stringify({ success: true, message: 'Logged out successfully' }),
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to logout' },
      { status: 500 }
    );
  }
} 
