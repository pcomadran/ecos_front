import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./themes/theme";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/landinPage";
import LoginPage from "./pages/loginPage";
import Publications from './pages/publications';
import RegisterPage from './pages/registerPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/proveedores" element={<LandingPage />} />
            <Route path="/publicaciones" element={<Publications />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
