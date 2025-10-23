// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tarjeta from "./components/Tarjeta";
import Confirmacion from "./components/Confirmacion";
import ConfirmacionesPrivadas from "./components/ConfirmacionesPrivadas";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Imagen de cabecera */}

          <img src="/img/animales/header-animals.png" alt="" className="header-img" />
        <Routes>
          {/* Ruta pública */}
          <Route
            path="/"
            element={
              <>
              <div className="container">
                <Tarjeta />
                <Confirmacion />
              
              </div>
              </>
            }
          />

          {/* Ruta privada para ver confirmaciones */}
          <Route path="/confirmaciones" element={<ConfirmacionesPrivadas />} />
        </Routes>
    </Router>
  );
}

export default App;
