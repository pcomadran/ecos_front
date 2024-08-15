import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  SxProps,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  VisibilityOffOutlined as VisibilityOffOutlinedIcon,
} from "@mui/icons-material";
import Carrusel from "./Carrusel";

interface PublicationProps {
  title: string;
  imageUrls: string[];
  borderRadius?: number | string;
  date: string;
  text: string;
  viewCount?: number;
  deleted?: boolean;
}

const Publication: React.FC<PublicationProps> = ({
  title,
  imageUrls,
  borderRadius = "16px",
  date,
  text,
  viewCount,
  deleted,
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  // Condiciones para las rutas
  const isDashboardRoute = location.pathname === "/dashboard";
  const shouldShowMoreOptionsButton = ["/publications/menu"].includes(
    location.pathname
  );
  const titleAlignment = shouldShowMoreOptionsButton ? "left" : "center";

  // Estilo condicional del borde y contenido según la ruta
  const cardStyle: SxProps = {
    border: isDashboardRoute ? "1px solid #4E169D" : undefined,
    borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
    width: "328px",
    padding: "16px 0",
    gap: "16px",
    position: "relative",
  };

  return (
    <Card sx={cardStyle}>
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
                backgroundColor: anchorEl ? "#4E169D" : "transparent",
                color: anchorEl ? "#FFFFFF" : "inherit",
                "&:hover": {
                  backgroundColor: "#4E169D",
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

      {isDashboardRoute ? (
        <>
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
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", paddingRight: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#4E169D",
              }}
            >
              {deleted ? (
                <VisibilityOffOutlinedIcon sx={{ width: "24px", height: "24px" }} />
              ) : (
                <VisibilityOutlinedIcon sx={{ width: "24px", height: "24px" }} />
              )}
              <Typography
                sx={{
                  marginLeft: "4px",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                {viewCount}
              </Typography>
            </div>
          </CardActions>
        </>
      ) : (
        <>
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
                cursor: "pointer",
              }}
              onClick={handleToggleText}
            >
              {showFullText ? fullText : shortText}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center", position: "relative" }}>
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
            {shouldShowMoreOptionsButton && (
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  display: "flex",
                  alignItems: "center",
                  color: "#4E169D",
                }}
              >
                {deleted ? (
                  <VisibilityOffOutlinedIcon sx={{ width: "24px", height: "24px" }} />
                ) : (
                  <VisibilityOutlinedIcon sx={{ width: "24px", height: "24px" }} />
                )}
                <Typography
                  sx={{
                    marginLeft: "4px",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  {viewCount}
                </Typography>
              </div>
            )}
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default Publication;
