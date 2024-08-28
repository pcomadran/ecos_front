import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography, Button } from "@mui/material";

interface ReusableDialogProps {
  open: boolean;
  onClose: () => void;
  type: "success" | "error";
  message: string;
}

const ReusableDialog: React.FC<ReusableDialogProps> = ({ open, onClose, type, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {type === "success" ? "Éxito" : "Error"}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {message}
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
