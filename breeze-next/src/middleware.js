// src/middleware.js (ou à la racine du projet)
import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const role = req.cookies.get('role')?.value; // Lecture du cookie 'role'

  const { pathname } = req.nextUrl;

  // Définir les règles
  if (pathname.startsWith('/(app)/dashboard/admin') && role !== 'admin') {
    url.pathname = '/unauthorized'; // Crée une page /unauthorized pour rediriger
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/(app)/dashboard/animateur') && role !== 'teacher') {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/(app)/dashboard/apprenant') && role !== 'student') {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Définir où le middleware s'applique
export const config = {
  matcher: [
    '/(app)/dashboard/:path*'
  ],
};
