import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { auth, /*db*/ } from "./FirebaseApp.js";

type AuthContextValue = {
  user: FirebaseUser | null;
  isAdmin: boolean;
  loading: boolean;
};

const FirebaseContext = createContext<AuthContextValue>({
  user: null,
  isAdmin: false,
  loading: true,
});

export const FirebaseProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const token = await user.getIdTokenResult(true);
      setIsAdmin(token.claims.role === "admin");
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(FirebaseContext);
};
