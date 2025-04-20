
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './Home';
import Toolbar from './commons/Toolbar';
import Provincias from './provincias/Provincias';
import Ciudades from './ciudades/Ciudades';
import Publicaciones from './publicaciones/Publicacion';
import Usuarios from './usuarios/Usuarios';

createRoot(document.getElementById('root')!).render(
  <>
  <BrowserRouter>
    <Toolbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provincias" element={<Provincias />} />
        <Route path='/ciudades/:prov' element={<Ciudades />} />
        <Route path='/publicacion/:ciudad' element={<Publicaciones />} />
        <Route path='/usuarios' element={<Usuarios />} />
      </Routes>
    </Toolbar>
  </BrowserRouter>
  </>
);
