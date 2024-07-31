import { Box, Button, Typography } from "@mui/material";
import { status, Supplier } from "../types/typesSupplier";
// import image1 from "/images/Card bienestar imagen 1.jpg";
// import image2 from "/images/Card bienestar imagen 2.jpg";
// import image3 from "/images/Card bienestar imagen 3.jpg";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";
import SupplierCard from "../components/SupplierCard";
import { useEffect, useState } from "react";
import { getAllProducts, getProductsBySupplier } from "../servises/callsApi";

// const suppliers: Supplier[] = [
//   {
//     category: { id: 2, name: "Capacitaciones" },
//     imagesURLs: [image1, image2, image3],
//     name: "Lavanda",
//     shortDescription: "Cosmética Natural",
//     longDescription:
//       "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
//     city: "Godoy Cruz",
//     province: { id: 12, name: "Mendoza" },
//     country: { id: 1, name: "Argentina" },
//     status: status.REVISION_INICIAL,
//   },
//   {
//     category: { id: 4, name: "Cultivos" },
//     imagesURLs: [image1, image2, image3],
//     name: "Lavanda",
//     shortDescription: "Cosmética Natural",
//     longDescription:
//       "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
//     city: "Godoy Cruz",
//     province: { id: 12, name: "Mendoza" },
//     country: { id: 1, name: "Argentina" },
//     status: status.REQUIERE_CAMBIOS,
//   },
//   {
//     category: { id: 6, name: "Indumentaria" },
//     imagesURLs: [image1, image2, image3],
//     name: "Lavanda",
//     shortDescription: "Cosmética Natural",
//     longDescription:
//       "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
//     city: "Godoy Cruz",
//     province: { id: 12, name: "Mendoza" },
//     country: { id: 1, name: "Argentina" },
//     status: status.ACEPTADO,
//   },
//   {
//     category: { id: 1, name: "Bienestar" },
//     imagesURLs: [image1, image2, image3],
//     name: "Lavanda",
//     shortDescription: "Cosmética Natural",
//     longDescription:
//       "Lavanda es un proyecto familiar. Perseguimos una cosmética efectiva, magistral y con personalidad. Nuestro objetivo es hacer productos que enamoren, que cuiden al planeta, con principios activos que dejen el pelo sano y la piel bella.",
//     city: "Godoy Cruz",
//     province: { id: 12, name: "Mendoza" },
//     country: { id: 1, name: "Argentina" },
//     status: status.DENEGADO,
//   },
// ];

const profile = {
  name: "Julieta",
  last_name: "Pérez",
  // products: suppliers,
};

const renderProductStatus = (product: Supplier) => {
  switch (product.status) {
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
            ¡Gracias por querer forma parte de EcoSistema!
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
            Worem ipsum dolor sit amet, consectetur adipiscing elit Worem ipsum
            dolor sit amet, consectetur adipiscing elit. Worem ipsum dolor sit
            amet, consectetur adipiscing elit Worem ipsum dolor sit amet,
            consectetur adipiscing elit. olor sit amet, consectetur adipiscing
            elit. r sit amet, consectetur adipis.
            {/* {product.feedback} */}
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
            Worem ipsum dolor sit amet, consectetur adipiscing elit Worem ipsum
            dolor sit amet, consectetur adipiscing elit. Worem ipsum dolor sit
            amet, consectetur adipiscing elit Worem ipsum dolor sit amet,
            consectetur adipiscing elit. olor sit amet, consectetur adipiscing
            elit. r sit amet, consectetur adipis.
            {/* {product.feedback} */}
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

  console.log(products);

  useEffect(() => {
    async function fetchProducts() {
      const productsApi = await getAllProducts();
      // const productsApi = await getProductsBySupplier(supplierID);
      setProducts(productsApi);
    }
    fetchProducts();
  }, []);

  return (
    <Box
      sx={{
        marginTop: "80px",
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: "25px",
      }}
    >
      <Typography sx={{ fontSize: "28px", fontWeight: "700" }}>
        {`${profile.name} ${profile.last_name}`}
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
        }}
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
      {products.map((product, index) => (
        <Box
          key={index}
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
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "700",
                  color: "#fafafa",
                  textTransform: "none",

                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                Editar
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
          {product.status === 2 ? (
            <></>
          ) : (
            <>
              <Typography variant="h6">
                {product.status === 1
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
