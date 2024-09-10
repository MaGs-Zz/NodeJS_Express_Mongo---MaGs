import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Cursos from "../pages/Cursos/Cursos";
import Usuarios from "../pages/usuarios/Usuarios";
import MasInformacion from "../pages/masinformacion/MasInformacion";

const NavbarRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/masinformacion" element={<MasInformacion />} />
      </Routes>
    );
  };

  export default NavbarRoutes;