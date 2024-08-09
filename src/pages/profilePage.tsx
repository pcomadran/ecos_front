import { Box, Button, Typography } from "@mui/material";
import { status, Supplier } from "../types/typesSupplier";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import SupplierCard from "../components/SupplierCard";
import { useEffect, useState } from "react";
import { getProductsBySupplier } from "../servises/callsApi";

const renderProductStatus = (product: Supplier) => {
  switch (product.status) {
    case status.CAMBIOS_REALIZADOS:
    case status.REVISION_INICIAL:
      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CircleIcon
              sx={{ color: "#505050", width: "20px", height: "20px" }}
            />
            <Typography variant="subtitle1">Postulado</Typography>
          </Box>
          <Typography
            sx={{
              color: "#4E169D",
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "20px",
            }}
          >
            ¡Gracias por querer formar parte de EcoSistema!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ lineHeight: "20px", fontWeight: "700" }}
          >
            La postulación de tu Producto/Servicio fue enviada correctamente.
          </Typography>
          <Typography>Pronto tendrás más novedades.</Typography>
        </>
      );
    case status.ACEPTADO:
      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CircleIcon
              sx={{ color: "#1D9129", width: "20px", height: "20px" }}
            />
            <Typography>Aprobado</Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#4E169D",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "20px",
              }}
            >
              ¡Felicitaciones!
            </Typography>
            <Typography
              sx={{
                color: "#4E169D",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "20px",
              }}
            >
              Sos parte de EcoSistema
            </Typography>
          </Box>
          <Typography
            sx={{ fontSize: "16px", fontWeight: "600", lineHeight: "20px" }}
          >
            Tu Producto/Servicios está incluído dentro de nuestra Red de
            Impacto.
          </Typography>
        </>
      );
    case status.DENEGADO:
      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CircleIcon
              sx={{ color: "#BC1111", width: "20px", height: "20px" }}
            />
            <Typography>Denegado</Typography>
          </Box>
          <Typography
            sx={{ color: "#4E169D", fontWeight: "700", textAlign: "left" }}
          >
            Devolución de la administración:
          </Typography>
          <Typography sx={{ paddingRight: "20px", textAlign: "left" }}>
            {product.feedback}
          </Typography>
        </>
      );
    case status.REQUIERE_CAMBIOS:
      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "4px",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CircleIcon
              sx={{ color: "#B86B11", width: "20px", height: "20px" }}
            />
            <Typography>En revisión</Typography>
          </Box>
          <Typography
            sx={{ color: "#4E169D", fontWeight: "700", textAlign: "left" }}
          >
            Devolución de la administración:
          </Typography>
          <Typography sx={{ paddingRight: "20px", textAlign: "left" }}>
            {product.feedback}
          </Typography>
        </>
      );
    case status.CAMBIOS_REALIZADOS:
      return (
        <Typography>Los cambios en el producto han sido realizados.</Typography>
      );
    default:
      return <Typography>Estado desconocido.</Typography>;
  }
};

export default function ProfilePage() {
  const [products, setProducts] = useState<Supplier[]>([]);
  const [profile, setProfile] = useState({ name: "", lastName: "" });

  useEffect(() => {
    async function fetchProducts() {
      const productsApi = await getProductsBySupplier();
      setProducts(productsApi);
    }
    fetchProducts();
    const userString = localStorage.getItem("user");
    if (userString) {
      const userJSON = JSON.parse(userString);
      setProfile(userJSON);
    }
  }, []);

  return (
    <Box
      sx={{
        marginTop: "80px",
        padding: "0 16px 40px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: "25px",
      }}
    >
      <Typography sx={{ fontSize: "28px", fontWeight: "700" }}>
        {`${profile.name} ${profile.lastName}`}
      </Typography>
      <Button
        sx={{
          height: "40px",
          borderRadius: "100px",
          background: "#4E169D",
          textTransform: "none",
          color: "#fafafa",
          fontSize: "16px",
          fontWeight: "700",
          "&.Mui-disabled": {
            background: "#505050",
          },
        }}
        disabled={products.length >= 3}
      >
        <Link
          to="/createProduct"
          style={{
            color: "#fafafa",
            fontSize: "16px",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          Cargar Producto/Servicio
        </Link>
      </Button>
      <Typography sx={{ fontSize: "22px", fontWeight: "500" }}>
        Mis Productos/Servicios
      </Typography>
      {products.map((product) => (
        <Box
          key={product.id}
          sx={{ display: "flex", flexDirection: "column", gap: "25px" }}
        >
          <Box
            sx={{
              borderRadius: "16px 16px 4px 4px",
            }}
          >
            <Button
              sx={{
                background: "#4E169D",
                width: "100%",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "16px 16px 0px 0px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "18px",
                  color: "#fafafa",
                  textTransform: "none",
                  paddingLeft: "5px",
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  textTransform: "none",

                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Link
                  to={`/updateProduct/${product.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#fafafa",
                    fontWeight: "700",
                  }}
                >
                  Editar
                </Link>
                <NavigateNextIcon sx={{ color: "#fafafa" }} />
              </Typography>
            </Button>

            <Box
              sx={{
                borderRadius: "0px 0px 4px 4px",
                border: "1px solid #4E169D",
                padding: "10px 19px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {renderProductStatus(product)}
            </Box>
          </Box>
          {product.status === status.DENEGADO ? (
            <></>
          ) : (
            <>
              <Typography variant="h6">
                {product.status === status.ACEPTADO
                  ? "Asi se ve tu Producto/Servicio en el Directorio "
                  : "Asi se vería tu Producto/Servicio en el Directorio"}
              </Typography>
              <SupplierCard product={product} />
            </>
          )}
        </Box>
      ))}
    </Box>
  );
}
