import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { appfirebase } from "./firebaseconfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const db = getFirestore(appfirebase);

  useEffect(() => {
    const auth = getAuth(appfirebase);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setIsLoggedIn(!!user);
      if (user) {
        // Verificar si el usuario existe en la colección "usuarios"
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          // Si el usuario está registrado en "usuarios", su rol es 'user'
          setRole('user');
        } else {
          // Si no está registrado, asumimos que es 'admin' (autenticado via Login)
          setRole('admin');
        }
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, [db]);

  // Detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => {
      console.log("¡Conexión restablecida!");
      alert("¡Conexión restablecida!");
    };
    const handleOffline = () => {
      console.log("Estás offline. Los cambios se sincronizarán cuando vuelvas a conectarte.");
      alert("Estás offline. Los cambios se sincronizarán cuando vuelvas a conectarte.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const logout = async () => {
    const auth = getAuth(appfirebase);
    await signOut(auth);
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };