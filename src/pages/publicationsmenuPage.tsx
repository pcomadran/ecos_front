// src/pages/publicationsmenuPage.tsx

import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Publication from "../components/Publication";
import { getAllPublications } from "../services/callsApi";

interface PublicationData {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  imagesURLs: string[];
  viewCount: number;
  deleted: boolean;
}

const PublicationsMenuPage: React.FC = () => {
  
  const [publications, setPublications] = useState<PublicationData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchPublications = async () => {
      try {
        const response = await getAllPublications();
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

  const handleCreatePublication = () => {
    navigate("/publications/new");
  };

  return (
    console.log(publications),
    <Container sx={{ width: "100%", paddingTop: "96px", paddingBottom: "48px" }}>
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
        onClick={handleCreatePublication}
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
    </Container>
  );
};

export default PublicationsMenuPage;
