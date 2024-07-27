import { Box, Grid, Typography } from "@mui/material";
import SupplierCard from "../components/SupplierCard";
import { Supplier } from "../types/typesSupplier";
import { useEffect, useState } from "react";
import { getAllProducts } from "../servises/callsApi";

export default function SupplierLanding() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    async function fetchData() {
      const suppliersApi = await getAllProducts();
      setSuppliers(suppliersApi);
    }

    fetchData();
  }, []);

  return (
    <Box>
      <Box
        sx={{
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
        {suppliers.slice(0, 4).map((supplier) => (
          <Grid item key={supplier.id}>
            <SupplierCard product={supplier} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
