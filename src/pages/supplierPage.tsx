import { Box, Container, Grid, Typography } from "@mui/material";
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
import { useEffect, useState } from "react";
import SupplierCard from "../components/SupplierCard";
import { Category, Supplier } from "../types/typesSupplier";
import { getAllCategories, getAllProducts } from "../servises/callsApi";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/searchBar";

export default function SupplierPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, icon: Bienestar, name: "" },
    { id: 2, icon: Capacitaciones, name: "" },
    { id: 3, icon: Construccion, name: "" },
    { id: 4, icon: Cultivos, name: "" },
    { id: 5, icon: Gastronomia, name: "" },
    { id: 6, icon: Indumentaria, name: "" },
    { id: 7, icon: Merchandising, name: "" },
    { id: 8, icon: Muebles, name: "" },
    { id: 9, icon: Reciclaje, name: "" },
    { id: 10, icon: Tecnologia, name: "" },
    { id: 11, icon: Transporte, name: "" },
  ]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoria");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const categoriesApi = await getAllCategories();
      const suppliersApi = await getAllProducts();
      const updatedCategories = categories.map((category) => {
        const apiCategory = categoriesApi.find(
          (cat: Category) => cat.id === category.id
        );
        if (apiCategory) {
          return { ...category, name: apiCategory.name };
        }
        return category;
      });
      setCategories(updatedCategories);
      setSuppliers(suppliersApi);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (categoryId && categories.length > 0 && suppliers.length > 0) {
      const category = categories.find(
        (cat) => cat.id === parseInt(categoryId)
      );
      if (category) {
        setSelectedCategory(category);
        setFilteredSuppliers(
          suppliers.filter((supplier) => supplier.category?.id === category.id)
        );
        setShowCategories(false);
      }
    } else {
      setSelectedCategory(null);
      setFilteredSuppliers([]);
      setShowCategories(true);
    }
  }, [categoryId, categories, suppliers]);

  const handleCategory = (category: Category) => {
    navigate(`/proveedores?categoria=${category.id}`);
    setSelectedCategory(category);
    setFilteredSuppliers(
      suppliers.filter((supplier) => supplier.category?.id === category.id)
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
          <SearchBar />
          <Grid container textAlign="start">
            <Grid item xs={12} sm={12} sx={{ mt: 13 }}>
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
            {categories?.map((category) => (
              <Grid
                item
                key={category.id}
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
                onClick={() => handleCategory(category)}
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
                    alt={`${category.name} Image`}
                  />
                </Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  {category.name}
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
                {selectedCategory?.name}
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
              {filteredSuppliers?.map((supplier) => (
                <Grid item key={supplier.id}>
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
