import {
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";
import BackgroundImage from "../../public/images/Imagen publicaciones.png";
import Publication from "../components/Publication";
import SearchBar from "../components/searchBar";

const PublicationsPage = () => {
  return (
    <div>
      <div
        style={{
          marginTop: "56px",
          position: "relative",
          width: "100%",
          height: "auto",
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
          <SearchBar />
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} sx={{ mt: 13}}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  textAlign: "left",
                }}
              >
                PUBLICACIONES
              </Typography>
              <Typography
                maxWidth={"240px"}
                gutterBottom
                sx={{
                  fontSize: "28px",
                  fontWeight: 500,
                  lineHeight: "30px",
                  textAlign: "left",
                }}
              >
                Historias de impacto
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
                Encontrá inspiración y explorá las noticias y tendencias que
                están dando forma a un mundo más verde
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Box
        sx={{
          pr: 2,
          pl: 2,
          pb: 5,
          pt: 5,
          padding: "15px",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            background: "#00a360",
            clipPath:
              'path("M361 183C189.669 191.629 104.632 167.382 0 0V550C0 550 361 706 361 550V183Z")',
            zIndex: 0,
          },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ mt: 3, position: "relative", zIndex: 1 }}
        >
          {[1, 2, 3].map((index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
              <Publication
                title="¿Qué es el Upcycling?"
                imageUrls={[
                  "/images/Publicacion upcycling imagen 1.png",
                  "/images/Publicacion upcycling 2.png",
                  "/images/Publicacion upcycling imagen 3.png",
                ]}
                date="17/04/2023"
                text={`El upcycling, también conocido como supra-reciclaje o reutilización creativa, es un enfoque innovador y sostenible para la gestión de residuos y la conservación de recursos. A diferencia del reciclaje convencional, que implica descomponer materiales para crear nuevos productos, el upcycling busca transformar objetos o materiales desechados en productos de mayor valor, sin degradar su calidad.

                        Este proceso implica la reimaginación y reinvención de elementos que normalmente se considerarían basura, dándoles una segunda vida y reduciendo la cantidad de desechos enviados a vertederos. El upcycling fomenta la creatividad y la innovación, ya que requiere repensar cómo se pueden utilizar los materiales existentes de nuevas formas.

                        El upcycling se ha convertido en una poderosa herramienta para abordar los desafíos medioambientales y sociales que enfrenta nuestro planeta. Algunos ejemplos de upcycling incluyen la creación de muebles a partir de palets de madera, la confección de ropa a partir de telas recicladas o la transformación de objetos cotidianos en piezas de arte. Esto no solo reduce la cantidad de residuos, sino que también fomenta la economía circular, donde los productos y materiales se reutilizan y reciclan continuamente en lugar de desecharse.

                        El upcycling no solo beneficia al medio ambiente al reducir la cantidad de residuos, sino que también puede generar oportunidades económicas y sociales. Muchos emprendedores y artistas han encontrado en el upcycling una forma de crear productos únicos y sostenibles que atraen a consumidores conscientes de su impacto en el medio ambiente.

                        En resumen, el upcycling es una práctica innovadora que transforma desechos en tesoros, promoviendo la sostenibilidad, la creatividad y la reducción de residuos. Al adoptar el upcycling en nuestras vidas y comunidades, podemos contribuir a un mundo más limpio y respetuoso con los recursos naturales. ¡Únete al movimiento del upcycling y ayúdanos a crear un futuro más sostenible!`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default PublicationsPage;
