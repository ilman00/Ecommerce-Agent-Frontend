import { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { refreshTokens } from '../../services/authService';

interface Props {
  children: React.ReactNode;
}

const AuthInitializer = ({ children }: Props) => {
  const [checking, setChecking] = useState(true);
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return; // Skip if already ran
    initialized.current = true;
    const initAuth = async () => {
      try {

        const data = await refreshTokens();

        const placeholderUser = {
          userId: '',
          email: '',
          role: 'user' as const,
        };

        useAuthStore.getState().setAuth(placeholderUser, data.accessToken, data.expiresIn);
      } catch (error) {
        // Just clear auth - ProtectedRoute will handle redirect
        useAuthStore.getState().clearAuth();
      } finally {
        setChecking(false);
      }
    };

    initAuth();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/80 animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm">Initializing...</p>
            <p className="text-white/30 text-xs mt-1">Setting up your session</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer;