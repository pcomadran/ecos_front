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
import Publication from "../components/Publication";

const PublicationsPage = () => {
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
      <Box
        sx={{
          mr: 2,
          ml: 2,
          mb: 5,
          mt: 5,
          padding: "15px",
        }}
      >
        <Grid container spacing={2} sx={{ mt: 3 }}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Publication
                  title="¿Qué es el Upcycling?"
                  imageUrls={[ 
                    'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
                    'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
                    'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
                  ]}
                  date="17/04/2023"
                  text={`El upcycling transforma residuos en productos de mayor valor, reduciendo la basura y fomentando la creatividad. Es una práctica que beneficia al medio ambiente y a la economía local.

                        Utilizar materiales reciclados para crear algo nuevo no solo disminuye la cantidad de residuos, sino que también incentiva el diseño innovador. El upcycling es clave en la moda sostenible.

                        Además de su impacto positivo en el ambiente, el upcycling crea oportunidades de empleo en sectores creativos. Con cada producto creado, se promueve un futuro más verde y responsable.`}
                />
              </Grid>
            ))}
          </Grid>
      </Box>      
    </div>
  );
};

export default PublicationsPage;
