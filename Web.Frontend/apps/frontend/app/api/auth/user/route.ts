import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/auth/sessionConfig';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    
    if (!session.isLoggedIn || !session.user) {
      return NextResponse.json({ isLoggedIn: false }, { status: 401 });
    }

    // Return user info without sensitive tokens
    return NextResponse.json({
      isLoggedIn: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Failed to get user info' }, { status: 500 });
  }
}