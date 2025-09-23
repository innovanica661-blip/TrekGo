import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroReserva = ({
  showModal,
  setShowModal,
  nuevaReserva,
  handleInputChange,
  handleAddReserva,
  guias,
}) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la Reserva</Form.Label>
            <Form.Control
              type="text"
              name="nombreReserva"
              value={nuevaReserva.nombreReserva}
              onChange={handleInputChange}
              placeholder="Ingresa el nombre de la reserva"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="ubicacion"
              value={nuevaReserva.ubicacion}
              onChange={handleInputChange}
              placeholder="Ingresa la ubicación"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Actividad</Form.Label>
            <Form.Control
              type="text"
              name="actividad"
              value={nuevaReserva.actividad}
              onChange={handleInputChange}
              placeholder="Ingresa la actividad"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={nuevaReserva.fecha}
              onChange={handleInputChange}
              placeholder="Ingresa la fecha"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio de Costo</Form.Label>
            <Form.Control
              type="number"
              name="precioCosto"
              value={nuevaReserva.precioCosto}
              onChange={handleInputChange}
              placeholder="Ingresa el precio de costo"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cupo</Form.Label>
            <Form.Control
              type="number"
              name="cupo"
              value={nuevaReserva.cupo}
              onChange={handleInputChange}
              placeholder="Ingresa el cupo"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Guía</Form.Label>
            <Form.Select
              name="guia"
              value={nuevaReserva.guia}
              onChange={handleInputChange}
            >
              <option value="">Seleccione un guia</option>
              {guias && guias.map((guia) => ( // Verificación condicional
                <option key={guia.id} value={guia.nombre}>
                  {guia.nombre} {guia.apellido}
                </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Distancia</Form.Label>
            <Form.Control
              type="text"
              name="distancia"
              value={nuevaReserva.distancia}
              onChange={handleInputChange}
              placeholder="Ingresa la distancia"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dificultad</Form.Label>
            <Form.Control
              type="text"
              name="dificultad"
              value={nuevaReserva.dificultad}
              onChange={handleInputChange}
              placeholder="Ingresa la dificultad"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddReserva}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroReserva;