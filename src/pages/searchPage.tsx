import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { getProductsByLetter } from "../servises/callsApi";
import SupplierCard from "../components/SupplierCard";
import { Product } from "../types/typeProduct";
import SearchBar from "../components/searchBar";

const SearchPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (term: string) => {
    setLoading(true); 
    try {
      const productsData = await getProductsByLetter(term);
      if (Array.isArray(productsData)) {
        setFilteredProducts(
          productsData.filter((product: Product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
          )
        );
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setFilteredProducts([]);
    } finally {
      setLoading(false); 
    }
  };
  // Manejo de cambios en la búsqueda
  useEffect(() => {
    if (searchTerm.trim()) {
      fetchProducts(searchTerm);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm]);

  // Inicializar el término de búsqueda desde la URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("query") || "";
    setSearchTerm(query);
  }, []);

  // Función para manejar el término de búsqueda en SearchBar
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Container sx={{ mt: "80px" }}>
      <SearchBar isSearchPage={true} onSearch={handleSearch} />

      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: 4,
          fontFamily: "Nunito",
          fontWeight: 700,
          fontSize: "24px",
          lineHeight: "30px",
          color: "#222222",
        }}
      >
        Resultados de tu búsqueda
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 15 }}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ mt: 3 }}
              >
                <SupplierCard product={product} />
              </Grid>
            ))
          ) : (
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", mt: 4 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  maxWidth: "600px",
                  backgroundColor: "#EAEAEA",
                  borderRadius: "8px",
                  padding: "24px",
                  mx: "auto",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <SearchOffOutlinedIcon
                    sx={{
                      width: "48px",
                      height: "48px",
                      color: "#4E169D",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      mb: 2,
                      fontFamily: "Nunito",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "20px",
                      color: "#4E169D",
                      textAlign: "center",
                    }}
                  >
                    No se encontraron resultados para tu búsqueda
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Nunito",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#222222",
                      textAlign: "center",
                    }}
                  >
                    Intentá nuevamente con otra consulta
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default SearchPage;
