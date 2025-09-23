import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionGuia = ({
  showEditModal,
  setShowEditModal,
  guiaEditada,
  handleEditInputChange,
  handleEditGuia,
}) => {
  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Guía</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={guiaEditada?.nombre || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa el nombre"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={guiaEditada?.apellido || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa el apellido"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={guiaEditada?.cedula || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa la cédula"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Certificación</Form.Label>
            <Form.Control
              type="text"
              name="certificacion"
              value={guiaEditada?.certificacion || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa la certificación"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={guiaEditada?.telefono || ""}
              onChange={handleEditInputChange}
              placeholder="Ingresa el teléfono"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditGuia}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionGuia;