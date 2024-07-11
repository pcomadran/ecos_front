import { Grid } from "@mui/material";
import image1 from "/images/Card bienestar imagen 1.jpg";
import image2 from "/images/Miniatura gastronomía.png";
import image3 from "/images/Miniatura cultivo.png";
import image4 from "/images/Miniatura indumentaria.png";
import SupplierCard from "../components/SupplierCard";

const suppliers = [
  {
    category: "Bienestar",
    image: image1,
    name: "Lavanda",
    subcategory: "Cosmética Natural",
    description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
  {
    category: "Gastronomía",
    image: image2,
    name: "Avocado",
    subcategory: "Cocina natural",
    description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
  {
    category: "Cultivos",
    image: image3,
    name: "Tomato",
    subcategory: "Huertas y compost",
    description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
  {
    category: "Indumentaria",
    image: image4,
    name: "Velka",
    subcategory: "Upcyling",
    description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
];

export default function SupplierLanding() {
  return (
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
          background: "#fafafa",
          clipPath: 'path("M -5,0 C 0,0 100,250 400,190 L 400,0 Z")',
          zIndex: 0,
        },
      }}
    >
      {suppliers.map((supplier, index) => (
        <Grid item key={index}>
          <SupplierCard product={supplier} />
        </Grid>
      ))}
    </Grid>
  );
}
