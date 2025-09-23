import React from "react";
import { Table, Button } from "react-bootstrap";
import Paginacion from "../ordenamiento/Paginacion"; 

import "bootstrap-icons/font/bootstrap-icons.css";

const TablaReservas = ({
  reservas,
  openEditModal,
  openDeleteModal,
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  console.log("Reservas recibidas en TablaReservas:", reservas); // Depuración
  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre de la Reserva</th>
            <th>Ubicación</th>
            <th>Actividad</th>
            <th>Fecha</th>
            <th>Precio de Costo</th>
            <th>Cupo</th>
            <th>Guía</th>
            <th>Distancia</th>
            <th>Dificultad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0 ? (
            <tr><td colSpan="10">No hay reservas para mostrar.</td></tr> // Mensaje si está vacío
          ) : (
            reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.nombreReserva}</td>
                <td>{reserva.ubicacion}</td>
                <td>{reserva.actividad}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.precioCosto}</td>
                <td>{reserva.cupo}</td>
                <td>{reserva.guia}</td>
                <td>{reserva.distancia}</td>
                <td>{reserva.dificultad}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditModal(reserva)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => openDeleteModal(reserva)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default TablaReservas;