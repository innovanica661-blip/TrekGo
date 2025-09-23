import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionReserva = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteReserva,
  reservaAEliminar,
}) => {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar la reserva{" "}
        {reservaAEliminar ? `con ID ${reservaAEliminar.id}` : "esta reserva"}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDeleteReserva}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionReserva;