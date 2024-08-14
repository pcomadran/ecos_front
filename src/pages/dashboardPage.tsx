import {
  Box,
  Button,
  Typography,
  ListItem,
  Divider,
  List,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React from "react";

const categories = [
  { label: "Bienestar", view: 10 },
  { label: "Capacitaciones", view: 10 },
  { label: "Construcción", view: 10 },
  { label: "Cultivos", view: 10 },
  { label: "Gastronomía", view: 5 },
  { label: "Indumentaria", view: 5 },
  { label: "Merchandising", view: 5 },
  { label: "Muebles/Deco", view: 5 },
  { label: "Reciclaje", view: 20 },
  { label: "Tecnología", view: 10 },
  { label: "Transporte", view: 10 },
];

const publications = [
  { title: "¿Qué es el Upcycling?", date: "17/04/2023", view: 50 },
  { title: "¿Qué es el Upcycling?", date: "17/04/2023", view: 50 },
  { title: "¿Qué es el Upcycling?", date: "17/04/2023", view: 50 },
  { title: "¿Qué es el Upcycling?", date: "17/04/2023", view: 50 },
  { title: "¿Qué es el Upcycling?", date: "17/04/2023", view: 50 },
];

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ marginTop: "60px", padding: "0px 16px", textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{
            width: "106px",
            height: "40px",
            background: "#D2D2D2",
            color: "#222222",
            textTransform: "none",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Cerrar Sesión
        </Button>
      </Box>
      <Typography sx={{ fontSize: "28px", fontWeight: "500" }}>
        Dashboard Administrador
      </Typography>
      <Typography
        sx={{ fontSize: "22px", fontWeight: "600", margin: "20px 0" }}
      >
        Estadísticas mensuales
      </Typography>
      <Box
        sx={{
          background: "#4E169D",
          width: "328px",
          height: "48px",
          borderRadius: "8px",
          padding: "12px",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography
          sx={{ color: "#FAFAFA", fontWeight: "700", fontSize: "20px" }}
        >
          Nuevos Perfiles creados
        </Typography>
        <Typography
          sx={{ color: "#FAFAFA", fontWeight: "700", fontSize: "22px" }}
        >
          100
        </Typography>
      </Box>
      <List
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "25px",
        }}
      >
        <ListItem
          sx={{
            width: "104px",
            height: "72px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: "solid 2px #1D9129",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <Typography
            sx={{ fontWeight: "500", fontSize: "18px", color: "#222222" }}
          >
            Aprobados
          </Typography>
          <Divider
            sx={{
              width: "55%",
              background: "#1D9129",
            }}
            component="li"
          />
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              color: "#222222",
              width: "100%",
            }}
          >
            80
          </Typography>
        </ListItem>
        <ListItem
          sx={{
            width: "104px",
            height: "72px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: "solid 2px #B86B11",
            borderRadius: "10px",
            padding: "5px 1px 0 5px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "18px",
              color: "#222222",
              width: "100%",
            }}
          >
            En Revisión
          </Typography>
          <Divider
            sx={{
              width: "55%",
              background: "#B86B11",
            }}
            component="li"
          />
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              color: "#222222",
              width: "100%",
            }}
          >
            10
          </Typography>
        </ListItem>
        <ListItem
          sx={{
            width: "104px",
            height: "72px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: "solid 2px #BC1111",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <Typography
            sx={{ fontWeight: "500", fontSize: "18px", color: "#222222" }}
          >
            Denegados
          </Typography>
          <Divider
            sx={{
              width: "55%",
              background: "#BC1111",
            }}
            component="li"
          />
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              color: "#222222",
              width: "100%",
            }}
          >
            10
          </Typography>
        </ListItem>
      </List>
      <Box
        sx={{
          background: "#EAEAEA",
          borderRadius: "10px",
          marginBottom: "50px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "20px",
            color: "#4E169D",
            padding: "12px 0 5px",
          }}
        >
          Proveedores por categoría
        </Typography>
        <Divider sx={{ background: "#4E169D", height: "2px" }} />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {categories.map((category, index) => (
            <ListItem
              key={index}
              sx={{
                width: "85%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
                  {category.label}
                </Typography>
                <Typography sx={{ fontWeight: "700", fontSize: "18px" }}>
                  {category.view}
                </Typography>
              </Box>
              <Divider sx={{ width: "100%", background: "#222222" }}></Divider>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Typography
          sx={{ fontWeight: "700", fontSize: "20px", marginBottom: "10px" }}
        >
          Visualizaciones por Publicación
        </Typography>
        <List sx={{ width: "100%" }}>
          {publications.map((publication) => (
            <ListItem
              sx={{
                width: "100%",
                border: "solid 1px #4E169D",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-around",
                marginBottom: "15px",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontWeight: "600", fontSize: "18px" }}>
                  {publication.title}
                </Typography>
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  {publication.date}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <VisibilityOutlinedIcon sx={{ color: "#4E169D" }} />
                <Typography
                  sx={{ color: "#4E169D", fontWeight: "700", fontSize: "18px" }}
                >
                  {publication.view}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DashboardPage;
