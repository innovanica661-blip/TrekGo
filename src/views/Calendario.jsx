import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Spinner } from "react-bootstrap"; // Añadido Spinner
import { db } from "../database/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";
import TarjetaAves from "../components/calendario/TarjetaAve";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const Catalogo = () => {
  const [aves, setAves] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionada, setTipoSeleccionada] = useState("Todas");
  const [avesFiltrados, setAvesFiltrados] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true); // Estado de carga

  const avesCollection = collection(db, "aves");
  const tiposCollection = collection(db, "tipos");
  const reservasCollection = collection(db, "reservas");

  const fetchData = async () => {
    try {
      setLoading(true); // Activar carga
      const avesData = await getDocs(avesCollection);
      const fetchedAves = avesData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const reservasData = await getDocs(reservasCollection);
      const reservasMap = reservasData.docs.reduce((map, doc) => {
        const reservaData = doc.data();
        const key = reservaData.nombreReserva?.toLowerCase().trim() || doc.id.toLowerCase().trim();
        map[key] = reservaData;
        return map;
      }, {});

      const avesConReservas = fetchedAves.map((ave) => {
        const reservaKey = (ave.reserva || '').toLowerCase().trim();
        const reserva = reservasMap[reservaKey] || {};
        return {
          ...ave,
          ubicacion: reserva.ubicacion || 'No disponible',
          guia: reserva.guia || 'No asignado',
          cupo: reserva.cupo || 0,
          reservaData: reserva
        };
      });

      setAves(avesConReservas);
      setAvesFiltrados(avesConReservas);

      const tiposData = await getDocs(tiposCollection);
      const fetchedTipos = tiposData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTipos(fetchedTipos);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false); // Desactivar carga cuando termine
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
    const filtrados = aves.filter((ave) =>
      ave.nombre_comun.toLowerCase().includes(text) ||
      ave.tipo?.toLowerCase().includes(text) ||
      ave.ubicacion?.toLowerCase().includes(text) ||
      ave.guia?.toLowerCase().includes(text) ||
      String(ave.cupo).includes(text)
    );
    setAvesFiltrados(filtrados);
  };

  useEffect(() => {
    const filtradosPorTipo =
      tipoSeleccionada === "Todas"
        ? aves
        : aves.filter((ave) => ave.tipo === tipoSeleccionada);
    setAvesFiltrados(filtradosPorTipo);
  }, [tipoSeleccionada, aves]);

  return (
     <Container >
      <div className="container_busca_cate">
        <div className="tipo_ave">
          <Form.Group className="tipo">
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
        </div>
        <div className="busqueda">
          <CuadroBusquedas
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </div>
      </div>
      <Row>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : avesFiltrados.length > 0 ? (
          avesFiltrados.map((ave) => (
            <TarjetaAves key={ave.id} ave={ave} />
          ))
        ) : (
          <p>No hay Aves en este tipo.</p>
        )}
      </Row>
    </Container>
  );
};

export default Catalogo;