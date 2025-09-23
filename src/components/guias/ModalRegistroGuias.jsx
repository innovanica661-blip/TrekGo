import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroGuia = ({
  showModal,
  setShowModal,
  nuevaGuia,
  handleInputChange,
  handleAddGuia,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Guía</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevaGuia.nombre}
              onChange={handleInputChange}
              placeholder="Ingresa el nombre"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={nuevaGuia.apellido}
              onChange={handleInputChange}
              placeholder="Ingresa el apellido"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={nuevaGuia.cedula}
              onChange={handleInputChange}
              placeholder="Ingresa la cédula"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Certificación</Form.Label>
            <Form.Control
              type="text"
              name="certificacion"
              value={nuevaGuia.certificacion}
              onChange={handleInputChange}
              placeholder="Ingresa la certificación"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={nuevaGuia.telefono}
              onChange={handleInputChange}
              placeholder="Ingresa el teléfono"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddGuia}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroGuia;