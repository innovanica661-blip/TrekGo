import React from "react";
import { Table, Button } from "react-bootstrap";
import Paginacion from "../ordenamiento/Paginacion";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaGuias = ({
  guias,
  openEditModal,
  openDeleteModal,
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  console.log("Guias recibidas en TablaGuias:", guias); // Depuración

  // Ordenar guias por id en orden ascendente
  const sortedGuias = [...guias].sort((a, b) => a.id - b.id);

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Certificación</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedGuias.length === 0 ? (
            <tr>
              <td colSpan="6">No hay guías para mostrar.</td>
            </tr> // Mensaje si está vacío
          ) : (
            sortedGuias.map((guia) => (
              <tr key={guia.id}>
                <td>{guia.nombre}</td>
                <td>{guia.apellido}</td>
                <td>{guia.cedula}</td>
                <td>{guia.certificacion}</td>
                <td>{guia.telefono}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditModal(guia)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => openDeleteModal(guia)}
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

export default TablaGuias;