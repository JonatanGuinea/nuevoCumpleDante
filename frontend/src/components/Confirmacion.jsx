import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../App.css"; // CSS con animaciones y estrellas

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
      // Mostrar SweetAlert primero
      Swal.fire({
        title: `¡Gracias ${formData.nombre}!`,
        text: `Registraste ${formData.cantidad} persona(s) 🎉`,
        icon: "success",
        confirmButtonText: "¡Genial!"
      }).then(() => {
        // 🎆 Fuegos artificiales se disparan al cerrar
        triggerStars();
        setFormData({ nombre: "", cantidad: "" });
        fetchConfirmaciones(); // actualizar lista
      });
    } else {
      Swal.fire({
        title: "Error",
        text: data.message,
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al enviar la confirmación.",
      icon: "error",
    });
    console.error(error);
  }
};


  // 🎆 Fuegos artificiales desde el centro
  const triggerStars = () => {
    const newStars = Array.from({ length: 25 }).map(() => {
      const x = (Math.random() - 0.5) * 400; // horizontal
      const y = -(Math.random() * 300 + 50); // vertical
      const size = 8 + Math.random() * 12;
      const duration = 2 + Math.random() * 1.5;

      return { id: Math.random(), x, y, size, duration };
    });

    setStars(newStars);
    setTimeout(() => setStars([]), 2500);
  };

  return (
    <div className="tarjeta-container" style={{ position: "relative", overflow: "hidden" }}>
      <h1 className="titulo">¡Te espero 🎂!</h1>
      
      {/* 🎆 Fuegos artificiales */}
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
          placeholder="Ej: Dante Guinea"
          required
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
          placeholder="Ej: 3"
          required
        />
        <button type="submit">Confirmar 🎉</button>
      </form>

      <img src="/img/animales/footer.png" alt="" className="footer-img" />
    </div>
  );
}
