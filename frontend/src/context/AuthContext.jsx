import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as authApi from "../api/services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh လုပ်တဲ့အခါ Login အခြေအနေ စစ်မယ်
  useEffect(() => {
  const checkAuth = async () => {
    try {
      const currentUser = await authApi.getMe();
      setUser(currentUser);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Authentication check failed:", error);
      }

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

  const signIn = async (credentials) => {
    const result = await authApi.login(credentials);

    setUser(result.user);

    return result.user;
  };

  const signUp = async (data) => {
    return await authApi.register(data);
  };

  const signOut = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    const currentUser = await authApi.getMe();
    setUser(currentUser);
    return currentUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};