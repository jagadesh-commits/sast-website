import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth) {
    const decoded = atob(auth.split(' ')[1] || '');
    const [user, pass] = decoded.split(':');
    if (user === process.env.DASHBOARD_USER && pass === process.env.DASHBOARD_PASS) {
      return NextResponse.next();
    }
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="SAST Dashboard"' },
  });
}

export const config = { matcher: ['/dashboard', '/dashboard/:path*'] };
