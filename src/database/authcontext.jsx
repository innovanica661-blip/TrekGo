// src/database/authcontext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { appfirebase } from "./firebaseconfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase Auth user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const db = getFirestore(appfirebase);

  useEffect(() => {
    const auth = getAuth(appfirebase);
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setIsLoggedIn(!!u);

      if (u) {
        try {
          const userDocRef = doc(db, "usuarios", u.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data() || {};
            // Si el documento define role, lo usamos; si no, por defecto 'user'
            setRole(data.role ? data.role : "user");
          } else {
            // Si no existe doc en 'usuarios', asumimos admin (según tu requerimiento)
            setRole("admin");
          }
        } catch (err) {
          console.error("Error leyendo rol en Firestore:", err);
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [db]);

  const logout = async () => {
    const auth = getAuth(appfirebase);
    await signOut(auth);
    setIsLoggedIn(false);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
