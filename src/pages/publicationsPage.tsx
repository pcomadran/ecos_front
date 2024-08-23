import {
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";
import BackgroundImage from "../../public/images/Imagen publicaciones.png";
import Publication from "../components/Publication";
import SearchBar from "../components/searchBar";
import { useEffect, useState } from "react";
import { getAllActivePublications } from "../servises/callsApi";

interface PublicationData {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  imagesURLs: string[];
  viewCount: number;
  deleted: boolean;
}

const PublicationsPage: React.FC = () => {

  const [publications, setPublications] = useState<PublicationData[]>([]);

  useEffect(() => {
    
    const fetchPublications = async () => {
      try {
        const response = await getAllActivePublications();
        // Ordenar las publicaciones por fecha de creación (de la más reciente a la más antigua)
        const sortedPublications = response.sort((a: PublicationData, b: PublicationData) => {
          const dateA = new Date(a.creationDate.split('-').reverse().join('-')); 
          const dateB = new Date(b.creationDate.split('-').reverse().join('-'));
          return dateB.getTime() - dateA.getTime(); 
        });
        setPublications(sortedPublications);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchPublications();
  }, []);


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
        {publications.map((publication) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={publication.id}>
            <Publication
              title={publication.title}
              imageUrls={publication.imagesURLs}
              date={publication.creationDate}
              text={publication.description}
              viewCount={publication.viewCount}
              deleted={publication.deleted} 
              id={publication.id}
            />
          </Grid>
        ))}
      </Grid>
      </Box>
    </div>
  );
};

export default PublicationsPage;
