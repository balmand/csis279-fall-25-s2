import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(undefined);

const TOKEN_STORAGE_KEY = 'authToken';
const USER_STORAGE_KEY = 'authUser';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }

    if (!storedToken) {
      setInitializing(false);
      return;
    }

    authService
      .getProfile(storedToken)
      .then((profile) => {
        setUser(profile);
      })
      .catch(() => {
        clearSession();
      })
      .finally(() => {
        setInitializing(false);
      });
  }, []);

  const persistSession = (sessionUser, sessionToken) => {
    setToken(sessionToken);
    setUser(sessionUser);
    localStorage.setItem(TOKEN_STORAGE_KEY, sessionToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionUser));
  };

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const login = async ({ email, password }) => {
    const { user: sessionUser, token: sessionToken } = await authService.login({
      email,
      password
    });

    persistSession(sessionUser, sessionToken);
    return sessionUser;
  };

  const register = async ({ firstName, lastName, email, password }) => {
    const { user: sessionUser, token: sessionToken } = await authService.register({
      firstName,
      lastName,
      email,
      password
    });

    persistSession(sessionUser, sessionToken);
    return sessionUser;
  };

  const logout = async () => {
    if (token) {
      try {
        await authService.logout(token);
      } catch {
        // Ignore logout failures
      }
    }
    clearSession();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      initializing,
      login,
      register,
      logout
    }),
    [user, token, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
