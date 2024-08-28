import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { Supplier } from "../types/typesSupplier";
import ProductForm from "../components/ProductForm";

function SupAdminPage() {
  const [value, setValue] = useState(0);
  const [proveedores, setProveedores] = useState<Supplier[]>([]);
  const [selectedProveedor, setSelectedProveedor] = useState<Supplier | null>(null);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSelectedProveedor(null); // Resetea la selección al cambiar de tab
  };

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products/all");
        console.log("Datos de la API:", response.data);
        setProveedores(response.data);
      } catch (error) {
        console.error("Error al obtener los proveedores:", error);
      }
    };

    fetchProveedores();
  }, [value]); // Se ejecuta cada vez que cambia el tab

  const handleProveedorSelect = (proveedor: Supplier) => {
    setSelectedProveedor(proveedor);
  };

  const handleBackToList = () => {
    setSelectedProveedor(null); // Vuelve a mostrar la lista de proveedores
  };

  // Filtramos los proveedores según la pestaña seleccionada
  const filteredProveedores = proveedores.filter((proveedor) => {
    if (value === 0) return proveedor.status === "REVISION_INICIAL"; // Nuevos Perfiles
    if (value === 1) return proveedor.status === "ACEPTADO"; // Aprobados
    if (value === 2) return proveedor.status === "REQUIERE_CAMBIOS" || proveedor.status === "CAMBIOS_REALIZADOS"; // En Revisión
    if (value === 3) return proveedor.status === "DENEGADO"; // Denegados
    return false;
  });

  return (
    <Container sx={{ width: "100%", paddingTop: "100px" }}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            fontSize: "28px",
            fontWeight: 600,
            lineHeight: "35px",
            textAlign: "center",
            paddingBottom: "8px",
          }}
        >
          Proveedores
        </Typography>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "#4E169D",
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
                height: "3px",
                width: "108px",
              },
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ width: "100%" }}
          >
            <Tab
              label="Nuevos Perfiles"
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
      </Box>

      {/* Contenido TABS */}
      {!selectedProveedor ? (
        <Box sx={{ width: "100%" }}>
          {filteredProveedores.map((proveedor) => (
            <Card
              key={proveedor.id}
              sx={{
                mb: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 8px 8px 16px",
                borderRadius: "8px",
                boxShadow: "none",
                backgroundColor: "#EAEAEA",
                width: "100%",
                maxWidth: "328px",
                margin: "0 auto",
                height: "72px",
                mt: "16px",
              }}
              onClick={() => handleProveedorSelect(proveedor)}
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
                    {proveedor.name}
                  </Typography>
                  <Divider
                    sx={{
                      my: "3px",
                      backgroundColor: "#00A364",
                      height: "1px",
                      width: "200px",
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
                    {proveedor.category?.name || "Categoría no disponible"}
                  </Typography>
                </Box>
                <ArrowForwardIosIcon
                  sx={{ color: "#222222", width: "12px" }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <ProductForm
          selectedProveedor={selectedProveedor}
          onBack={handleBackToList}
        />
      )}
    </Container>
  );
}

export default SupAdminPage;
