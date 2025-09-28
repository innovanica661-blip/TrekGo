import { useState } from "react";
import "../../App.css";

const TarjetaAves = ({ ave }) => {
  const [showDetalles, setShowDetalles] = useState(false);

  const handleClose = () => setShowDetalles(false);
  const handleShow = () => setShowDetalles(true);

  return (
    <div className="tarjeta-ave-container">
      <div 
        className="tarjeta-ave"
        style={{
          '--imagen-fondo': ave.imagen ? `url(${ave.imagen})` : 'none'
        }}
      >
        {/* Sección de imagen */}
        <div className="imagen-section"></div>

        {/* Sección de información */}
        <div className="informacion-section">
          <h3 className="titulo-ave">{ ave.reserva || 'No especificado'}</h3>

          <div className="info-lista">

            {/* 🔹 Ahora el nombre del ave va primero */}
            <div className="info-item">
              <div className="info-icon">🐦</div>
              <div className="info-content">
                <span className="info-label">Ave:</span>
                <span className="info-value">{ave.nombre_comun || 'No especificado'}</span>
              </div>
            </div>

            {/* 🔹 Tipo de ave va después */}
            <div className="info-item">
              <div className="info-icon">🏷️</div>
              <div className="info-content">
                <span className="info-label">Tipo:</span>
                <span className="info-value">{ave.tipo || 'No especificado'}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <span className="info-label">Ubicación:</span>
                <span className="info-value">{ave.ubicacion || 'No disponible'}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">👥</div>
              <div className="info-content">
                <span className="info-label">Guía:</span>
                <span className="info-value">{ave.guia || 'No asignado'}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📅</div>
              <div className="info-content">
                <span className="info-label">Fecha:</span>
                <span className="info-value">{ave.reservaData?.fecha || 'No disponible'}</span>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🪙</div>
              <div className="info-content">
                <span className="info-label">Precio:</span>
                <span className="info-value">{ave.reservaData?.precioCosto || 'No disponible'}</span>
              </div>
            </div>
          </div>

          <div className="botones-section">
            <button className="btn-ver-detalle" onClick={handleShow}>
              Ver detalle
            </button>
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {showDetalles && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles de {ave.nombre_comun}</h2>
              <button className="modal-close" onClick={handleClose}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-image">
                {ave.imagen && (
                  <img
                    src={ave.imagen}
                    alt={ave.nombre_comun}
                    className="modal-img"
                  />
                )}
              </div>
              <div className="modal-info">
                <p><strong>Nombre Común:</strong> {ave.nombre_comun || 'No disponible'}</p>
                <p><strong>Tipo:</strong> {ave.tipo || 'No especificado'}</p>
                <p><strong>Reserva:</strong> {ave.reserva || 'No especificado'}</p>
                <p><strong>Actividad:</strong> {ave.reservaData?.actividad || 'No disponible'}</p>
                <p><strong>Ubicación:</strong> {ave.ubicacion || 'No disponible'}</p>
                <p><strong>Guía:</strong> {ave.guia || 'No asignado'}</p>
                <p><strong>Fecha:</strong> {ave.reservaData?.fecha || 'No disponible'}</p>
                <p><strong>Distancia:</strong> {ave.reservaData?.distancia || 'No disponible'}</p>
                <p><strong>Costo:</strong> ${ave.reservaData?.precioCosto || 'No disponible'}</p>
                <p><strong>Dificultad:</strong> {ave.reservaData?.dificultad || 'No disponible'}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cerrar" onClick={handleClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarjetaAves;
