
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './Home';
import Toolbar from './commons/Toolbar';
import Provincias from './provincias/Provincias';
import Ciudades from './ciudades/Ciudades';

createRoot(document.getElementById('root')!).render(
  <>
  <BrowserRouter>
    <Toolbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provincias" element={<Provincias />} />
        <Route path='/ciudades/:prov' element={<Ciudades />} />
      </Routes>
    </Toolbar>
  </BrowserRouter>
  </>
);
