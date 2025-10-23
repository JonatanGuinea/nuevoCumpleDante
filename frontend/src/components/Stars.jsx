import React, { useEffect, useState } from "react";

export default function Stars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Genera 15 estrellas nuevas
    const newStars = Array.from({ length: 15 }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100 + "%", // posición horizontal aleatoria
      size: Math.random() * 1.5 + 0.5 + "rem", // tamaño aleatorio
      x: (Math.random() * 50 - 25) + "px", // desviación horizontal
      duration: Math.random() * 2 + 1.5 + "s" // duración aleatoria
    }));
    setStars(newStars);

    // Limpia después de 2.5s
    const timer = setTimeout(() => setStars([]), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: star.left,
            fontSize: star.size,
            "--x": star.x,
            animationDuration: star.duration
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}
