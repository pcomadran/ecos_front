import React from "react";
import { Box, Typography } from "@mui/material";

const WorkinProgress: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginTop: "112px",
      }}
    >
      <img
        src="/images/ConBot.png"
        alt="ConBot"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: 700,
          marginTop: "16px",
          textAlign: "center",
        }}
      >
        WORK IN PROGRESS
      </Typography>
    </Box>
  );
};

export default WorkinProgress;
