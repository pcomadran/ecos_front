import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import example from "../../public/images/Card bienestar imagen 1.jpg";
import { useState } from "react";

export default function SupplierCard() {
  const [details, setDetails] = useState<boolean>(false);
  const location: string = "/proveedores";

  //Ingresar medios de contacto aca mediante onClick que tenga un handler con Link
  const contactsMethod = [
    { icon: WhatsAppIcon, label: "WhatsApp" },
    { icon: InstagramIcon, label: "Instagram" },
    { icon: FacebookRoundedIcon, label: "Facebook" },
    { icon: EmailOutlinedIcon, label: "Mail" },
  ];

  const product = {
    category: "Categoria",
    image: example,
    title: "Titulo",
    subcategory: "Subcategoria",
    description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Ciudad",
    province: "Provincia",
    country: "Pais",
  };

  const handleOpenDetail = () => {
    if (!details) {
      setDetails(true);
    }
  };

  const handleCloseDetail = () => {
    setDetails(!details);
  };

  return (
    <Box sx={{ position: "relative" }}>
      {details && location === "/" && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
      )}
      <Card
        sx={{
          position: "relative",
          height: `${
            location === "/" ? `${details ? "auto" : "244px"}` : "auto"
          }`,
          width: `${
            location === "/" ? `${details ? "100%" : "152px"}` : "100%"
          }`,
          padding: `${
            location === "/"
              ? `${details ? "0px 16px" : "8px 8px 0px"}`
              : "16px 16px 2px"
          }`,
          borderRadius: `${details ? "16px" : "8px"}`,
          overflow: "visible",
          boxSizing: "border-box",
          backgroundColor: `${
            location === "/" ? `${details ? "#eaeaea" : "#fafafa"}` : "#eaeaea"
          }`,
          zIndex: 2,
        }}
        onClick={handleOpenDetail}
      >
        <Grid container direction="column">
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            {details && location === "/" && (
              <CardActions>
                <Button
                  onClick={handleCloseDetail}
                  sx={{
                    padding: 0,
                    margin: 0,
                    minWidth: "auto",
                    cursor: "pointer",
                  }}
                >
                  <CloseIcon sx={{ color: "#222222" }} />
                </Button>
              </CardActions>
            )}
            <Box
              sx={{
                position:
                  location === "/"
                    ? details
                      ? "static"
                      : "absolute"
                    : "static",
                top: "-4px",
                right: 0,
                width: "96px",
                height: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fafafa",
                border: "1px solid #00a364",
                borderRadius:
                  location === "/"
                    ? details
                      ? "4px 4px 0px 0px"
                      : "4px"
                    : "4px 4px 0px 0px",
                color: "#6433a8",
                padding: "2px 8px",
                boxSizing: "border-box",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Typography
                variant="subtitle1"
                component="span"
                sx={{ fontSize: 13 }}
              >
                {product.category}
              </Typography>
            </Box>
            <CardMedia
              component="img"
              alt={product.title}
              image={product.image}
              sx={{
                width: "100%",
                height:
                  location === "/" ? (details ? "128px" : "136px") : "128px",
                borderRadius:
                  location === "/"
                    ? details
                      ? "16px 0 16px 16px"
                      : "8px"
                    : "16px 0 16px 16px",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid
            item
            sx={{
              marginTop: location === "/" ? (details ? 3 : 1) : 3,
              height: details ? "auto" : "90px",
            }}
          >
            <CardContent sx={{ padding: 0 }}>
              <Grid
                container
                spacing={location === "/" ? (details ? 1 : 1.5) : 0.5}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: 16,
                      fontWeight: "bold",
                      margin: 0,
                      padding: "2px 0",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: `${
                        location === "/"
                          ? `${details ? "#4e169d" : "#222222"}`
                          : "#4e169d"
                      }`,
                      margin: 0,
                      padding: "2px 0",
                    }}
                  >
                    {product.subcategory}
                  </Typography>
                </Grid>
                <Grid item xs={12} container alignItems="center" spacing={1}>
                  <Grid item>
                    <RoomOutlinedIcon sx={{ color: "#4e169d" }} />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      sx={{ fontSize: 13 }}
                    >
                      {location === "/"
                        ? details
                          ? `${product.city},${product.province},${product.country}`
                          : product.city
                        : `${product.city},${product.province},${product.country}`}
                    </Typography>
                  </Grid>
                </Grid>
                {details && (
                  <Grid item xs={12}>
                    <Typography
                      sx={{ marginTop: 3, fontSize: 16, textAlign: "center" }}
                    >
                      {product.description}
                    </Typography>
                    <Typography sx={{ marginTop: 3, fontWeight: "bold" }}>
                      Contáctanos
                    </Typography>
                    <Grid
                      container
                      spacing={1}
                      justifyContent="space-around"
                      sx={{ marginTop: 0 }}
                    >
                      {contactsMethod.map((contact, index) => (
                        <Grid
                          item
                          alignItems="center"
                          sx={{ display: "flex", flexDirection: "column" }}
                          key={index}
                        >
                          <contact.icon
                            sx={{ color: "#4e169d", fontSize: "32px" }}
                          />
                          <Typography
                            component="span"
                            sx={{ fontSize: "13px" }}
                          >
                            {contact.label}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Grid>
          {location === "/proveedores" && (
            <Grid item>
              <CardActions sx={{ padding: 0, margin: 0 }}>
                <Button
                  onClick={handleCloseDetail}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {details ? (
                    <ExpandLessIcon
                      sx={{ color: "#4e169d", fontSize: "36px" }}
                    />
                  ) : (
                    <ExpandMoreIcon
                      sx={{ color: "#4e169d", fontSize: "36px" }}
                    />
                  )}
                </Button>
              </CardActions>
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  );
}
