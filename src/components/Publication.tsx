import React from "react";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
  borderRadius = "16px", // Valor por defecto
  date,
  text,
}) => {
  const [showFullText, setShowFullText] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleToggleText = () => {
    setShowFullText((prevShowFullText) => !prevShowFullText);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const shortText = text.split(".")[0] + ".";
  const fullText = text.split("\n\n").join("\n\n");

  // Configura aquí las rutas donde se debe mostrar el botón
  const shouldShowMoreOptionsButton = ["/publicationsform"].includes(
    location.pathname
  );

  // Alineación del título según la ruta
  const titleAlignment = shouldShowMoreOptionsButton ? "left" : "center";

  return (
    <Card
      sx={{
        width: "328px",
        padding: "16px 0",
        gap: "16px",
        borderRadius,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "304px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
            textAlign: titleAlignment,
            flex: 1,
          }}
        >
          {title}
        </Typography>
        {shouldShowMoreOptionsButton && (
          <>
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: anchorEl ? "#4E169D" : "transparent", // Cambia color si está seleccionado
                color: anchorEl ? "#FFFFFF" : "inherit", // Cambia el color del ícono si está seleccionado
                "&:hover": {
                  backgroundColor: "#4E169D", // Asegura que mantenga el color en hover si está seleccionado
                },
              }}
              onClick={handleMenuClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{ minHeight: "auto", padding: "0px", borderRadius: "0px" }}
            >
              <MenuItem
                onClick={handleMenuClose}
                sx={{
                  width: "120px",
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "left",
                  padding: "0px 0px 0px 16px",
                  minHeight: "auto",
                  borderRadius: "0px",
                }}
              >
                Editar
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                sx={{
                  width: "120px",
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  textAlign: "left",
                  padding: "0px 0px 0px 16px",
                  minHeight: "auto",
                  borderRadius: "0px",
                }}
              >
                Ocultar
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
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
            cursor: "pointer", // Agrega el cursor de pointer para indicar que el texto es clicable
          }}
          onClick={handleToggleText} // Añade el onClick para alternar el texto
        >
          {showFullText ? fullText : shortText}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "20px",
            color: "#4E169D",
            textTransform: "none",
          }}
          onClick={handleToggleText}
        >
          {showFullText ? "Ver menos" : "Ver más"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Publication;
