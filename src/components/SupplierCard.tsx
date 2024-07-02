import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import example from "../../public/images/Card bienestar imagen 1.jpg";
import { useState } from "react";

export default function SupplierCard() {
  const [details, setDetails] = useState<boolean>(false);

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
  return (
    <Box sx={{ position: "relative" }}>
      {details && (
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
          padding: "8px",
          backgroundColor: `${details ? "#eaeaea" : "#fafafa"}`,
          borderRadius: `${details ? "16px" : "8px"}`,
          width: `${details ? "100%" : "152px"}`,
          // width: `${details ? "328px" : "152px"}`,
          // height: `${details ? "584px" : "248px"}`,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "visible",
          cursor: `${details ? "default" : "pointer"}`,
          marginBottom: "50px",
          zIndex: 2,
        }}
        onClick={() => {
          if (!details) {
            setDetails(true);
          }
        }}
      >
        <Box
          sx={{
            display: `${details ? "flex" : "block"}`,
            flexDirection: "column",
            alignItems: "flex-end",
            paddingBottom: `${details ? "16px" : "8px"}`,
          }}
        >
          {details && (
            <CardActions sx={{ padding: 0, margin: 0 }}>
              <Button
                sx={{
                  padding: 0,
                  margin: 0,
                  minWidth: "auto",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDetails(false);
                }}
              >
                <CloseIcon
                  sx={{
                    color: "#222222",
                    paddingBottom: "8px",
                  }}
                />
              </Button>
            </CardActions>
          )}
          <Box
            sx={{
              position: `${details ? "static" : "absolute"}`,
              top: "-5px",
              right: 0,
              width: "96px",
              height: "24px",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#fafafa",
              border: "1px solid #00a364",
              borderRadius: `${details ? "4px 4px 0px 0px" : "4px"}`,
              color: "#6433a8",
              padding: "2px 8px",
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
              height: `${details ? "128px" : "136px"}`,
              borderRadius: `${details ? "16px 0 16px 16px" : "8px"}`,
              objectFit: "cover",
            }}
          />
        </Box>
        <CardContent sx={{ padding: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: `${details ? "5px" : "32px"}`,
              // justifyContent: "space-between",
              // alignContent: "space-between",
              height: "88px",
              flexGrow: 1,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ fontSize: 16, margin: 0, padding: "2px 0" }}
              >
                {product.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: 13,
                  color: "#4e169d",
                  margin: 0,
                  padding: "2px 0",
                }}
              >
                {product.subcategory}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                // marginTop: "35px",
              }}
            >
              <RoomOutlinedIcon
                sx={{
                  color: "#4e169d",
                }}
              />
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ fontSize: 13 }}
              >
                {details
                  ? `${product.city},${product.province},${product.country}`
                  : product.city}
              </Typography>
            </Box>
          </Box>
          {details && (
            <Box>
              <Typography sx={{ fontSize: 16, textAlign: "center" }}>
                {product.description}
              </Typography>
              <Box sx={{ marginTop: "24px" }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Contactanos
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <WhatsAppIcon sx={{ color: "#4e169d", fontSize: "32px" }} />
                    <Typography component="span" sx={{ fontSize: "13px" }}>
                      Whatsapp
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <InstagramIcon
                      sx={{ color: "#4e169d", fontSize: "32px" }}
                    />
                    <Typography component="span" sx={{ fontSize: "13px" }}>
                      Instagram
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <FacebookRoundedIcon
                      sx={{ color: "#4e169d", fontSize: "32px" }}
                    />
                    <Typography component="span" sx={{ fontSize: "13px" }}>
                      Facebook
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <EmailOutlinedIcon
                      sx={{ color: "#4e169d", fontSize: "32px" }}
                    />
                    <Typography component="span" sx={{ fontSize: "13px" }}>
                      Mail
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
