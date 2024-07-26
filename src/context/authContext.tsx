"use client";
import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const assignUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const login = async (userCredentials) => {
    try {
      const res = await axios.post("/api/login", userCredentials);
      assignUser(res.data.user);
    } catch (error) {
      console.error(error.message);
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <authContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export function useAuth() {
  return useContext(authContext);
}
