// src/views/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { appfirebase } from "../database/firebaseconfig";
import { useAuth } from "../database/authcontext";
import "../App.css";

import logo2 from "../Imagenes/logo2.jpg";
import Aves9 from "../Imagenes/Aves9.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/inicio");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const auth = getAuth(appfirebase);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/inicio");
    } catch (err) {
      console.error(err);
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError("Error al iniciar sesión: " + (err.message || err.code));
      }
    }
  };

  return (
    <div className="login-container">
      {/* Imagen izquierda */}
      <div className="login-left">
        <img src={Aves9} alt="Aves" className="login-image" />
      </div>

      {/* Formulario a la derecha */}
      <div className="login-right">
        <div className="login-box">
          {/* Logo circular arriba */}
          <div className="login-logo">
            <img src={logo2} alt="Logo" className="logo" />
          </div>

          <h3 className="text-center mb-3">Iniciar Sesión</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@ejemplo.com"
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>

            {error && <div className="text-danger mb-2">{error}</div>}

            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center mt-3">
            ¿No tienes una cuenta aún?{" "}
            <Link to="/registro" className="register-link">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
