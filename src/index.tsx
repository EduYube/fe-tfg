
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './Home';
import Toolbar from './commons/Toolbar';
import Provincias from './provincias/Provincias';

createRoot(document.getElementById('root')!).render(
  <>
  <BrowserRouter>
    <Toolbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provincias" element={<Provincias />} />
      </Routes>
    </Toolbar>
  </BrowserRouter>
  </>
);
