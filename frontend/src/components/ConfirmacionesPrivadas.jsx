import React, { useState, useEffect } from "react";

export default function ConfirmacionesPrivadas() {
  const [confirmaciones, setConfirmaciones] = useState([]);

  useEffect(() => {
    fetchConfirmaciones();
  }, []);

  const fetchConfirmaciones = async () => {
    try {
      const res = await fetch("https://backend-dante.onrender.com/api/confirmaciones");
      const data = await res.json();
      setConfirmaciones(data);
    } catch (error) {
      console.error("Error al obtener confirmaciones:", error);
    }
  };

  return (
    <div className="tarjeta-container-confirmaciones">
      <h1>Confirmaciones privadas</h1>
      {confirmaciones.length === 0 ? (
        <p>Aún no hay confirmaciones.</p>
      ) : (
        <ul>
          {confirmaciones.map((c) => (
            <li key={c.id}>
              {c.nombre} - {c.cantidad} persona(s) 🎉 - {new Date(c.fecha).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
