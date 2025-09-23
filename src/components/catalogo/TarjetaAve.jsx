import { Card, Col, Button, Modal, Row } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";
import { useState } from "react";

const TarjetaAves = ({ ave }) => {
  const [showDetalles, setShowDetalles] = useState(false);

  const handleClose = () => setShowDetalles(false);
  const handleShow = () => setShowDetalles(true);

  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Zoom cascade triggerOnce delay={10} duration={600}>
        <Card>
          <div style={{ position: 'relative' }}>
            {ave.imagen && (
              <Card.Img variant="top" src={ave.imagen} alt={ave.nombre_comun} />
            )}
          </div>
          <Card.Body>
            <Card.Title>{ave.nombre_comun}</Card.Title>
            <Card.Text>
              Tipo: {ave.tipo || 'No especificado'}
            </Card.Text>
            <Card.Text>
              Reserva: {ave.reserva || 'No especificado'}
            </Card.Text>
            <Card.Text>
              Ubicación: {ave.ubicacion || 'No disponible'}
            </Card.Text>
            <Button variant="primary" onClick={handleShow}>
              Ver detalles
            </Button>
          </Card.Body>
        </Card>
      </Zoom>

      <Modal show={showDetalles} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles de {ave.nombre_comun}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              {ave.imagen && (
                <img
                  src={ave.imagen}
                  alt={ave.nombre_comun}
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }} // Imagen más pequeña
                />
              )}
            </Col>
            <Col md={8}>
              <p><strong>Nombre Común:</strong> {ave.nombre_comun || 'No disponible'}</p>
              <p><strong>Actividad:</strong> {ave.reservaData?.actividad || 'No disponible'}</p>
              <p><strong>Ubicación:</strong> {ave.ubicacion || 'No disponible'}</p>
              <p><strong>Guía:</strong> {ave.guia || 'No asignado'}</p>
              <p><strong>Fecha:</strong> {ave.reservaData?.fecha || 'No disponible'}</p>
              <p><strong>Distancia:</strong> {ave.reservaData?.distancia || 'No disponible'}</p>
              <p><strong>Costo:</strong> ${ave.reservaData?.precioCosto || 'No disponible'}</p>
              <p><strong>Cupo:</strong> {ave.cupo || 'No disponible'}</p>
              <p><strong>Dificultad:</strong> {ave.reservaData?.dificultad || 'No disponible'}</p>
  
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* Opcional: Botón de reservar */}
          {/* <Button variant="success">Reservar</Button> */}
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default TarjetaAves;