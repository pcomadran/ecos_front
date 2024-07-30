import { Typography, Box, Container, Grid } from "@mui/material";
import BackgroundImage from "../../public/images/Imagen landing.png";
import CategoriesPage from "./CategoriesPage";
import SupplierLanding from "../components/supplierLanding";
import PublicationsLanding from "../components/PublicationsLanding";
import SearchBar from "../components/searchBar";

const LandingPage = () => {
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "360px",
          height: "488px",
          marginTop: "56px",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <SearchBar />
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
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} sx={{ mt: 13 }}>
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
        }}
      >
        <Typography
          variant="body1"
          sx={{
            ml: 2,
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
