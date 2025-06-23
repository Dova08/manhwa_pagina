import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Header from './components/Header';
import Footer from './components/Footer';
import Series from './pages/Series';
import Capitulos from './pages/Capitulos';
import SubirSeries from './pages/SubirSeries';
import SubirManhwas from './components/SubirManhwas';
import Manhwa from './pages/Manhwa';
import ManhwaCapitulo from './pages/ManhwaCapitulo';
import Buscar from './pages/Buscar'; // Cambiado a página en lugar de componente

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="flex-shrink-0"> {/* Contenedor principal para el contenido */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/series" element={<Series />} />
          <Route path="/capitulos" element={<Capitulos />} />
          <Route path="/subirseries" element={<SubirSeries />} />
          <Route path="/manhwas/create" element={<SubirManhwas />} />
          <Route path="/manhwa/:id" element={<Manhwa />} />
          <Route 
            path="/manhwa/:manhwaId/manhwacapitulo/:capituloId" 
            element={<ManhwaCapitulo />}
          />
          <Route path="/buscar" element={<Buscar />} />
          {/* Ruta para manejar búsquedas desde el Header */}
          <Route path="/buscar/:query?" element={<Buscar />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;