import { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BackgroundImage from "../../public/images/Imagen landing.png";
import CategoriesPage from "../pages/CategoriesPage";
import SupplierLanding from "../components/supplierLanding";
import PublicationsLanding from "../components/PublicationsLanding";
import SupplierCard from "../components/SupplierCard";
import { getProductsByLetter } from "../servises/callsApi";

const LandingPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchTerm) {
          const productsData = await getProductsByLetter(searchTerm);
          console.log("Products fetched:", productsData);
          if (Array.isArray(productsData)) {
            setProducts(productsData);
          } else {
            setProducts([]);
          }
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  useEffect(() => {
    console.log(
      "Filtering products:",
      products,
      "with search term:",
      searchTerm
    );
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  return (
    <div>
      <div
        style={{
          marginTop: "56px",
          position: "relative",
          width: "100%",
          height: "14%",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: "360 / 488",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(34, 34, 34, 0.7)",
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
            paddingTop: "24px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Buscar Proveedores"
            fullWidth
            style={{
              marginBottom: "16px",
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Container
              sx={{
                zIndex: 2,
                position: "relative",
                marginTop: 4,
                backgroundColor: "#fafafa", // Fondo blanco con opacidad
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra para contraste
              }}
            >
              <Typography variant="h5" gutterBottom>
                Resultados de tu búsqueda
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {filteredProducts.map((product, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <SupplierCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  textAlign: "left",
                }}
              >
                RED DE IMPACTO
              </Typography>
              <Typography
                maxWidth={"240px"}
                sx={{
                  pt: "5px",
                  fontSize: "24px",
                  fontWeight: 400,
                  lineHeight: "30px",
                  textAlign: "left",
                }}
              >
                Conectamos proveedores y personas comprometidas con el impacto y
                el consumo consciente
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Box
        sx={{
          mr: 2,
          ml: 2,
          mb: 8,
          mt: 3,
          padding: "7px",
          textAlign: "center",
          borderTop: "1px solid #4E169D",
          borderBottom: "1px solid #4E169D",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            maxWidth: "260px",
            height: "48px",
            fontSize: "22px",
            fontWeight: 700,
            lineHeight: "25px",
            textAlign: "center",
            color: "#4E169D",
            paddingLeft: "18px",
          }}
        >
          ¿Qué son las empresas de impacto?
        </Typography>
        <Typography
          variant="body1"
          style={{ fontWeight: 500, textAlign: "center", color: "#222222" }}
        >
          Son organizaciones con un compromiso fundamental con la generación de
          un impacto positivo en la sociedad y el medio ambiente como parte
          integral de su modelo de negocio.
        </Typography>
      </Box>
      <SupplierLanding />
      <CategoriesPage />
      <PublicationsLanding />
    </div>
  );
};

export default LandingPage;
