import React from "react";
import WorkinProgress from "../components/WorkinProgress";
import {
  Box,
  Tab,
  Tabs,
  Card,
  CardContent,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function SupAdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Simulación de BD
  const proveedores = [
    { nombre: "Lavanda", categoria: "Cosmética natural" },
    { nombre: "Menta", categoria: "Aromaterapia" },
    { nombre: "Rosas", categoria: "Perfumería" },
    { nombre: "Jazmín", categoria: "Cosmética natural" },
  ];

  return (
    <Container sx={{ width: "100%", paddingTop: "100px" }}>
      <Typography
        sx={{
          width: "100%",
          fontSize: "28px",
          fontWeight: 600,
          lineHeight: "35px",
          textAlign: "center",
        }}
      >
        Proveedores
      </Typography>
      <Box sx={{ width: "100%", paddingTop: "16px" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "#4E169D",
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1000,
            width: "100%",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="states of profiles"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#4E169D",
                height: "3px", // Ajusta la altura del selector
                width: "108px", // Ajusta el ancho del selector
              },
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ width: "100%" }}
          >
            <Tab
              label="Nuevos Perfiles"
              {...a11yProps(0)}
              sx={{
                fontWeight: value === 0 ? "700" : "500",
                fontSize: "16px",
                color: "#222222",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#222222",
                },
              }}
            />
            <Tab
              label="Aprobados"
              {...a11yProps(1)}
              sx={{
                fontWeight: value === 1 ? "700" : "500",
                fontSize: "16px",
                color: "#222222",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#222222",
                },
              }}
            />
            <Tab
              label="En revisión"
              {...a11yProps(2)}
              sx={{
                fontWeight: value === 2 ? "700" : "500",
                fontSize: "16px",
                color: "#222222",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#222222",
                },
              }}
            />
            <Tab
              label="Denegados"
              {...a11yProps(3)}
              sx={{
                fontWeight: value === 3 ? "700" : "500",
                fontSize: "16px",
                color: "#222222",
                textTransform: "none",
                "&.Mui-selected": {
                  color: "#222222",
                },
              }}
            />
          </Tabs>
        </Box>

        {/* Contenido TABS */}

        <CustomTabPanel value={value} index={0}>
          <Box sx={{ width: "100%" }}>
            {proveedores.map((proveedor, index) => (
              <Card
                key={index}
                sx={{
                  mb: "16px", // Usar margen inferior explícito en lugar de mb: 2
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 8px 8px 16px",
                  borderRadius: "8px",
                  boxShadow: "none",
                  backgroundColor: "#EAEAEA",
                  width: "100%", // Ocupa todo el ancho disponible
                  maxWidth: "328px", // Mantiene el ancho máximo de la card
                  margin: "0 auto", // Centra la card horizontalmente
                  height: "72px",
                  // Si sigue sin funcionar, intenta añadir un margen superior también
                  mt: "16px",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#4E169D",
                        fontWeight: 700,
                        fontSize: "18px",
                        lineHeight: "24px",
                      }}
                    >
                      {proveedor.nombre}
                    </Typography>
                    <Divider
                      sx={{
                        my: "3px",
                        backgroundColor: "#00A364",
                        height: "1px",
                        width: "200px", // Ajusta el ancho de la línea divisoria
                      }}
                    />
                    <Typography
                      sx={{
                        color: "#222222",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                    >
                      {proveedor.categoria}
                    </Typography>
                  </Box>
                  <ArrowForwardIosIcon
                    sx={{ color: "#222222", width: "12px" }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <WorkinProgress />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <WorkinProgress />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <WorkinProgress />
        </CustomTabPanel>
      </Box>
    </Container>
  );
}

export default SupAdminPage;
