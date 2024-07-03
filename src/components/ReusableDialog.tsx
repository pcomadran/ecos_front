import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type DialogType = "success" | "warning" | "error";

interface ReusableDialogProps {
  open: boolean;
  type: DialogType;
  title: string;
  message: string;
  onClose: () => void;
}

const dialogStyles: Record<DialogType, React.CSSProperties> = {
  success: { color: "green" },
  warning: { color: "orange" },
  error: { color: "red" },
};

const ReusableDialog: React.FC<ReusableDialogProps> = ({
  open,
  type,
  title,
  message,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={dialogStyles[type]}>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReusableDialog;
