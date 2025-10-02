import { SessionOptions } from 'iron-session';
import { UserRole } from '@/contexts/UserContext';

export interface SessionData {
  user?: {
    id: string;
    email: string;
    name: string;
    // Database user fields (tokens removed to reduce cookie size)
    userId: number;
    role: UserRole;
    tenantId: number;
    permissions: string[];
  };
  isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long_change_this_in_production',
  cookieName: 't100-auth-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};