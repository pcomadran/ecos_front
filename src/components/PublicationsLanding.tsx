import { Typography, Box, Grid } from "@mui/material";
import Publication from "./Publication";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getAllLastThreeActivePublications } from "../services/callsApi";
import { useEffect, useState } from "react";

interface PublicationData {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  imagesURLs: string[];
  viewCount: number;
  deleted: boolean;
}

const PublicationsLanding: React.FC = () => {

  const [publications, setPublications] = useState<PublicationData[]>([]);

  useEffect(() => {
    
    const fetchPublications = async () => {
      try {
        const response = await getAllLastThreeActivePublications();
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

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/publicaciones");
  };

  return (
    <div>
      <Box paddingLeft={"16px"} paddingTop={"16px"}>
        <Typography
          color="#222222"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "25px",
          }}
        >
          Publicaciones
        </Typography>
        <Typography
          color="#222222"
          sx={{
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: "25px",
          }}
        >
          Impulsando transformaciones
        </Typography>
      </Box>
      <Box
        sx={{
          pr: 2,
          pl: 2,
          pb: 5,
          pt: 5,
          padding: "15px",
          position: "relative",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "16px",
          mb: "16px",
        }}
      >
        <Button
          variant="contained"
          disableElevation
          sx={{
            width: "184px",
            backgroundColor: "#4E169D",
            color: "#fafafa",
            borderRadius: "100px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: "20px",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
          }}
          onClick={handleButtonClick}
        >
          Ir a Publicaciones
        </Button>
      </Box>
    </div>
  );
};

export default PublicationsLanding;
