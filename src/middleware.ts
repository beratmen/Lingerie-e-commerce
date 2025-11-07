import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isAdminLoginRoute = request.nextUrl.pathname === '/admin/login';
  const hasAdminSession = request.cookies.has('admin_session');

  // Allow access to admin login page if not logged in
  if (isAdminLoginRoute && !hasAdminSession) {
    return NextResponse.next();
  }

  // Redirect to admin login if trying to access admin routes without session
  if (isAdminRoute && !hasAdminSession) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to admin dashboard if accessing login page while already logged in
  if (isAdminLoginRoute && hasAdminSession) {
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
 

