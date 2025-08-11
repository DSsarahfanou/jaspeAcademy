// // src/middleware.js (ou à la racine du projet)
// import { NextResponse } from 'next/server';

// export function middleware(req) {
//   const url = req.nextUrl.clone();
//   const role = req.cookies.get('role')?.value; // Lecture du cookie 'role'

//   const { pathname } = req.nextUrl;

//   // Définir les règles
//   if (pathname.startsWith('/(app)/dashboard/admin') && role !== 'admin') {
//     url.pathname = '/unauthorized'; // Crée une page /unauthorized pour rediriger
//     return NextResponse.redirect(url);
//   }

//   if (pathname.startsWith('/(app)/dashboard/animateur') && role !== 'teacher') {
//     url.pathname = '/unauthorized';
//     return NextResponse.redirect(url);
//   }

//   if (pathname.startsWith('/(app)/dashboard/apprenant') && role !== 'student') {
//     url.pathname = '/unauthorized';
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// // Définir où le middleware s'applique
// export const config = {
//   matcher: [
//     '/(app)/dashboard/:path*'
//   ],
// };


// src/middleware.js
import { NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard'] // Ajoutez vos routes protégées ici

async function fetchUser(token) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function middleware(request) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page protégée
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si l'utilisateur est authentifié mais n'a pas vérifié son email
  if (token && pathname !== '/verify-email' && !request.nextUrl.searchParams.get('verified')) {
    const user = await fetchUser(token)
    if (user && !user.email_verified_at) {
      return NextResponse.redirect(new URL('/verify-email', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}