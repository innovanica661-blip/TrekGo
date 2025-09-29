import { useState } from "react";
import "../../App.css";

const TarjetaReservas = ({ reserva }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const imagenPredeterminada =
    "https://via.placeholder.com/350x300?text=Imagen+No+Disponible";

  // Definimos un límite de caracteres para mostrar el "Leer más"
  const limiteDescripcion = 120;
  const mostrarToggle =
    reserva.descripcion && reserva.descripcion.length > limiteDescripcion;

  return (
    <div className="tarjeta-reserva-container">
      <div className="tarjeta-reserva">
        <div className="imagen-reserva">
          <img
            src={reserva.imagen || imagenPredeterminada}
            alt={reserva.nombreReserva || "Reserva"}
            onError={(e) => (e.target.src = imagenPredeterminada)}
          />
        </div>

        <div className="info-reserva">
          <h3 className="titulo-reserva">
            {reserva.nombreReserva || "No especificado"}
          </h3>

          <div className="info-lista-reserva">
            <div className="info-item-reserva">
              <div className="info-icon-reserva">📍</div>
              <div className="info-content-reserva">
                <span className="info-value-reserva">
                  <strong>Ubicación: </strong> {reserva.ubicacion || "No disponible"}
                </span>
              </div>
            </div>

            <div className="info-item-reserva">
              <div className="info-icon-reserva">📏</div>
              <div className="info-content-reserva">
                <span className="info-value-reserva">
                  <strong>Distancia: </strong> {reserva.distancia || "No disponible"}
                </span>
              </div>
            </div>

            {/* Texto con leer más / ver menos */}
            {reserva.descripcion && (
              <div className="info-item-reserva">
                <div className="info-icon-reserva">📝</div>
                <div className="info-content-reserva">
                  <p className={`info-texto ${isExpanded ? "expandido" : ""}`}>
                  <strong>Descripción: </strong> {reserva.descripcion}
                  </p>
                  {mostrarToggle && (
                    <span className="toggle-texto" onClick={toggleExpand}>
                      {isExpanded ? "Ver menos" : "Leer más"}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarjetaReservas;
