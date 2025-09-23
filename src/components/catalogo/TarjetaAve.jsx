import { Card, Col } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";

const TarjetaAves = ({ ave }) => {
  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Zoom cascade triggerOnce delay={10} duration={600}>
        <Card>
          {ave.imagen && (
            <Card.Img variant="top" src={ave.imagen} alt={ave.nombre_comun} />
          )}
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
            <Card.Text>
              Guía: {ave.guia || 'No asignado'}
            </Card.Text>
            <Card.Text>
              Cupo: {ave.cupo || 0}
            </Card.Text>
          </Card.Body>
        </Card>
      </Zoom>
    </Col>
  );
};

export default TarjetaAves;