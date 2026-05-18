import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { refreshTokens } from "../../services/authService";

interface Props {
  children: React.ReactNode;
}

const AuthInitializer = ({ children }: Props) => {
  const [checking, setChecking] = useState(true);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    const initAuth = async () => {
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (!storedRefreshToken) {
        setChecking(false);
        return;
      }

      try {
        const data = await refreshTokens(storedRefreshToken);
        setAccessToken(data.accessToken);           // ← triggers reactive update
        localStorage.setItem("refreshToken", data.refreshToken);
      } catch {
        clearAuth();
      } finally {
        setChecking(false);
      }
    };

    initAuth();
  }, []);

  if (checking) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthInitializer;