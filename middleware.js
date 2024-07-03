import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  const url = new URL(request.url);
  const token = request.cookies.get('token')?.value;

  // If token is not found, redirect to login page for protected routes
  if (!token && url.pathname.startsWith('/dashboard')) {
    console.log('No token found. Redirecting to login.');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If on the login page, check for token and redirect to dashboard if valid
  if (token && url.pathname === '/login') {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      console.log('User ID from token:', payload.userId);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      console.error('Token verification failed:', error.message);
      // Proceed to login page if token verification fails
      return NextResponse.next();
    }
  }

  // If on a protected route, verify token
  if (token && url.pathname.startsWith('/dashboard')) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      console.log('User ID from token:', payload.userId);
      // Proceed to dashboard if token is valid
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      // Redirect to login page if token verification fails
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow request to proceed if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
