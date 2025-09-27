import { Card, Col, Button, Modal, Row, Badge } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";
import { useState } from "react";

const TarjetaAves = ({ ave }) => {
  const [showDetalles, setShowDetalles] = useState(false);

  const handleClose = () => setShowDetalles(false);
  const handleShow = () => setShowDetalles(true);

  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Zoom cascade triggerOnce delay={10} duration={600}>
        <Card style={{ height: '450px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', flex: '0 0 200px', overflow: 'hidden' }}>
            {ave.imagen && (
              <Card.Img
                variant="top"
                src={ave.imagen}
                alt={ave.reserva}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                display: 'flex',
                gap: '5px',
              }}
            >
              <Badge pill bg="info" className="custom-badge">
                <i className="bi-calendar"></i> {ave.reservaData?.fecha || 'No disponible'}
              </Badge>
              <Badge pill bg="success" className="custom-badge">
                <i className="bi-currency-dollar"></i> {ave.reservaData?.precioCosto || 'No disponible'}
              </Badge>
              <Badge pill bg="secondary" className="custom-badge">
                <i className="bi-people"></i> {ave.reservaData?.cupo || 'No disponible'}
              </Badge>
            </div>
          </div>
          <Card.Body style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '10px' }}>
            <div style={{ flex: '1 0 auto' }}>
              <Card.Title style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.3em', marginBottom: '5px' }}>
                {ave.reserva || 'No especificado'}
              </Card.Title>
              <Card.Text style={{ margin: '0', fontSize: '1.1em', marginBottom: '5px' }}>
                <strong>Ave:</strong> {ave.nombre_comun || 'No especificado'}
              </Card.Text>
              <Card.Text style={{ margin: '0', fontSize: '1.1em', marginBottom: '5px' }}>
                <strong>Tipo:</strong> {ave.tipo || 'No especificado'}
              </Card.Text>
              <Card.Text style={{ margin: '0', fontSize: '1.1em' }}>
                <strong>Ubicación:</strong> {ave.ubicacion || 'No disponible'}
              </Card.Text>
            </div>
            <Button variant="primary" onClick={handleShow} style={{ marginTop: '10px', width: '100%' }}>
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
                  style={{ width: '100%', maxWidth: '200px', height: 'auto' }}
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
              <p><strong>Dificultad:</strong> {ave.reservaData?.dificultad || 'No disponible'}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default TarjetaAves;