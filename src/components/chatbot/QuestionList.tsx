// src/components/chatbot/QuestionList.tsx

import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

interface Question {
  question: string;
  answer: string;
  active: boolean;
}

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <List>
      {questions.map((q, index) => (
        <ListItem key={index}>
          <ListItemText primary={q.question} secondary={q.answer} />
        </ListItem>
      ))}
    </List>
  );
};

export default QuestionList;
