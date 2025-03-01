import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import { BACKEND_HOST } from "../constants";

interface User {
  id: string;
  username: string;
  email: string;
}

interface RegisterBodyType {
  username: string;
  email: string;
  password: string;
}

interface LoginBodyType {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean | null;
  user: User | null;
  refreshToken: string | null;
  register: (registerBody: RegisterBodyType) => Promise<boolean>;
  login: (loginBody: LoginBodyType) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const register = async (registerBody: RegisterBodyType) => {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/v1/users/signup`,
        registerBody
      );

      const statusCode = response?.data?.statusCode;
      return statusCode === 201;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const login = async (loginBody: LoginBodyType) => {
    try {
      const response = await axios.post(
        `${BACKEND_HOST}/api/v1/users`,
        loginBody
      );

      const { refreshToken, user } = response.data;
      setIsAuthenticated(true);
      setUser(user);
      setRefreshToken(refreshToken);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${BACKEND_HOST}/api/v1/users/logout`);

      setIsAuthenticated(false);
      setUser(null);
      setRefreshToken(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, refreshToken, user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
