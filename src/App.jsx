import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Header from './components/Header'
import Footer from './components/Footer'
import Series from './pages/Series'
import Capitulos from './pages/Capitulos'
import SubirSeries from './pages/SubirSeries'
import SubirManhwas from './components/SubirManhwas'


const App = () => {
  return (
    <BrowserRouter>
    <Header>

    </Header>
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/inicio" element={<Inicio/>}/>
      <Route path="/series" element={<Series/>}/>
      <Route path="/capitulos" element={<Capitulos/>}/>
      <Route path="/subirseries" element={<SubirSeries/>}/>
      <Route path="/manhwas/create" element={<SubirManhwas />} />

    </Routes>
    <Footer>

    </Footer>
    </BrowserRouter>
  )
}

export default App