import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";

interface LocationDialogProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const LocationDialog: React.FC<LocationDialogProps> = ({
  open,
  onClose,
  onAccept,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="location-dialog-title"
      aria-describedby="location-dialog-description"
      sx={{
        textAlign: "center",
        zIndex: 2000,
        "& .MuiDialog-paper": {
          width: "220px",
          maxWidth: "90%",
          marginTop: "-15vh",
          backgroundColor: "#eaeaea",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.9)",
          borderRadius: "8px",
          padding: "4px",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Zoom in={open} timeout={1000} style={{ transitionDelay: open ? "300ms" : "0ms" }}>
        <div>
          <DialogTitle
            id="location-dialog-title"
            sx={{ color: "#4E169D", fontSize: "16px", padding: "4px" }}
          >
            {"Comparte tu ubicación"}
          </DialogTitle>
          <DialogContent sx={{ padding: "4px" }}>
            <DialogContentText
              id="location-dialog-description"
              sx={{ fontWeight: "bold", fontSize: "12px" }}
            >
              ¿Deseas compartir tu ubicación para ver los productos más cercanos
              a ti?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              gap: "8px",
              padding: "4px",
            }}
          >
            <Button
              onClick={onClose}
              color="secondary"
              variant="outlined"
              sx={{
                minWidth: "70px",
                fontWeight: "semi-bold",
                fontSize: "10px",
                color: "#00A364",
                borderColor: "#00A364",
                "&:hover": {
                  borderColor: "#00A364",
                  backgroundColor: "#e0f2f1",
                },
              }}
            >
              No, gracias
            </Button>
            <Button
              onClick={onAccept}
              color="primary"
              variant="contained"
              sx={{
                minWidth: "70px",
                fontWeight: "bold",
                fontSize: "10px",
                color: "#fafafa",
                backgroundColor: "#00A364",
                "&:hover": {
                  backgroundColor: "#00796b",
                },
              }}
            >
              Sí, compartir
            </Button>
          </DialogActions>
        </div>
      </Zoom>
    </Dialog>
  );
};

export default LocationDialog;
