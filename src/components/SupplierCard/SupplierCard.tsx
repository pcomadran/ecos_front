import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import example from "../../../public/images/Card bienestar imagen 1.jpg";

export default function SupplierCard() {
  const product = {
    category: "Categoria",
    image: example,
    title: "Titulo",
    description: "Descripcion",
    city: "Ciudad",
  };
  return (
    <Card
      sx={{
        padding: "8px",
        backgroundColor: "#fafafa",
        borderRadius: "10px",
        width: "152px",
        height: "248px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "visible",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-5px",
          right: 0,
          width: "96px",
          height: "24px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#fafafa",
          border: "1px solid #00a364",
          borderRadius: "5px",
          color: "#6433a8",
          padding: "2px 8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography variant="subtitle1" component="span" sx={{ fontSize: 13 }}>
          {product.category}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        alt={product.title}
        image={product.image}
        sx={{
          width: "100%",
          height: "136px",
          borderRadius: "10px",
          paddingBottom: "5px",
          objectFit: "cover",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignContent: "space-between",
          height: "88px",
          flexGrow: 1,
          padding: 0,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontSize: 16, margin: 0, padding: "2px 0" }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 13, margin: 0, padding: "2px 0" }}
          >
            {product.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "35px",
          }}
        >
          <RoomOutlinedIcon
            sx={{
              color: "#4e169d",
            }}
          />
          <Typography
            variant="subtitle2"
            component="span"
            sx={{ fontSize: 13 }}
          >
            {product.city}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
