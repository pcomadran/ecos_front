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
          marginTop: "56px",
          position: "relative",
          width: "100%",
          height: "14%",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: "360 / 488",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(34, 34, 34, 0.7)",
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
            paddingTop: "24px",
          }}
        >
          {/* Campo de búsqueda */}
          <TextField
            variant="outlined"
            placeholder="Buscar Proveedores"
            fullWidth
            style={{
              marginBottom: "16px",
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
              {/* Agregando el nuevo Typography con los estilos especificados */}
              <Typography
                gutterBottom
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  textAlign: "left",
                }}
              >
                RED DE IMPACTO
              </Typography>
              <Typography
                maxWidth={"240px"}
                sx={{
                  pt: "5px",
                  fontSize: "24px",
                  fontWeight: 400,
                  lineHeight: "30px",
                  textAlign: "left",
                }}
              >
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
          mb: 8,
          mt: 3,
          padding: "7px",
          textAlign: "center",
          borderTop: "1px solid #4E169D",
          borderBottom: "1px solid #4E169D",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centra los elementos verticalmente
        }}
      >
        <Typography
          variant="body1"
          sx={{
            maxWidth: "260px",
            height: "48px",
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: "25px",
            textAlign: "center",
            color: "#4E169D",
            paddingLeft: "18px",
          }}
        >
          ¿Qué son las empresas de impacto?
        </Typography>
        <Typography
          variant="body1"
          style={{ fontWeight: 500, textAlign: "center", color: "#222222" }}
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
