import React, { useState } from "react";
import {
  IconButton,
  Popover,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
} from "@mui/material";
import IconBot from "../../../public/images/IconBot.png";
import InteractiveChatbot from "./InteractiveChatbot";

const IconChatbot: React.FC = () => {
  const [openChat, setOpenChat] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showIcon, setShowIcon] = useState(true);

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

  React.useEffect(() => {
    if (openChat) {
      setShowIcon(false);
    } else {
      setShowIcon(true);
    }
  }, [openChat]);

  return (
    <>
      {/* Icono con efecto Slide desde abajo hacia arriba */}
      <Slide
        direction="up"
        in={showIcon}
        timeout={950}
        mountOnEnter
        unmountOnExit
      >
        <div
          style={{
            position: "fixed",
            zIndex: 1000,
            top: 180,
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
      <Dialog open={openChat} onClose={handleCloseChat} fullWidth maxWidth="md">
        <DialogTitle>Chatbot</DialogTitle>
        <DialogContent>
          <InteractiveChatbot />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IconChatbot;
