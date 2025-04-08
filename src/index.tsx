
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './Home';
import Toolbar from './commons/Toolbar';

createRoot(document.getElementById('root')!).render(
  <>
  <BrowserRouter>
    <Toolbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Toolbar>
  </BrowserRouter>
  </>
);
