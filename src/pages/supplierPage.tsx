import {
  Box,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BackgroundImage from "/images/Imagen proveedores.png";
import Bienestar from "/images/BIENESTAR.png";
import Capacitaciones from "/images/CAPACITACION.png";
import Construccion from "/images/CONSTRUCCION.png";
import Cultivos from "/images/CULTIVOS.png";
import Gastronomia from "/images/GASTRONOMIA.png";
import Indumentaria from "/images/INDUMENTARIA.png";
import Merchandising from "/images/MERCHAN.png";
import Muebles from "/images/MUEBLES.png";
import Reciclaje from "/images/RECICLAJE.png";
import Tecnologia from "/images/TECNOLOGIA.png";
import Transporte from "/images/TRANSPORTE.png";
import image1 from "/images/Card bienestar imagen 1.jpg";
import image2 from "/images/Card bienestar imagen 2.jpg";
import image3 from "/images/Card bienestar imagen 3.jpg";
import { useState } from "react";
import SupplierCard from "../components/SupplierCard";
import { Supplier } from "../types/typesSupplier";

const categories = [
  { icon: Bienestar, label: "Bienestar" },
  { icon: Capacitaciones, label: "Capacitaciones" },
  { icon: Construccion, label: "Construcción" },
  { icon: Cultivos, label: "Cultivos" },
  { icon: Gastronomia, label: "Gastronomía" },
  { icon: Indumentaria, label: "Indumentaria" },
  { icon: Merchandising, label: "Merchandising" },
  { icon: Muebles, label: "Muebles/Deco" },
  { icon: Reciclaje, label: "Reciclaje" },
  { icon: Tecnologia, label: "Tecnología" },
  { icon: Transporte, label: "Transporte" },
];

const suppliers: Supplier[] = [
  {
    category: "Bienestar",
    imageUrls: [image1, image2, image3],
    name: "Lavanda",
    short_description: "Cosmética Natural",
    large_description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
  {
    category: "Bienestar",
    imageUrls: [image1, image2, image3],
    name: "Lavanda",
    short_description: "Cosmética Natural",
    large_description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
  {
    category: "Bienestar",
    imageUrls: [image1, image2, image3],
    name: "Lavanda",
    short_description: "Cosmética Natural",
    large_description:
      "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
    city: "Godoy Cruz",
    province: "Mendoza",
    country: "Argentina",
  },
];

export default function SupplierPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(true);

  const handleCategory = (category: string) => {
    setSelectedCategory(category);
    setFilteredSuppliers(
      suppliers.filter((supplier) => supplier.category === category)
    );
    setShowCategories(false);
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          minHeight: "488px",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <Container
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            paddingTop: "80px",
          }}
        >
          {/* Campo de búsqueda */}
          <TextField
            variant="outlined"
            placeholder="Buscar Proveedores"
            fullWidth
            style={{
              marginBottom: "20px",
              backgroundColor: "#fafafa",
              borderRadius: "50px",
              maxWidth: "500px",
              height: "60px",
              zIndex: 1,
            }}
            InputProps={{
              style: {
                padding: "2px 20px",
                borderRadius: "50px",
                border: "none",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Grid container textAlign="start">
            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                PROVEEDORES
              </Typography>
              <Typography sx={{ fontSize: "28px", fontWeight: "500" }}>
                Directorio ECO
              </Typography>
              <Typography
                variant="h5"
                align="left"
                textAlign="start"
                sx={{ width: "80%" }}
              >
                Descubrí a quienes comparten tu pasión por el impacto positivo y
                la sostenibilidad
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Box
        sx={{
          padding: "40px 16px 16px",
          background: showCategories ? "#00a364" : "#fafafa",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: showCategories ? 0 : 140,
            right: 0,
            width: "100%",
            height: "50%",
            background: showCategories ? "#fafafa" : "#00a364",
            clipPath: showCategories
              ? 'path("M -5,0 C 0,0 100,250 400,190 L 400,0 Z")'
              : 'path("M361 183C189.669 191.629 104.632 167.382 0 0V550H361V183Z")',
            zIndex: 0,
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "16px",
            fontWeight: "bold",
            position: "relative",
            zIndex: 1,
          }}
        >
          Categorías
        </Typography>
        {showCategories ? (
          <Grid
            container
            direction="column"
            sx={{ zIndex: 1, position: "relative" }}
          >
            {categories.map((category, index) => (
              <Grid
                item
                key={index}
                alignItems="center"
                sx={{
                  display: "flex",
                  gap: "10px",
                  height: "72px",
                  borderRadius: "16px",
                  backgroundColor: "#FAFAFA",
                  marginBottom: 2,
                  padding: "0 0 0 22%",
                  cursor: "pointer",
                }}
                onClick={() => handleCategory(category.label)}
              >
                <Box
                  sx={{
                    height: 56,
                    width: 56,
                    border: "1px solid",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                    src={category.icon}
                    alt={`${category.label} Image`}
                  />
                </Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  {category.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            <Box
              sx={{
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                marginTop: "25px",
              }}
            >
              <Typography
                sx={{ color: "#6433a8", fontSize: "20px", fontWeight: "600" }}
              >
                {selectedCategory}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  marginTop: "10px",
                  marginBottom: "40px",
                }}
              >
                Encontrá desde productos cosméticos y de cuidado personal
                natural, servicios de salud, hasta terapias holísticas y más.
              </Typography>
            </Box>
            <Grid container spacing={2} justifyContent="center">
              {filteredSuppliers.map((supplier, index) => (
                <Grid item key={index}>
                  <SupplierCard product={supplier} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </div>
  );
}
