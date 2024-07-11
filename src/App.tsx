import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./themes/theme";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/landinPage";
import LoginPage from "./pages/loginPage";
<<<<<<< HEAD
import Publications from './pages/publications';
import RegisterPage from './pages/registerPage';
=======
import PublicationsPage from "./pages/publicationsPage";
>>>>>>> 0aa08aced25128544f3c3e4634218cb428849247

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
<<<<<<< HEAD
            <Route path="/publicaciones" element={<Publications />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
=======
            <Route path="/publicaciones" element={<PublicationsPage />} />
            <Route path="/Login" element={<LoginPage />} />
>>>>>>> 0aa08aced25128544f3c3e4634218cb428849247
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
