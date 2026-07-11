import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const token = req.auth?.user;
  const path = req.nextUrl.pathname;

  // Protected routes
  const protectedPaths = [
    '/dashboard',
    '/helpdesk',
    '/suggestions',
    '/lost-and-found',
    '/roommate-matching',
    '/forum',
    '/semester-checkin',
    '/past-questions',
    '/notifications',
    '/emergency',
    '/verification',
    '/conti-score',
    '/portal',
  ];
  const adminPaths = ['/admin', '/dashboard/admin'];
  const alumniPaths = ['/dashboard/alumni'];
  const residentPaths = ['/dashboard/resident'];

  const isProtected = protectedPaths.some((p) => path.startsWith(p));
  const isAdmin = adminPaths.some((p) => path.startsWith(p));
  const isAlumni = alumniPaths.some((p) => path.startsWith(p));
  const isResident = residentPaths.some((p) => path.startsWith(p));

  if (isProtected && !token) {
    const url = new URL('/login', req.url);
    url.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(url);
  }

  // Role-based access
  if (isAdmin && (token as any)?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isAlumni && (token as any)?.role !== 'alumni' && (token as any)?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (isResident && (token as any)?.role !== 'resident' && (token as any)?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/helpdesk/:path*',
    '/suggestions/:path*',
    '/lost-and-found/:path*',
    '/roommate-matching/:path*',
    '/forum/:path*',
    '/semester-checkin/:path*',
    '/past-questions/:path*',
    '/notifications/:path*',
    '/emergency/:path*',
    '/verification/:path*',
    '/conti-score/:path*',
    '/portal/:path*',
    '/admin/:path*',
    '/api/resident/:path*',
    '/api/alumni/:path*',
    '/api/admin/:path*',
  ],
};