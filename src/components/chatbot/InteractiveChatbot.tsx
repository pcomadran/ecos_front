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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import IconBot from "../../../public/images/IconBot.png";
import axios from "../../services/axiosConfig";

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

interface InteractiveChatbotProps {
  onClose: () => void;
}

const InteractiveChatbot: React.FC<InteractiveChatbotProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { text: string; type: "user" | "chatbot" }[]
  >([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Obtención del usuario de el localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserName(user.name || user.email);
      setUserImage(user.picture);
    }
  }, []);

  useEffect(() => {
    // Obtenemos las preguntas del backend
    axios
      .get("api/questions")
      .then((response) => {
        setQuestions(response.data);
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
      const cleanedQuestionText = q.text.startsWith("¿")
        ? q.text.substring(1).trim()
        : q.text;

      return {
        ...q,
        cleanedText: cleanedQuestionText,
        startsWithValue: cleanedQuestionText
          .toLowerCase()
          .startsWith(inputValue.toLowerCase()),
        containsValue: cleanedQuestionText
          .toLowerCase()
          .includes(inputValue.toLowerCase()),
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
        text: answer
          ? answer.text
          : "No se encontró respuesta para esta pregunta.",
        type: "chatbot",
      },
    ]);
  };

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "460px",
        padding: "16px",
        position: "relative",
      }}
    >
      {/* Ícono de cierre */}
      <ExitToAppIcon
        onClick={onClose}
        sx={{
          position: "absolute",
          top: -10,
          left: -12,
          cursor: "pointer",
          transform: "rotate(180deg)",
          color: "#4E169D",
          fontSize: "30px",
          zIndex: 1500,
        }}
      />
      <Typography
        sx={{
          position: "absolute",
          color: "#4E169D",
          fontWeight: 900,
          ml: "60px",
          mt: -3,
        }}
      >
        ChatBot
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Ingresá Preguntas"
        autoComplete="off"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        sx={{
          backgroundColor: "#eaeaea",
          borderRadius: "50px",
          height: "40px",
          mb: "16px",
          mt: "16px",
        }}
        InputProps={{
          sx: {
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
        <List sx={{ width: "100%", maxHeight: "150px", overflowY: "auto" }}>
          {filteredQuestions.map((q, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{ width: "100%" }}
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
          height: "calc(100% - 56px)",
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
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default InteractiveChatbot;
