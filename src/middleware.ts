import {
  NextAuthMiddlewareOptions,
  NextMiddlewareWithAuth,
  withAuth,
} from "next-auth/middleware"
import { NextResponse } from "next/server"

const middleware: NextMiddlewareWithAuth = (request) => {
  console.log(request.nextUrl.pathname)
  console.log(request.nextauth.token)

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    request.nextauth.token?.role !== "ADMIN"
  ) {
    return NextResponse.rewrite(new URL("/denied", request.url))
  }
}

const callbacks: NextAuthMiddlewareOptions["callbacks"] = {
  authorized: ({ token }) => !!token,
}

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/app/:path*", "/todos/:path*"] }

export default withAuth(middleware, { callbacks })
