import React, { useEffect, useRef } from "react";
import "../App.css";

export default function Tarjeta() {
  const imagenesPaths = import.meta.glob("../../public/img/dante/*.{jpg,jpeg,png}", {
    eager: true,
  });
  const imagenes = Object.values(imagenesPaths).map((m) => (m.default ? m.default : m));

  const imgRefs = useRef([]);

  // Observador para las fotos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fotos = entry.target.querySelectorAll(".foto");
            fotos.forEach((foto, i) => {
              setTimeout(() => {
                const rot = Math.random() * 30 - 15;
                const offsetX = Math.random() * 40 - 20;
                foto.style.setProperty("--rot", `${rot}deg`);
                foto.style.setProperty("--offsetX", `${offsetX}px`);
                foto.classList.add("visible");
              }, i * 500);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".stack").forEach((bloque) => observer.observe(bloque));
    return () => observer.disconnect();
  }, []);

  // Estrellas cayendo con velocidades aleatorias
  useEffect(() => {
    const interval = setInterval(() => {
      const star = document.createElement("div");
      star.classList.add("stars");

      // posición horizontal aleatoria
      star.style.setProperty("--x", Math.random());

      // duración de caída aleatoria entre 3 y 7 segundos
      const duracion = Math.random() * 4 + 3;
      star.style.animationDuration = `${duracion}s, 1s`;

      // tamaño aleatorio
      const size = Math.random() * 4 + 5;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      document.body.appendChild(star);

      // eliminar 
      setTimeout(() => star.remove(), duracion * 10000);
    }, 300); // nueva estrella cada 0.3s

    return () => clearInterval(interval);
  }, []);

  // Agrupar imágenes
  const grupos = [];
  for (let i = 0; i < imagenes.length; i += 5) {
    grupos.push(imagenes.slice(i, i + 5));
  }

  const frases = [
    `Hola! el tiempo pasa volando...`,
    "Cada día descubro algo nuevo...",
    "¡Ya casi es mi cumpleaños!",
    "Vamos a celebrarlo juntos ",
    "te invito el 8 de Noviembre...",
    "de 17hs a 20hs, en La paz 9 bis 2 B",
    "Gracias por acompañarme",
  ];

  const imagenesFinales = [
  "/img/animales/tigre.png",
  "/img/animales/lion.png",
  "/img/animales/elefante.png",
  "/img/animales/jirafa.png",
  "/img/animales/mono.png",
  "/img/animales/leon.png",
  "/img/animales/loro.png",
  "/img/animales/leopard.png",
  "/img/animales/zebra.png"
];

  return (

    <div className="tarjeta">
      <img src="/img/dante/foto_46.jpg" alt=""  className="first-img"/>
      <h1 className="uno">¡Bienvenido!</h1>
      <h2 className="dos">A LA JUNGLA DE DANTE...</h2>

      {grupos.map((grupo, index) => (
        <div key={index} className="bloque">
          <div className="stack">
            {grupo.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Foto ${index * 7 + i + 1}`}
                ref={(el) => (imgRefs.current[index * 5 + i] = el)}
                className="foto"
              />
            ))}
          </div>
          {frases[index] && <p className="frase">{frases[index]}</p>}
          {imagenesFinales[index] && (
                  <img
                      src={imagenesFinales[index]}
                      className="safari-img"
                      alt={`Imagen final ${index + 1}`}
                    />
    )}
        </div>
      ))}
    </div>
  );
}
