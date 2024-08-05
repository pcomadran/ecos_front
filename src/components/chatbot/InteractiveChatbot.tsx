import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  InputAdornment,
  Avatar,
  Box,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import IconBot from "../../../public/images/IconBot.png"; // Asegúrate de que esta ruta es correcta

interface Question {
  question: string;
  answer: string;
  active: boolean;
}

const questionData: Question[] = [
  {
    question: "¿Cuáles son los objetivos de la App?",
    answer:
      "Conectar consumidores y empresas con proveedores sustentables, fomentando prácticas de consumo consciente que contribuyen al cuidado del medio ambiente.",
    active: true,
  },
  {
    question: "¿Qué tipo de empresa es Ecosistema-Red de Impacto?",
    answer:
      "Somos un Grupo Asociativo dedicado a la promoción de servicios y productos ecológicos.",
    active: true,
  },
  {
    question: "¿Cuántas personas componen la empresa?",
    answer:
      "Nuestro equipo está compuesto por 50 personas apasionadas por la sostenibilidad.",
    active: true,
  },
  {
    question: "¿En dónde surge la empresa?",
    answer:
      "La empresa tiene sus raíces en Mendoza, donde comenzamos nuestra misión de impacto positivo.",
    active: true,
  },
  {
    question: "¿Qué ofrece el proyecto?",
    answer:
      "Ofrecemos un servicio que facilita el acceso a proveedores comprometidos con el reciclaje y la sostenibilidad.",
    active: true,
  },
  {
    question: "¿A qué rubro pertenece la empresa?",
    answer:
      "Nos especializamos en la comunicación de triple impacto, destacando los beneficios sociales, ambientales y económicos.",
    active: true,
  },
  {
    question: "¿Cuál es la breve descripción de la empresa?",
    answer:
      "Ecosistema-Red de Impacto es una plataforma que conecta a los consumidores con proveedores que promueven un consumo consciente, ayudando a generar un impacto socioambiental positivo.",
    active: true,
  },
  {
    question: "¿Qué tipo de proyecto es?",
    answer:
      "Es un proyecto de impacto ambiental, social y cultural que busca transformar hábitos de consumo a través de prácticas sostenibles.",
    active: true,
  },
  {
    question: "¿Cuál es el propósito del proyecto?",
    answer:
      "Crear una web para divulgar información sobre proveedores de triple impacto, destacando el reciclaje y la responsabilidad ambiental.",
    active: true,
  },
  {
    question: "¿Cuáles son los objetivos de la empresa?",
    answer:
      "Difundir información sobre proveedores de triple impacto, facilitar el contacto con ellos, y gestionar publicaciones relevantes para fomentar el reciclaje y la sostenibilidad.",
    active: true,
  },
  {
    question: "¿Qué es el triple impacto?",
    answer:
      "Refiere a iniciativas que generan impacto social, ambiental y económico positivo.",
    active: true,
  },
  {
    question: "¿Qué servicios ofrece Ecosistema?",
    answer:
      "Conexión entre proveedores sustentables y consumidores interesados en el consumo consciente.",
    active: true,
  },
  {
    question: "¿Cómo puedo unirme como proveedor?",
    answer:
      "Debes registrarte y esperar la aprobación de tu perfil por parte del administrador.",
    active: true,
  },
  {
    question: "¿Qué beneficios obtengo al unirme a Ecosistema?",
    answer:
      "Mayor visibilidad, acceso a una red comprometida con la sostenibilidad y oportunidades de negocio.",
    active: true,
  },
  {
    question:
      "¿Cómo puedo contribuir al cuidado del medio ambiente con Ecosistema?",
    answer:
      "Apoyando a proveedores que practican la sostenibilidad en sus procesos.",
    active: true,
  },
  {
    question: "¿Qué tipo de publicaciones puedo cargar en la plataforma?",
    answer:
      "Publicaciones relacionadas con el triple impacto y el consumo consciente.",
    active: true,
  },
];

const InteractiveChatbot: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ text: string; type: "user" | "chatbot" }[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Simulamos la obtención del usuario desde el localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserName(user.name || user.email); // Usa el email si el nombre está vacío
      setUserImage(user.picture);
    }
    console.log(userString);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const filteredQuestions = questionData.filter(
    (q) =>
      q.active && q.question.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleQuestionClick = (question: Question) => {
    setInputValue("");
    setMessages([...messages, { text: question.question, type: "user" }, { text: question.answer, type: "chatbot" }]);
  };

  // Avatar del usuario
  const userAvatar = (
    <Avatar
      sx={{ bgcolor: "#4E169D", marginBottom: "3px", width: 30, height: 30 }}
    >
      {userImage ? (
        <img src={userImage} alt="User Avatar" style={{ width: "100%" }} />
      ) : (
        (userName?.charAt(0) || "U").toUpperCase() // Usa la inicial del nombre o del email
      )}
    </Avatar>
  );

  const chatbotAvatar = (
    <Avatar
      src={IconBot}
      alt="Chatbot"
      sx={{ marginBottom: "-10px", width: 60, height: 60 }}
    />
  );

  return (
    <div
      style={{
        marginLeft: -14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "500px",
        width: "111%",
        overflow: "auto",
        border: "1px solid #ccc",
        padding: "16px",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Ingresá Preguntas"
        autoComplete="off"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        style={{
          backgroundColor: "#eaeaea",
          borderRadius: "50px",
          height: "40px",
          marginBottom: "16px",
        }}
        InputProps={{
          style: {
            height: "40px",
            padding: "2px 20px",
            borderRadius: "50px",
            border: "none",
          },
          startAdornment: (
            <InputAdornment position="start">
              <EditIcon />
            </InputAdornment>
          ),
        }}
      />

      {inputValue && filteredQuestions.length > 0 && (
        <List style={{ width: "100%" }}>
          {filteredQuestions.map((q, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                style={{ width: "100%" }}
                onClick={() => handleQuestionClick(q)}
              >
                <ListItemText primary={q.question} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: message.type === "user" ? "row" : "row-reverse",
              alignItems: "flex-start",
              width: "100%",
              margin: "5px 0",
            }}
          >
            {message.type === "user" ? userAvatar : chatbotAvatar}
            <Box
              sx={{
                backgroundColor: message.type === "user" ? "#eaeaea" : "#4E169D",
                color: message.type === "user" ? "black" : "white",
                borderRadius: "20px",
                padding: "10px",
                maxWidth: "70%",
                boxSizing: "border-box",
              }}
            >
              <Typography sx={{fontSize: "14px"}}>{message.text}</Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} /> {/* Referencia al final de los mensajes */}
      </Box>
    </div>
  );
};

export default InteractiveChatbot;
