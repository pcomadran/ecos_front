import {
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BackgroundImage from "../../public/images/Imagen publicaciones.png";

const Publications = () => {
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
              <Typography variant="h5" gutterBottom sx={{textAlign: "left",}}>
                PUBLICACIONES
              </Typography>
              <Typography variant="h4" align="left" gutterBottom>
                Historias de impacto
              </Typography>
              <Typography variant="h6" align="left" sx={{ width: "80%" }}>
                Encontrá inspiración y explorá las noticias y tendencias que están dando forma a un mundo más verde
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Publications;
