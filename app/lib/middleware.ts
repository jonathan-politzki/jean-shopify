// app/lib/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { authenticate } from "./shopify.server"

export async function middleware(request: NextRequest) {
  // Skip auth for specific paths
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api/auth') ||
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Initialize response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    // Handle Shopify auth
    await authenticate.admin(request)

    // Handle Supabase session
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: any) {
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Add user session to request headers for downstream use
    if (session) {
      request.headers.set('x-user-id', session.user.id)
    }

    return response
  } catch (error) {
    console.error('Auth error:', error)
    const redirectUrl = new URL('/auth/error', request.url)
    return NextResponse.redirect(redirectUrl)
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}