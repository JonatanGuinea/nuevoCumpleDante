import React, { useState, useEffect } from "react";
import "../App.css"; // tu CSS con animaciones, estrellas y fade-in

export default function Confirmacion() {
  const [formData, setFormData] = useState({ nombre: "", cantidad: "" });
  const [confirmaciones, setConfirmaciones] = useState([]);
  const [stars, setStars] = useState([]);

  // Obtener confirmaciones al montar
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-dante.onrender.com/api/confirmar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        triggerStars(); // 🎆 Fuegos artificiales
        alert(`¡Gracias ${formData.nombre}! Registraste ${formData.cantidad} persona(s) 🎉`);
        setFormData({ nombre: "", cantidad: "" });
        fetchConfirmaciones(); // actualizar lista
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Error al enviar la confirmación.");
      console.error(error);
    }
  };

  // 🎆 Función para generar fuegos artificiales
  const triggerStars = () => {
    const newStars = Array.from({ length: 25 }).map(() => {
      const x = (Math.random() - 0.5) * 800; // dirección horizontal
      const y = -Math.random() * 200 - 10; // dirección vertical
      const size = 8 + Math.random() * 12; 
      const duration = 5;

      return {
        id: Math.random(),
        x,
        y,
        size,
        duration,
      };
    });
    setStars(newStars);

    setTimeout(() => setStars([]), 5000);
  };

  return (
    <div className="tarjeta-container" style={{ position: "relative", overflow: "hidden" }}>
      <h1 className="titulo">¡Te espero 🎂!</h1>

      {/* 🎆 Contenedor de fuegos artificiales */}
      <div className="stars-container">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: "50%",
              top: "50%",
              fontSize: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              "--x": `${star.x}px`,
              "--y": `${star.y}px`,
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Formulario */}
      <form className="formulario" onSubmit={handleSubmit}>
        <h2>Confirmá tu asistencia</h2>
        <label htmlFor="nombre">Nombre y Apellido:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Ej: Dante Guinea"
          />
        <label htmlFor="cantidad">¿Con cuántas personas venís?</label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          min="1"
          max="10"
          value={formData.cantidad}
          onChange={handleChange}
          required
          placeholder="Ej: 3"
        />
        <button type="submit">Confirmar 🎉</button>
      </form>
      <img src="/img/animales/footer.png" alt="" className="footer-img" />
    </div>
    
  );
}
