import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/landinPage";

function App() {
  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/proveedores" element={<LandingPage />} />
          <Route path="/publicaciones" element={<LandingPage />} />
          <Route path="/iniciar-sesion" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
