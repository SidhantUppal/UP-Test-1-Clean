import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Check for errors from Azure AD
    if (error) {
      console.error('Auth error:', error, errorDescription);
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(errorDescription || error)}`, request.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/login?error=No authorization code received', request.url));
    }

    // Forward the OAuth callback to our Api.SysAdmin service
    const callbackUrl = new URL('http://localhost:3011/api/Auth/callback');
    callbackUrl.searchParams.set('code', code);
    if (state) {
      callbackUrl.searchParams.set('state', state);
    }

    // Redirect to our Api.SysAdmin OAuth callback handler
    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    console.error('Callback forwarding error:', error);
    return NextResponse.redirect(new URL('/login?error=Authentication failed', request.url));
  }
}