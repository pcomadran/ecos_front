import React, { useState, useEffect } from "react";
import {
  IconButton,
  Popover,
  Typography,
  Dialog,
  DialogContent,
  Slide,
} from "@mui/material";
import IconBot from "../../../public/images/IconBot.png";
import InteractiveChatbot from "./InteractiveChatbot";

const IconChatbot: React.FC = () => {
  const [openChat, setOpenChat] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showIcon, setShowIcon] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Aquí buscamos los datos del usuario en localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.role === "ADMIN") {
      setIsAdmin(true);
    } else {
      setShowIcon(true);
    }
  }, []);

  const handleOpenChat = () => {
    setOpenChat(true);
    setAnchorEl(null);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  // Controlar la visibilidad del icono cuando se abre o cierra el chat
  useEffect(() => {
    if (openChat) {
      setShowIcon(false);
    } else {
      setShowIcon(true);
    }
  }, [openChat]);

  if (isAdmin) {
    return null;
  }

  return (
    <>
      {/* Icono con efecto Slide */}
      <Slide
        direction="up"
        in={showIcon}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <div
          style={{
            position: "fixed",
            zIndex: 1000,
            top: 160,
            right: -5,
          }}
        >
          <IconButton
            style={{
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <img
              src={IconBot}
              alt="Chatbot Icon"
              style={{ width: 70, height: 70 }}
            />
          </IconButton>
        </div>
      </Slide>

      {/* Popover para confirmación */}
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            marginBottom: "-30px",
            marginTop: "-10px",
            borderRadius: "50px",
            padding: "8px",
          },
        }}
      >
        <Typography
          style={{ cursor: "pointer", color: "black" }}
          onClick={handleOpenChat}
        >
          ¿Quieres preguntar algo?
        </Typography>
      </Popover>

      {/* Diálogo del Chatbot */}
      <Dialog
        open={openChat}
        onClose={handleCloseChat}
        fullWidth
        maxWidth="lg"
        sx={{ mt: 7 }}
      >
        <DialogContent>
          <InteractiveChatbot onClose={handleCloseChat} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IconChatbot;
