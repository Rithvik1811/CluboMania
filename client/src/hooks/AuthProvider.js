import { createContext, useContext, useState } from "react";
import { isAuthorized } from "../utils/auth";

const AuthContext = createContext();
const AuthHelperContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}
function useAuthHelper() {
  return useContext(AuthHelperContext);
}

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);

  async function isAuthenticated() {
    const authData = await isAuthorized();
    setAuth(authData);
    if (authData) return true;
    return false;
  }

  const helpers = {
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={auth}>
      <AuthHelperContext.Provider value={helpers}>
        {children}
      </AuthHelperContext.Provider>
    </AuthContext.Provider>
  );
}
export { useAuth, useAuthHelper, AuthProvider };
