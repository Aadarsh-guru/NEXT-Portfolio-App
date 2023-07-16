import { NextRequest, NextResponse } from 'next/server'

export function middleware(NextRequest) {
    const path = NextRequest.nextUrl.pathname
    const token = NextRequest.cookies.get('token')?.value
    if (path === '/dashboard' && !token) {
        return NextResponse.redirect(new URL('/login', NextRequest.url))
    } else if ((path === '/login' || path === '/register') && token) {
        return NextResponse.redirect(new URL('/', NextRequest.url))
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register'
    ]
}