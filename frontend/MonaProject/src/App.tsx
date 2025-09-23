import './App.css'
import Header from "./components/layout/Header/Header.tsx"
import Medallero from "./components/pages/Medallero/Medallero.tsx"
import Puntajes from "./components/pages/Puntajes/Puntajes.tsx"   
import Disciplinas from "./components/pages/Disciplinas/Disciplinas.tsx"
import Calendario from "./components/pages/Calendario/Calendario.tsx"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate()

  return (
    <>
      <Header onNavigate={navigate} />
      <Routes>
        <Route path="/medallero" element={<Medallero />} />
        <Route path="/puntajes" element={<Puntajes />} />  
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </>
  )
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

