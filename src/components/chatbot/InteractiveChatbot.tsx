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
import EditIcon from "@mui/icons-material/Edit";
import IconBot from "../../../public/images/IconBot.png"; // Asegúrate de que esta ruta es correcta
import axios from "../../servises/axiosConfig"; // Importa axios para realizar la solicitud HTTP

interface Question {
  id: number;
  text: string;
  category: {
    id: number;
    name: string;
  } | null;
}

interface Answer {
  id: number;
  text: string;
  question: {
    id: number;
    text: string;
    category: {
      id: number;
      name: string;
    } | null;
  };
}

const InteractiveChatbot: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { text: string; type: "user" | "chatbot" }[]
  >([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]); // Estado para las preguntas
  const [answers, setAnswers] = useState<Answer[]>([]); // Estado para las respuestas

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Simulamos la obtención del usuario desde el localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserName(user.name || user.email);
      setUserImage(user.picture);
    }
    console.log(userString);
  }, []);

  useEffect(() => {
    // Obtenemos las preguntas del backend
    axios
      .get("api/questions")
      .then((response) => {
        setQuestions(response.data);
        console.log("preguntas: ", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las preguntas:", error);
      });
  }, []);

  useEffect(() => {
    // Obtenemos las respuestas del backend
    axios
      .get("api/answers")
      .then((response) => {
        setAnswers(response.data);
        console.log("respuestas: ", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las respuestas:", error);
      });
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const filteredQuestions = questions
    .map((q) => {
      // Limpia el símbolo de interrogación al inicio de la pregunta
      const cleanedQuestionText = q.text.startsWith('¿') ? q.text.substring(1).trim() : q.text;

      return {
        ...q,
        cleanedText: cleanedQuestionText,
        startsWithValue: cleanedQuestionText.toLowerCase().startsWith(inputValue.toLowerCase()),
        containsValue: cleanedQuestionText.toLowerCase().includes(inputValue.toLowerCase()),
      };
    })
    .filter((q) => q.startsWithValue || q.containsValue)
    .sort((a, b) => {
      if (a.startsWithValue && !b.startsWithValue) return -1;
      if (!a.startsWithValue && b.startsWithValue) return 1;
      return 0;
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleQuestionClick = (question: Question) => {
    const answer = answers.find((a) => a.question.id === question.id);
    setInputValue("");
    setMessages([
      ...messages,
      { text: question.text, type: "user" },
      {
        text: answer ? answer.text : "No se encontró respuesta para esta pregunta.",
        type: "chatbot",
      },
    ]);
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
                <ListItemText primary={q.text} />
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
                backgroundColor:
                  message.type === "user" ? "#eaeaea" : "#4E169D",
                color: message.type === "user" ? "black" : "white",
                borderRadius: "20px",
                padding: "10px",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>{message.text}</Typography>
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} /> {/* Referencia al final de los mensajes */}
      </Box>
    </div>
  );
};

export default InteractiveChatbot;
