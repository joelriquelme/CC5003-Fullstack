import './App.css'
import Header from "./components/layout/Header/Header.tsx";
import Medallero from "./components/pages/Medallero/Medallero.tsx";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header onNavigate={navigate} />
      <Routes>
        <Route path="/medallero" element={<Medallero />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
