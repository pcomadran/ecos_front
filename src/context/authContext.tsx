import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { decodeToken } from "react-jwt";

export enum Role {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
  VISITOR = "ROLE_VISITOR",
  SUPPLIER = "SUPPLIER",
}

export interface DecodedToken {
  sub?: string;
  name?: string;
  lastName?: string;
  email?: string;
  picture?: string;
  role?: Role;
  exp?: number;
  iat?: number;
  id?: number;
  deleted?: boolean;
}

interface AuthContextType {
  authToken: string | null;
  user: DecodedToken | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  getToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const login = () => {
    window.location.href = "http://localhost:8080/api/auth/login";
  };

  const getToken = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/token", {
        withCredentials: true,
      });
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setAuthToken(token);

      const decoded = decodeToken<DecodedToken>(token.replace("Bearer ", ""));
      if (decoded) {
        localStorage.setItem("user", JSON.stringify(decoded));
        setUser(decoded);
      }
      navigate("/");
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:8080/api/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setAuthToken(null);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
      console.log(
        "AuthContext - useEffect - usuario y token establecidos desde el almacenamiento",
        JSON.parse(storedUser)
      );
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ authToken, user, loading, login, logout, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
