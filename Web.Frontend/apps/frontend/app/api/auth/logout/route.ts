import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/auth/sessionConfig';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    session.destroy();

    // Redirect to Microsoft logout
    const logoutUrl = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000')}`;
    
    return NextResponse.redirect(logoutUrl);
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}