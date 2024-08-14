import React from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import Publication from "../components/Publication";

const PublicationsFormPage: React.FC = () => {
  return (
    <Container sx={{ width: "100%", paddingTop: "96px" }}>
      <Typography
        sx={{
          width: "100%",
          fontSize: "28px",
          fontWeight: 600,
          lineHeight: "35px",
          textAlign: "center",
        }}
      >
        Publicaciones
      </Typography>
      <Button
        variant="contained"
        disableElevation
        sx={{
          width: "328px",
          backgroundColor: "#4E169D",
          color: "#fafafa",
          borderRadius: "100px",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "30px",
          padding: "5px 24px",
          display: "flex",
          alignItems: "center",
          marginTop: 3,
          marginBottom: 5,
        }}
        // onClick={handleButtonClick}
      >
        Crear publicación
      </Button>
      <Typography
        sx={{
          width: "100%",
          fontSize: "22px",
          fontWeight: 600,
          lineHeight: "30px",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Publicaciones cargadas
      </Typography>
      <Grid container spacing={2} sx={{ position: "relative", zIndex: 1 }}>
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
    </Container>
  );
};

export default PublicationsFormPage;
