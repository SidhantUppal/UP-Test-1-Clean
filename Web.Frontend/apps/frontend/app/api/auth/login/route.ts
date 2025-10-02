import { NextRequest, NextResponse } from 'next/server';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { msalServerConfig, authCodeRequest } from '@/lib/auth/msalServerConfig';
import crypto from 'crypto';
import { cookies } from 'next/headers';

const msalInstance = new ConfidentialClientApplication(msalServerConfig);

export async function GET(request: NextRequest) {
  try {
    // Generate state for CSRF protection
    const state = crypto.randomBytes(16).toString('hex');
    
    // Store state in cookie for validation later
    const cookieStore = await cookies();
    cookieStore.set('auth-state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
    });

    // Generate the auth code URL
    const authCodeUrlParameters = {
      ...authCodeRequest,
      state: state,
      redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
    };

    const authUrl = await msalInstance.getAuthCodeUrl(authCodeUrlParameters);
    
    // Redirect to Microsoft login
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to initiate login' }, { status: 500 });
  }
}