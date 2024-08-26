import {
  Box,
  Typography,
  ListItem,
  Divider,
  List,
  TextField,
  MenuItem,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React, { useEffect, useState } from "react";
import { getDashboardAdmin } from "../servises/callsApi";

type Publication = {
  id: number;
  title: string;
  creationDate: string;
  view: number;
};

type Category = {
  label: string;
  view: number;
};

const DashboardPage: React.FC = () => {
  const [cantProducts, setCantProducts] = useState<number>(0);
  const [approved, setApproved] = useState<number>(0);
  const [review, setReview] = useState<number>(0);
  const [denied, setDenied] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [lastPublications, setLastPublications] = useState<Publication[]>([]);
  const [viewestPublications, setViewestPublications] = useState<Publication[]>(
    []
  );

  const [selectPublication, setSelectPublication] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const dashboardApi = await getDashboardAdmin();
      setCantProducts(dashboardApi["Nuevos productos creados"].Total);
      setApproved(dashboardApi["Nuevos productos creados"].Aceptado);
      setReview(dashboardApi["Nuevos productos creados"]["En revisión"]);
      setDenied(dashboardApi["Nuevos productos creados"].Denegado);

      const categoriesApi = Object.entries(
        dashboardApi["Proveedores por categoria"]
      ).map(([label, view]) => ({ label, view: view as number }));

      setCategories(categoriesApi);

      setLastPublications(dashboardApi["Publicaciones (5 últimas subidas)"]);
      setViewestPublications(dashboardApi["Publicaciones (5 más vistas)"]);
    }
    fetchData();
  }, []);

  const handlePublication = (event: any) => {
    console.log(event.target.value);
    if (event.target.value === 1) {
      setSelectPublication(false);
    } else setSelectPublication(true);
  };

  return (
    <Box sx={{ marginTop: "60px", padding: "0px 16px", textAlign: "center" }}>
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
          sx={{ color: "#FAFAFA", fontWeight: "700", fontSize: "17px" }}
        >
          Nuevos Productos/Servicios creados
        </Typography>
        <Typography
          sx={{ color: "#FAFAFA", fontWeight: "700", fontSize: "20px" }}
        >
          {cantProducts}
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
          />
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              color: "#222222",
              width: "100%",
            }}
          >
            {approved}
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
          />
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              color: "#222222",
              width: "100%",
            }}
          >
            {review}
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
          />
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              color: "#222222",
              width: "100%",
            }}
          >
            {denied}
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
          Productos/Servicios por categoría
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
              <Divider sx={{ width: "100%", background: "#222222" }} />
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
        <TextField
          sx={{ position: "relative", right: -85, marginBottom: "10px" }}
          label="Filtrar"
          select
          defaultValue={1}
          onChange={handlePublication}
        >
          <MenuItem value={1}>Mas vistos</MenuItem>
          <MenuItem value={2}>Ultimos subidos</MenuItem>
        </TextField>
        <List sx={{ width: "100%" }}>
          {(selectPublication ? lastPublications : viewestPublications).map(
            (publication) => (
              <ListItem
                key={publication.id}
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
                    {publication.creationDate}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <VisibilityOutlinedIcon sx={{ color: "#4E169D" }} />
                  <Typography
                    sx={{
                      color: "#4E169D",
                      fontWeight: "700",
                      fontSize: "18px",
                    }}
                  >
                    {publication.view}
                  </Typography>
                </Box>
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Box>
  );
};

export default DashboardPage;
