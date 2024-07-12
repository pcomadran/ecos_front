import {
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BackgroundImage from "../../public/images/Imagen landing.png";
import CategoriesPage from "../pages/CategoriesPage";
import SupplierLanding from "../components/supplierLanding";
import PublicationsLanding from "../components/PublicationsLanding";

const LandingPage = () => {
  return (
    <div>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Container
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            paddingTop: "80px",
          }}
        >
          {/* Campo de búsqueda */}
          <TextField
            variant="outlined"
            placeholder="Buscar Proveedores"
            fullWidth
            style={{
              marginBottom: "20px",
              backgroundColor: "#fafafa",
              borderRadius: "50px",
              maxWidth: "500px",
              height: "60px",
              zIndex: 1,
            }}
            InputProps={{
              style: {
                padding: "2px 20px",
                borderRadius: "50px",
                border: "none",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
              <Typography variant="h6" align="left" gutterBottom>
                RED DE IMPACTO
              </Typography>
              <Typography variant="h4" align="left" sx={{ width: "80%" }}>
                Conectamos proveedores y personas comprometidas con el impacto y
                el consumo consciente
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Box
        sx={{
          mr: 2,
          ml: 2,
          mb: 5,
          mt: 5,
          padding: "15px",
          borderTop: "1px solid #4E169D",
          borderBottom: "1px solid #4E169D",
        }}
      >
        <Typography
          variant="h5"
          style={{
            marginBottom: "5px",
            color: "#6b46c1",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          ¿Qué son las empresas de impacto?
        </Typography>
        <Typography
          variant="body1"
          style={{ fontWeight: 500, textAlign: "center" }}
        >
          Son organizaciones con un compromiso fundamental con la generación de
          un impacto positivo en la sociedad y el medio ambiente como parte
          integral de su modelo de negocio.
        </Typography>
      </Box>
      <SupplierLanding />
      <CategoriesPage />
      <PublicationsLanding />
    </div>
  );
};

export default LandingPage;
