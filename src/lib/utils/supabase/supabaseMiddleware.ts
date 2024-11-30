import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  if (!request.cookies) {
    console.warn("No cookies found; skipping session update.");
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

// Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  //Handle access control for protected routes like /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      // Redirect if no user is found
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // Handle email link errors
  const emailLinkError = 'Email link is invalid or has expired';
  if (
    request.nextUrl.searchParams.get('error_description') === emailLinkError &&
    request.nextUrl.pathname !== '/signup'
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/signup'
    url.searchParams.set('error_description', emailLinkError)
    return NextResponse.redirect(url)
  }

  // Handle redirects for authenticated users to avoid accessing login/signup
  if (['/login', '/signup'].includes(request.nextUrl.pathname)) {
    if (user) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse;
}