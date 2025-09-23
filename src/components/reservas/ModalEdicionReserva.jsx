import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionReserva = ({
  showEditModal,
  setShowEditModal,
  reservaEditada,
  handleEditInputChange,
  handleEditReserva,
}) => {
  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la Reserva</Form.Label>
            <Form.Control
              type="text"
              name="nombreReserva"
              value={reservaEditada?.nombreReserva || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa el nombre de la reserva"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="ubicacion"
              value={reservaEditada?.ubicacion || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa la ubicación"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Actividad</Form.Label>
            <Form.Control
              type="text"
              name="actividad"
              value={reservaEditada?.actividad || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa la actividad"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={reservaEditada?.fecha || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa la fecha"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio de Costo</Form.Label>
            <Form.Control
              type="number"
              name="precioCosto"
              value={reservaEditada?.precioCosto || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa el precio de costo"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cupo</Form.Label>
            <Form.Control
              type="number"
              name="cupo"
              value={reservaEditada?.cupo || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa el cupo"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Guía</Form.Label>
            <Form.Control
              type="text"
              name="guia"
              value={reservaEditada?.guia || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa el nombre del guía"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Distancia</Form.Label>
            <Form.Control
              type="text"
              name="distancia"
              value={reservaEditada?.distancia || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa la distancia"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dificultad</Form.Label>
            <Form.Control
              type="text"
              name="dificultad"
              value={reservaEditada?.dificultad || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa la dificultad"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditReserva}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionReserva;