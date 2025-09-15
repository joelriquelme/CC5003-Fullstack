import './App.css'
import Header from "./components/layout/Header/Header.tsx";
import Medallero from "./components/pages/Medallero/Medallero.tsx";

function App() {

  return (
      <div className="App">
          <Header />
          <div className="mainContent">
              <Medallero />
          </div>
      </div>

  )
}

export default App
