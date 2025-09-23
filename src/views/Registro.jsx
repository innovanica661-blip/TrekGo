import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { appfirebase } from "../database/firebaseconfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Importo correctamente
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(appfirebase); // Inicializo auth aquí si no está exportado
  const db = getFirestore(appfirebase);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear usuario en Authentication
      const email = `${cedula}@trekgo.com`; // Generar email único basado en cédula
      const password = "defaultPassword123"; // Contraseña temporal (deberías permitir que el usuario la defina)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Uso la función importada
      const user = userCredential.user;

      // Guardar datos en Firestore con el UID como ID
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        apellido,
        cedula,
        telefono,
        role: 'user',
      });

      console.log("Usuario registrado en Firestore y Authentication");
      navigate("/inicio");
    } catch (error) {
      setError("Error al registrar el usuario: " + error.message);
      console.error(error);
    }
  };

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Registro de Usuario</h2>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cédula</Form.Label>
          <Form.Control
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" type="submit" className="w-100">
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default Registro;