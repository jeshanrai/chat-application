import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  // Get token from localStorage (or from context if you store it there)
  const token = localStorage.getItem("token");

  // Login helper
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Logout helper
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return { user, token, login, logout };
};
