import { Box, Grid, Typography } from "@mui/material";
import image1 from "/images/Card bienestar imagen 1.jpg";
import image2 from "/images/Miniatura gastronomía.png";
import image3 from "/images/Miniatura cultivo.png";
import image4 from "/images/Miniatura indumentaria.png";
import SupplierCard from "../components/SupplierCard";
import { Supplier } from "../types/typesSupplier";

const products: Supplier[] = [
  {
    category: "Bienestar",
    imageURLs: [image1],
    name: "Lavanda",
    short_description: "Cosmética Natural",
    large_description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
  {
    category: "Gastronomía",
    imageURLs: [image2],
    name: "Avocado",
    short_description: "Cocina natural",
    large_description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
  {
    category: "Cultivos",
    imageURLs: [image3],
    name: "Tomato",
    short_description: "Huertas y compost",
    large_description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
  {
    category: "Indumentaria",
    imageURLs: [image4],
    name: "Velka",
    short_description: "Upcyling",
    large_description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
];

interface SupplierLandingProps {
  suppliers?: Supplier[];
}

export default function SupplierLanding({
  suppliers = products,
}: SupplierLandingProps) {
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
        {suppliers.slice(0, 4).map((supplier, index) => (
          <Grid item key={index}>
            <SupplierCard product={supplier} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
