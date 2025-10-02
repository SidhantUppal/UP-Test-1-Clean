'use client';

import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { PermissionProvider } from '@/contexts/PermissionContext';
import { DevOverlayProvider } from '@/contexts/DevOverlayContext';
import { DevOverlayWrapper } from '@/components/dev/DevOverlay';
import { DevOverlayErrorBoundary } from '@/components/dev/DevOverlayErrorBoundary';
import { AuthProvider } from '@/lib/auth/contexts/AuthContext';
import AuthDebugPanel from '@/components/debug/AuthDebugPanel';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <PermissionProvider>
              <DevOverlayProvider>
                {children}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                    success: {
                      iconTheme: {
                        primary: '#10b981',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                <DevOverlayErrorBoundary>
                  <DevOverlayWrapper />
                </DevOverlayErrorBoundary>
                <AuthDebugPanel />
              </DevOverlayProvider>
          </PermissionProvider>
        </ThemeProvider>
      </AuthProvider>
      </body>
    </html>
  );
}