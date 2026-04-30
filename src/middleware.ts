import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    const validUser = process.env.AUTH_USER
    const validPass = process.env.AUTH_PASS

    // Only enforce if the environment variables are actually set
    // This allows local development to pass if you haven't set them yet
    if (!validUser || !validPass) {
      return NextResponse.next()
    }

    if (user === validUser && pwd === validPass) {
      return NextResponse.next()
    }
  } else {
    const validUser = process.env.AUTH_USER
    const validPass = process.env.AUTH_PASS
    if (!validUser || !validPass) {
        return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

// Protect all routes except static assets
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)'],
}
