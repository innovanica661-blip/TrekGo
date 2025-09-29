// src/views/Registro.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { appfirebase } from "../database/firebaseconfig";
import "../App.css";

// Importación de imágenes
import Aves5 from "../Imagenes/Aves5.jpg";
import logo2 from "../Imagenes/logo2.jpg";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth(appfirebase);
  const db = getFirestore(appfirebase);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const u = userCredential.user;

      await setDoc(doc(db, "usuarios", u.uid), {
        nombre,
        apellido,
        cedula,
        telefono,
        role: "user",
        createdAt: new Date().toISOString(),
      });

      navigate("/inicio");
    } catch (err) {
      console.error("Error en registro:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("El correo ya está en uso. Intenta iniciar sesión o usa otro correo.");
      } else {
        setError("Error al registrar: " + (err.message || err.code));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        {/* Sección izquierda con formulario */}
        <div className="registro-form">
          {/* Logo circular (idéntico al login) */}
          <div className="logo-container">
            <img src={logo2} alt="Logo" className="logo" />
          </div>

          <h4 className="registro-titulo">Registrarse</h4>

          <form onSubmit={handleSubmit}>
            <input
              className="input-registro"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              className="input-registro"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
            <input
              className="input-registro"
              placeholder="Cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />
            <input
              className="input-registro"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
            <input
              type="email"
              className="input-registro"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-registro"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-registro"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && <div className="error-text">{error}</div>}

            <button className="btn-registrarse" type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          <p className="texto-login">
            ¿Ya tienes una cuenta? <Link to="/login" className="register-link2">
                          Inicia sesión aquí
                        </Link>
            
          </p>
        </div>

        {/* Sección derecha con imagen */}
        <div className="registro-imagen">
          <img src={Aves5} alt="Ave" className="imagen-ave" />
          {/* texto-imagen oculto por CSS para evitar mostrar "Regístrate con nosotros" */}
          <h3 className="texto-imagen">Regístrate con nosotros</h3>
        </div>
      </div>
    </div>
  );
};

export default Registro;
