import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Supplier } from "../types/typesSupplier";
import StatusSelector from "./StatusSelector";

interface ProductFormProps {
  selectedProveedor: Supplier | null;
  onBack: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  selectedProveedor,
  onBack,
}) => {
  const [status, setStatus] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    if (selectedProveedor) {
      setStatus(selectedProveedor.status || "");
      setFeedback(selectedProveedor.feedback || "");
      console.log("Este es el feedback del producto:", selectedProveedor.feedback);
    }
  }, [selectedProveedor]);


  if (!selectedProveedor) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        borderRadius: 1,
        backgroundColor: "#F5F5F5",
        boxShadow: 1,
        position: "relative",
      }}
    >
      <ExitToAppIcon
        onClick={onBack}
        sx={{
          position: "absolute",
          top: 5,
          left: 5,
          cursor: "pointer",
          transform: "rotate(180deg)",
          color: "#4E169D",
          fontSize: "30px", 
        }}
      />

      <StatusSelector
        status={status}
        initialFeedback={feedback}
        productID={selectedProveedor.id ? selectedProveedor.id.toString() : ""}
      />

      <Box sx={{ textAlign: "center", mb: 3, mt: 2 }}>
        <Typography variant="h5" sx={{ color: "#4E169D" }}>
          {selectedProveedor.name}
        </Typography>
        <Typography variant="body1" sx={{ color: "#222222", fontWeight: 700 }}>
          {selectedProveedor.category?.name || "Categoría no disponible"}
        </Typography>
      </Box>

      <TextField
        label="Categoría"
        variant="outlined"
        fullWidth
        value={selectedProveedor.category?.name || "No posee"}
        InputLabelProps={{
          sx: {
            color: "#4E169D",
            fontWeight: 600,
          },
        }}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        value={selectedProveedor.email || "No posee"}
        InputLabelProps={{
          sx: {
            color: "#4E169D",
            fontWeight: 600,
          },
        }}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Teléfono o WhatsApp"
        variant="outlined"
        fullWidth
        value={selectedProveedor.phoneNumber || "No posee"}
        InputLabelProps={{
          sx: {
            color: "#4E169D",
            fontWeight: 600,
          },
        }}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Instagram"
        variant="outlined"
        fullWidth
        value={selectedProveedor.instagram || "No posee"}
        InputLabelProps={{
          sx: {
            color: "#4E169D",
            fontWeight: 600,
          },
        }}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="País"
        variant="outlined"
        fullWidth
        value={selectedProveedor.country?.name || "No posee"}
        InputLabelProps={{
          sx: {
            color: "#4E169D",
            fontWeight: 600,
          },
        }}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Provincia/Estado"
        variant="outlined"
        fullWidth
        value={selectedProveedor.province?.name || "No posee"}
        InputLabelProps={{
          sx: {
            color: "#4E169D",
            fontWeight: 600,
          },
        }}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Ciudad"
        variant="outlined"
        fullWidth
        value={selectedProveedor.city || "No posee"}
        InputLabelProps={{
          sx: {
            color: "#4E169D",
            fontWeight: 600,
          },
        }}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Descripción del producto/servicio"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={selectedProveedor.longDescription || "No posee"}
        InputLabelProps={{
          sx: {
            color: "#4E169D",
            fontWeight: 600,
          },
        }}
        InputProps={{ readOnly: true }}
        sx={{ mb: 2 }}
      />

      {selectedProveedor.imagesURLs &&
      selectedProveedor.imagesURLs.length > 0 ? (
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ mb: 1, color: "#4E169D" }}>Imágenes:</Typography>
          <Grid container spacing={2}>
            {selectedProveedor.imagesURLs.map((url, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  component="img"
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  sx={{ width: "100%", height: "auto", borderRadius: 1 }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography sx={{ mt: 2, color: "#4E169D" }}>
          No posee imágenes
        </Typography>
      )}
    </Box>
  );
};

export default ProductForm;
