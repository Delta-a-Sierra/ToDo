import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={[authenticated, setAuthenticated]}>
      {props.children}
    </AuthContext.Provider>
  );
};
