import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// step 1. create context
export const AuthenticationContext = createContext(null);

export function AuthenticationContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = jwtDecode(token);
      axios.get("/api/member?email=" + payload.sub).then((res) => {
        // email
        // nickName
        setUser({
          email: res.data.email,
          nickName: res.data.nickName
        });
      });
    }
  }, []);

  // login
  function login(token) {
    localStorage.setItem("token", token);
    const payload = jwtDecode(token);
    axios.get("/api/member?email=" + payload.sub).then((res) => {
      // email
      // nickName
      setUser({
        email: res.data.email,
        nickName: res.data.nickName
      });
    });
  }
}

// logout
function logout() {
  localStorage.removeItem("token");
  setUser(null);
}

// hasAccess

// isAdmin

// step 3. provide context
return <AuthenticationContext value={{ user: user, login: login, logout: logout }}>{children}</AuthenticationContext>;
}
