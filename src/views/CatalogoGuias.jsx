import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Card } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const CatalogoGuias = () => {
  const [guias, setGuias] = useState([]);
  const [certificaciones, setCertificaciones] = useState([]);
  const [certificacionSeleccionada, setCertificacionSeleccionada] = useState("Todas");
  const [guiasFiltrados, setGuiasFiltrados] = useState([]);
  const [searchText, setSearchText] = useState("");

  const guiasCollection = collection(db, "guias");
  const certificacionesCollection = collection(db, "certificaciones");

  const fetchData = async () => {
    try {
      const guiasData = await getDocs(guiasCollection);
      const fetchedGuias = guiasData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log("Datos de guías cargados:", fetchedGuias); // Depuración temporal
      setGuias(fetchedGuias);
      setGuiasFiltrados(fetchedGuias);

      const certificacionesData = await getDocs(certificacionesCollection);
      const fetchedCertificaciones = certificacionesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log("Datos de certificaciones cargados:", fetchedCertificaciones); // Depuración temporal
      setCertificaciones(fetchedCertificaciones);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);

    const filtrados = guias.filter((guia) =>
      `${guia.nombre} ${guia.apellido}`.toLowerCase().includes(text) ||
      guia.certificacion?.toLowerCase().includes(text) ||
      guia.telefono?.toLowerCase().includes(text)
    );
    setGuiasFiltrados(filtrados);
  };

  useEffect(() => {
    const filtradosPorCertificacion =
      certificacionSeleccionada === "Todas"
        ? guias
        : guias.filter((guia) => guia.certificacion === certificacionSeleccionada);
    setGuiasFiltrados(filtradosPorCertificacion);
  }, [certificacionSeleccionada, guias]);

  const TarjetaCatalogoGuia = ({ guia }) => {
    if (!guia) return null; // Verificación extra para evitar errores

    return (
      <Col lg={3} md={4} sm={12} className="mb-4">
        <Card>
          {guia.imagenes && (
            <Card.Img variant="top" src={guia.imagenes} alt={`${guia.nombre} ${guia.apellido}`} />
          )}
          <Card.Body>
            <Card.Title>{`${guia.nombre} ${guia.apellido || ''}`}</Card.Title>
            <Card.Text>
              Certificación: {guia.certificacion || 'No especificada'}
            </Card.Text>
            <Card.Text>
              Teléfono: {guia.telefono || 'No disponible'}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Catálogo de Guías</h4>
      <Row>
        <Col lg={3} md={4} sm={12}>
          <Form.Group className="mb-3">
            <Form.Select
              value={certificacionSeleccionada}
              onChange={(e) => setCertificacionSeleccionada(e.target.value)}
            >
              <option value="Todas">Todas</option>
              {certificaciones.map((certificacion) => (
                <option key={certificacion.id} value={certificacion.nombre}>
                  {certificacion.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6} md={8} sm={12}>
          <CuadroBusquedas
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </Col>
      </Row>

      <Row>
        {guiasFiltrados.length > 0 ? (
          guiasFiltrados.map((guia) => (
            <TarjetaCatalogoGuia key={guia.id} guia={guia} />
          ))
        ) : (
          <p>No hay guías para mostrar.</p>
        )}
      </Row>
    </Container>
  );
};

export default CatalogoGuias;