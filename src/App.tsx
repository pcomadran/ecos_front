// src/App.tsx

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./themes/theme";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/landinPage";
import LoginPage from "./pages/loginPage";
import Publications from "./pages/publicationsPage";
import RegisterPage from "./pages/registerPage";
import SupplierPage from "./pages/supplierPage";
import SearchPage from "./pages/searchPage";
import ProfilePage from "./pages/profilePage";
import CreateProductPage from "./pages/createProductPage";
import { AuthProvider, Role } from "./context/authContext";
import ProtectedRoute from "./context/ProtectedRoute";
import IconChatbot from "./components/chatbot/IconChatbot";
import SupAdminPage from "./pages/supAdminPage";
import DashboardPage from "./pages/dashboardPage";
import UpdateProductPage from "./pages/updateProductPage";
import PublicationForm from "./components/PublicationForm";
import PublicationsMenuPage from "./pages/publicationsmenuPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              position: "relative",
            }}
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/proveedores" element={<SupplierPage />} />
              <Route path="/publicaciones" element={<Publications />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route element={<ProtectedRoute roles={[Role.SUPPLIER]} />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/createProduct" element={<CreateProductPage />} />
                <Route
                  path="/updateProduct/:id"
                  element={<UpdateProductPage />}
                />
              </Route>
              <Route element={<ProtectedRoute roles={[Role.ADMIN]} />}>
                <Route path="/suppliersadmin" element={<SupAdminPage />} />
                <Route
                  path="/publications/menu"
                  element={<PublicationsMenuPage/>}
                />
                <Route path="/publications/new" element={<PublicationForm/>} />
                <Route path="/publications/edit/:id" element={<PublicationForm />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Route>
            </Routes>
            <IconChatbot />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
