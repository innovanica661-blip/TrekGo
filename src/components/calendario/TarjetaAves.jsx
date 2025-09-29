import { useState } from "react";
import "../../App.css";

const TarjetaAves = ({ ave }) => {
  return (
    <div className="tarjeta-ave-container">
      <div 
        className="tarjeta-ave"
        style={{
          '--imagen-fondo': ave.imagen ? `url(${ave.imagen})` : 'none'
        }}
      >
        {/* Sección de imagen */}
        <div className="imagen-section">
          {ave.imagen && <img src={ave.imagen} alt={ave.nombre_comun || "Ave"} style={{ display: 'none' }} />}
        </div>

        {/* Sección de información */}
        <div className="informacion-section">
          <h3 className="titulo-ave">{ave.nombre_comun || "No especificado"}</h3>
          <div className="info-lista">
            <div className="info-item">
              <div className="info-icon">🔬</div>
              <div className="info-content">
                <span className="info-label">Nombre Científico:</span>
                <span className="info-value">{ave.nombre_cientifico || "No especificado"}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📝</div>
              <div className="info-content">
                <span className="info-label">Descripción:</span>
                <span className="info-value">{ave.descripcion || "No especificado"}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🏷️</div>
              <div className="info-content">
                <span className="info-label">Tipo:</span>
                <span className="info-value">{ave.tipo || "No especificado"}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🌿</div>
              <div className="info-content">
                <span className="info-label">Reserva Natural:</span>
                <span className="info-value">{ave.reserva || "No disponible"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarjetaAves;