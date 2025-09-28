import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Spinner } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import TarjetaReservas from "../components/calendario/TarjetaReservas"; // Adjusted to use your TarjetaReservas
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const CatalogoReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionada, setTipoSeleccionada] = useState("Todas");
  const [reservasFiltradas, setReservasFiltradas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const reservasCollection = collection(db, "reservas");
  const tiposCollection = collection(db, "tipos");

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch reservations
      const reservasData = await getDocs(reservasCollection);
      const fetchedReservas = reservasData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Fetch types
      const tiposData = await getDocs(tiposCollection);
      const fetchedTipos = tiposData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setReservas(fetchedReservas);
      setReservasFiltradas(fetchedReservas);
      setTipos(fetchedTipos);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtradas = reservas.filter(
      (reserva) =>
        reserva.nombreReserva?.toLowerCase().includes(text) ||
        reserva.descripcion?.toLowerCase().includes(text) ||
        reserva.ubicacion?.toLowerCase().includes(text) ||
        reserva.distancia?.toLowerCase().includes(text)
    );
    setReservasFiltradas(filtradas);
  };

  // Filter by type
  useEffect(() => {
    const filtradasPorTipo =
      tipoSeleccionada === "Todas"
        ? reservas
        : reservas.filter((reserva) => reserva.tipo === tipoSeleccionada);
    setReservasFiltradas(filtradasPorTipo);
  }, [tipoSeleccionada, reservas]);

  return (
    <Container className="mt-5">
      <br />
      <Row>
        <Col lg={3} md={4} sm={12}>
          <Form.Group className="mb-3">
            <Form.Select
              value={tipoSeleccionada}
              onChange={(e) => setTipoSeleccionada(e.target.value)}
            >
              <option value="Todas">Todas</option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.nombre}>
                  {tipo.nombre}
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
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : reservasFiltradas.length > 0 ? (
          reservasFiltradas.map((reserva) => (
            <TarjetaReservas key={reserva.id} reserva={reserva} />
          ))
        ) : (
          <p>No hay reservas disponibles.</p>
        )}
      </Row>
    </Container>
  );
};

export default CatalogoReservas;