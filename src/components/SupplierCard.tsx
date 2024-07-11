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
import image1 from "/public/images/Card bienestar imagen 1.jpg";
import image2 from "/public/images/Card bienestar imagen 2.jpg";
import image3 from "/images/Card bienestar imagen 3.jpg";
import { useState } from "react";
import Carrusel from "./Carrusel";
import { useLocation } from "react-router-dom";

export default function SupplierCard({ product }) {
  const [details, setDetails] = useState<boolean>(false);
  const location: string = useLocation().pathname;

  //Ingresar medios de contacto aca mediante onClick que tenga un handler con Link
  const contactsMethod = [
    { icon: WhatsAppIcon, label: "WhatsApp" },
    { icon: InstagramIcon, label: "Instagram" },
    { icon: FacebookRoundedIcon, label: "Facebook" },
    { icon: EmailOutlinedIcon, label: "Mail" },
  ];

  //Creado para pruebas, despues entrara mediante props
  // const product = {
  //   category: "Categoria",
  //   image: [image1, image2, image3],
  //   name: "Titulo",
  //   subcategory: "Subcategoria",
  //   description:
  //     "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
  //   city: "Ciudad",
  //   province: "Provincia",
  //   country: "Pais",
  // };

  const handleDetailLP = () => {
    if (location === "/")
      if (!details) {
        setDetails(true);
      }
  };

  const handleCloseDetail = () => {
    setDetails(!details);
  };

  return (
    <Box
      sx={{
        position:
          location === "/" ? (details ? "absolute" : "relative") : "relative",
        top: location === "/" ? (details ? "0" : "auto") : "auto",
        left: location === "/" ? (details ? "0" : "auto") : "auto",
        width: "100%",
        margin: details ? "0 auto" : "0",
        zIndex: details ? 2 : 0,
      }}
    >
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
              : "16px 0px 2px"
          }`,
          margin: `${location === "/" ? `${details ? "0 auto" : "0"}` : "0"}`,
          borderRadius: `${
            location === "/" ? `${details ? "16px" : "8px"}` : "16px"
          }`,
          overflow: "visible",
          boxSizing: "border-box",
          backgroundColor: `${
            location === "/" ? `${details ? "#eaeaea" : "#fafafa"}` : "#eaeaea"
          }`,
          zIndex: 2,
          cursor: `${
            location === "/" ? (details ? "default" : "pointer") : "default"
          }`,
        }}
        onClick={handleDetailLP}
      >
        <Grid container direction="column">
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              width: "101%",
            }}
          >
            {details && location === "/" && (
              <CardActions sx={{ padding: "7px 0" }}>
                <Button
                  onClick={handleCloseDetail}
                  sx={{
                    padding: 0,
                    margin: 0,
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
                marginRight: location === "/" ? 0 : 2,
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
            {location === "/" ? (
              <CardMedia
                component="img"
                alt={product.name}
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
            ) : (
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Carrusel
                  imageUrls={product.image}
                  borderRadius={"16px 0 16px 16px"}
                />
              </Box>
            )}
          </Grid>
          <Grid
            item
            sx={{
              marginTop: location === "/" ? (details ? 3 : 1) : 1,
              height: details ? "auto" : "90px",
            }}
          >
            <CardContent sx={{ padding: location === "/" ? 0 : "0px 16px" }}>
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
                      textAlign: "start",
                    }}
                  >
                    {product.name}
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
                <Grid item xs={12} container spacing={0.5}>
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
                      sx={{ marginTop: 2, fontSize: 16, textAlign: "center" }}
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
