import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Helper function to add CORS headers
function addCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', 'https://www.indeed.com');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export async function middleware(request) {
  const url = new URL(request.url);
  const token = request.cookies.get('token')?.value;

  // Handle OPTIONS preflight requests
  if (request.method === 'OPTIONS') {
    const response = NextResponse.next();
    return addCorsHeaders(response);
  }

  // If token is not found, redirect to login page for protected routes
  if (!token && url.pathname.startsWith('/dashboard')) {
    console.log('No token found. Redirecting to login.');
    const response = NextResponse.redirect(new URL('/login', request.url));
    return addCorsHeaders(response);
  }

  // If on the login page, check for token and redirect to dashboard if valid
  if (token && url.pathname === '/login') {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      console.log('User ID from token:', payload.userId);
      const response = NextResponse.redirect(new URL('/dashboard', request.url));
      return addCorsHeaders(response);
    } catch (error) {
      console.error('Token verification failed:', error.message);
      // Proceed to login page if token verification fails
      const response = NextResponse.next();
      return addCorsHeaders(response);
    }
  }

  // If on a protected route, verify token
  if (token && url.pathname.startsWith('/dashboard')) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      console.log('User ID from token:', payload.userId);
      // Proceed to dashboard if token is valid
      const response = NextResponse.next();
      return addCorsHeaders(response);
    } catch (error) {
      console.error('Token verification failed:', error.message);
      // Redirect to login page if token verification fails
      const response = NextResponse.redirect(new URL('/login', request.url));
      return addCorsHeaders(response);
    }
  }

  // Allow request to proceed if none of the above conditions are met
  const response = NextResponse.next();
  return addCorsHeaders(response);
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/chromeExtension/api/:path*'],
};