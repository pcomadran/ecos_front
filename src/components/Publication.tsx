import React from "react";
import Button from "@mui/material/Button";
import Carrusel from "./Carrusel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface PublicationProps {
  title: string;
  imageUrls: string[];
  borderRadius?: number | string;
  date: string;
  text: string;
}

const Publication: React.FC<PublicationProps> = ({
  title,
  imageUrls,
  borderRadius,
  date,
  text,
}) => {
  const [showFullText, setShowFullText] = React.useState(false);

  const handleToggleText = () => {
    setShowFullText((prevShowFullText) => !prevShowFullText);
  };

  const shortText = text.split(".")[0] + ".";
  const fullText = text.split("\n\n").join("\n\n");

  return (
    <Card
      sx={{
        width: "328px",
        height: "Hug(400px)",
        padding: "16px 0",
        gap: "16px",
        borderRadius: "16px",
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "25px",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
      <Carrusel imageUrls={imageUrls} borderRadius={borderRadius} />
      <CardContent>
        <Typography
          color="#222222"
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "20px",
          }}
        >
          {date}
        </Typography>
        <Typography
          color="#222222"
          sx={{
            width: "304px",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "20px",
            whiteSpace: "pre-line",
          }}
        >
          {showFullText ? fullText : shortText}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          sx={{ color: "#4E169D" }}
          onClick={handleToggleText}
        >
          {showFullText ? "Ver menos" : "Ver más"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Publication;
