import { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import SupplierCard from "../components/SupplierCard";
import { getAllProducts } from "../services/callsApi";
import LocationDialog from "../components/LocationDialog";
import axios from "axios";
import { Supplier } from "../types/typesSupplier";

export default function SupplierLanding() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      setCoordinates(JSON.parse(storedLocation));
      fetchNearbyProducts(
        JSON.parse(storedLocation).lat,
        JSON.parse(storedLocation).lon
      );
    } else {
      setDialogOpen(true);
    }
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const products = await getAllProducts();
      setSuppliers(products.slice(0, 4));
    } catch (error) {
      console.error("Error fetching all products:", error);
      setError("Error fetching products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyProducts = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/distance/calculate",
        {
          params: {
            lat: latitude,
            lon: longitude,
          },
        }
      );
      const products = response.data;
      setSuppliers(products.slice(0, 4));
    } catch (error) {
      console.error("Error al obtener productos cercanos:", error);
      setError("Error fetching nearby products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!coordinates) {
      fetchAllProducts();
    }
  }, [coordinates]);

  const handleLocationDialogClose = () => {
    setDialogOpen(false);
    fetchAllProducts();
  };

  const handleLocationDialogAccept = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lon: longitude };
          setCoordinates(location);
          localStorage.setItem("location", JSON.stringify(location));
          setDialogOpen(false);
          fetchNearbyProducts(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          fetchAllProducts();
          setDialogOpen(false);
        }
      );
    } else {
      alert("Geolocalización no es compatible con este navegador.");
      fetchAllProducts();
      setDialogOpen(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          mt: -5,
          marginBottom: "15px",
          paddingLeft: "15px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
          Recomendaciones para vos
        </Typography>
        <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
          Proveedores ECO
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            padding: "20px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <CircularProgress sx={{ color: "#00a364" }} size={60} />
          <Typography
            sx={{ marginTop: "20px", fontSize: "18px", color: "#00a364" }}
          >
            Cargando proveedores...
          </Typography>
        </Box>
      ) : error ? (
        <Typography
          sx={{ textAlign: "center", fontSize: "18px", color: "red" }}
        >
          {error}
        </Typography>
      ) : (
        <Grid
          container
          rowSpacing={4}
          justifyContent="space-between"
          sx={{
            padding: "10px 15px",
            position: "relative",
            background: "#00a364",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              background: "#ffffff",
              clipPath: 'path("M -5,0 C 0,0 100,250 400,190 L 1000,-1000")',
              zIndex: 0,
            },
          }}
        >
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <Grid item key={supplier.id}>
                <SupplierCard product={supplier} />
              </Grid>
            ))
          ) : (
            <Typography sx={{ color: "#fff" }}>
              No hay proveedores disponibles.
            </Typography>
          )}
        </Grid>
      )}

      <LocationDialog
        open={dialogOpen}
        onClose={handleLocationDialogClose}
        onAccept={handleLocationDialogAccept}
      />
    </Box>
  );
}
