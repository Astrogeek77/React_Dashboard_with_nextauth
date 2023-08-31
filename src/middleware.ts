import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { useSession } from 'next-auth/react'

export function middleware(request: NextRequest) {
  // const session = useSession()
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''
  // const googleAuthenticated = session.status === 'authenticated'

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/dashboard',
  ]
}