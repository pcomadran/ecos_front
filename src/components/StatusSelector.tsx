import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import ReusableDialog from "./ReusableDialog"; // Ajusta la ruta según corresponda

interface StatusSelectorProps {
  status: string;
  productID: string;
  initialFeedback: string;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({
  status,
  productID,
  initialFeedback,
}) => {
  const [feedback, setFeedback] = useState<string>(initialFeedback || "");
  const [selectedStatus, setSelectedStatus] = useState<string>(status || "");
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isFeedbackChanged, setIsFeedbackChanged] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogType, setDialogType] = useState<"success" | "error">("success");
  const [dialogMessage, setDialogMessage] = useState<string>("");

  useEffect(() => {
    console.log("Feedback inicial recibido:", initialFeedback);
    setFeedback(initialFeedback);
  }, [initialFeedback]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACEPTADO":
        return "green";
      case "DENEGADO":
        return "red";
      case "REQUIERE_CAMBIOS":
        return "orange";
      default:
        return "transparent";
    }
  };

  const handleUpdateStatus = async () => {
    if (!productID) {
      console.error("ID del producto está vacío.");
      return;
    }

    console.log("ID del producto:", productID);
    console.log("Estado seleccionado:", selectedStatus);
    console.log("Feedback:", feedback);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Token está vacío.");
        return;
      }

      const response = await axios.patch(
        `http://localhost:8080/api/products/feedback/${productID}`,
        null,
        {
          params: {
            status: selectedStatus,
            feedback: selectedStatus === "ACEPTADO" ? "" : feedback,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Actualización exitosa:", response.data);
      setIsSubmitted(true);
      setIsEditable(false);
      setIsFeedbackChanged(false);

      // Mostrar diálogo de éxito
      setDialogType("success");
      setDialogMessage("Actualización realizada con éxito.");
      setDialogOpen(true);
    } catch (error) {
      console.error("Error al actualizar el estado y el feedback:", error);

      // Mostrar diálogo de error
      setDialogType("error");
      setDialogMessage("Error al actualizar el estado y el feedback.");
      setDialogOpen(true);
    }
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    if (newStatus === "ACEPTADO") {
      setFeedback(""); // Limpiar el feedback si el estado es ACEPTADO
    }
    setIsEditable(false);
    setIsFeedbackChanged(false);
    setIsSubmitted(false);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value);
    setIsFeedbackChanged(e.target.value !== initialFeedback);
  };

  const shouldShowButton = () => {
    return (
      selectedStatus === "DENEGADO" ||
      selectedStatus === "REQUIERE_CAMBIOS" ||
      (initialFeedback && selectedStatus !== "ACEPTADO") ||
      selectedStatus === "ACEPTADO"
    );
  };

  const isSendButtonEnabled = () => {
    return selectedStatus === "ACEPTADO" || isFeedbackChanged;
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 2,
        mt: 4,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#F3F3F3",
        width: "100%",
      }}
    >
      {status !== "REVISION_INICIAL" && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: getStatusColor(status),
              mr: 1,
            }}
          />
          <Typography variant="h6" sx={{ color: "#4E169D", fontWeight: 600 }}>
            {status === "ACEPTADO"
              ? "Aceptado"
              : status === "DENEGADO"
              ? "Denegado"
              : status === "REQUIERE_CAMBIOS"
              ? "Requiere cambios"
              : "No definido"}
          </Typography>
        </Box>
      )}

      <FormControl sx={{ minWidth: 120, mb: 2 }}>
        <Select
          value={selectedStatus}
          onChange={handleStatusChange}
          displayEmpty
          renderValue={(value) => {
            if (!value) {
              return <Typography variant="body1">Selección de estado</Typography>;
            }
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: getStatusColor(value),
                    mr: 1,
                  }}
                />
                <Typography variant="body1">
                  {value === "ACEPTADO"
                    ? "Aceptado"
                    : value === "DENEGADO"
                    ? "Denegado"
                    : value === "REQUIERE_CAMBIOS"
                    ? "Requiere cambios"
                    : "Selección de estado"}
                </Typography>
              </Box>
            );
          }}
        >
          <MenuItem value="" disabled>
            Selección de estado
          </MenuItem>
          <MenuItem value="ACEPTADO">
            <Box
              sx={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "green",
                mr: 1,
              }}
            />
            Aceptado
          </MenuItem>
          <MenuItem value="REQUIERE_CAMBIOS">
            <Box
              sx={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "orange",
                mr: 1,
              }}
            />
            Requiere cambios
          </MenuItem>
          <MenuItem value="DENEGADO">
            <Box
              sx={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "red",
                mr: 1,
              }}
            />
            Denegado
          </MenuItem>
        </Select>
      </FormControl>

      {(selectedStatus === "DENEGADO" ||
        selectedStatus === "REQUIERE_CAMBIOS" ||
        (initialFeedback && selectedStatus !== "ACEPTADO")) && !isSubmitted && (
        <Box sx={{ width: "100%", mb: 2 }}>
          <Box
            sx={{
              mb: -1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#4E169D",
              padding: "8px",
              borderRadius: "15px 15px 0 0",
              borderWidth: "0px 1px 1px 1px",
              borderStyle: "solid",
              borderColor: "#4E169D",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: 600 }}
            >
              Devolución al Proveedor
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: 600, cursor: "pointer" }}
              onClick={() => setIsEditable(!isEditable)}
            >
              {isEditable ? "Cancelar" : "Editar"}
            </Typography>
          </Box>

          {selectedStatus !== "ACEPTADO" && (
            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={feedback}
                onChange={handleFeedbackChange}
                inputProps={{ maxLength: 300 }}
                sx={{
                  mt: 1,
                  border: "1px solid #4E169D",
                  borderRadius: "4px",
                }}
                disabled={!isEditable}
              />
              <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
              backgroundColor: "#F3F3F3",
              borderRadius: "0 0 4px 4px",
            }}
          >
            <Typography variant="caption" sx={{ color: "textSecondary" }}>
              Máximo 300 caracteres
            </Typography>
            <Typography variant="caption" sx={{ color: "textSecondary" }}>
              {feedback.length} / 300
            </Typography>
          </Box>
            </Box>
          )}
        </Box>
      )}

      {shouldShowButton() && !isSubmitted && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateStatus}
          disabled={!isSendButtonEnabled()}
        >
          {isFeedbackChanged ? "Guardar cambios" : "Enviar"}
        </Button>
      )}

      <ReusableDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        type={dialogType}
        message={dialogMessage}
      />
    </Box>
  );
};

export default StatusSelector;
