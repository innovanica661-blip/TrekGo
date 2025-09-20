import React from "react";
import { Table, Button } from "react-bootstrap";
import Paginacion from "../ordenamiento/Paginacion";

import "bootstrap-icons/font/bootstrap-icons.css";

const TablaTipos = ({
    tipos,
    openEditModal,
    openDeleteModal,
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
  }) => {
  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
          <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo.id}>
              <td>{tipo.nombre}</td>
              
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openEditModal(tipo)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => openDeleteModal(tipo)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
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

export default TablaTipos;