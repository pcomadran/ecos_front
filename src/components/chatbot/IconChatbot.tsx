import React, { useState, useRef } from "react";
import {
  IconButton,
  Popover,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import IconBot from "../../../public/images/IconBot.png"; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import InteractiveChatbot from "./InteractiveChatbot";

const IconChatbot: React.FC = () => {
  const [openChat, setOpenChat] = useState(false); // Estado para el chatbot
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Estado para el Popover
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 16,
    y: 16,
  });

  const draggableRef = useRef<HTMLDivElement>(null);

  const handleOpenChat = () => {
    setOpenChat(true);
    setAnchorEl(null); // Cierra el popover cuando se abre el chat
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Abre el popover y coloca el anchor
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    e.preventDefault();
    // Convertir el evento de toque a un evento de clic para llamar a handleClick
    handleClick({
      currentTarget: e.currentTarget,
    } as React.MouseEvent<HTMLElement>);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <>
      <Draggable
        position={position}
        onDrag={handleDrag}
        onStop={handleStop}
        bounds="parent" // Limita el arrastre al área del viewport
        nodeRef={draggableRef} // Agrega el ref al Draggable
      >
        <div
          ref={draggableRef} // Asigna el ref al contenedor que quieres manipular
          style={{
            position: "fixed",
            zIndex: 1000,
            bottom: 200,
            right: 5,
          }}
        >
          <IconButton
            style={{
              cursor: "move", // Indica que el elemento puede ser arrastrado
            }}
            onClick={handleClick} // Muestra el popover con clic
            onTouchEnd={handleTouchEnd} // Muestra el popover en móviles
          >
            <img
              src={IconBot}
              alt="Chatbot Icon"
              style={{ width: 70, height: 70 }}
            />{" "}
            {/* Reemplaza el ícono con la imagen */}
          </IconButton>
        </div>
      </Draggable>

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
