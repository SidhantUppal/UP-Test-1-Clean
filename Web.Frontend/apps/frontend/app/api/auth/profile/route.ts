import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/auth/sessionConfig';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session.isLoggedIn || !session.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Return user profile from session
    const userProfile = {
      userId: session.user.userId,
      email: session.user.email,
      firstName: session.user.name.split(' ')[0] || 'User',
      lastName: session.user.name.split(' ').slice(1).join(' ') || '',
      role: session.user.role,
      tenantId: session.user.tenantId,
      permissions: session.user.permissions,
      isActive: true,
    };

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    );
  }
}