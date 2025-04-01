import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req: request, res })

  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()

  // 認証が必要なルートのパターン
  const isAuthRoute = request.nextUrl.pathname.startsWith('/(requireAuth)') ||
                     request.nextUrl.pathname.match(/^\/(words|profile|practice)/);

  // 認証が不要なルートのパターン（トップページを除外）
  const isPublicRoute = request.nextUrl.pathname.match(/^\/(login|register)$/);

  if (isAuthRoute) {
    if (!session) {
      // 未認証の場合、ログインページにリダイレクト
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (isPublicRoute && session) {
    // すでにログインしている場合、wordsページにリダイレクト
    return NextResponse.redirect(new URL('/vocabulary', request.url))
  }

  return res
}

// 全てのルートでミドルウェアを実行
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
