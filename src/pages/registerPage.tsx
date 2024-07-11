import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RegisterImage from "../../public/images/FondoLogin.png";
import LogoEcos from "../../public/images/marcaLogin.png";
import GoogleIcon from "../../public/images/logoGoogle.png";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${RegisterImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#000",
          paddingTop: "80px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fafafa",
            borderRadius: 2,
            p: 4,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Registrate
          </Typography>

          <Typography variant="body1" gutterBottom>
            Sumate a ECOSistema
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 4,
            }}
          >
            <img src={LogoEcos} alt="Logo" style={{ height: 100 }} />
          </Box>
          <Typography variant="body2" gutterBottom>
            Registrate con tu cuenta de Gmail
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              sx={{
                backgroundColor: "#4E169D",
                color: "#fafafa",
                "&:hover": {
                  backgroundColor: "#3B0E82",
                },
                borderRadius: 20,
                textTransform: "none",
                fontSize: "1rem",
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={GoogleIcon}
                alt="Google Icon"
                style={{
                  marginLeft: "-10px",
                  marginRight: "-5px",
                  height: "24px",
                  borderRadius: 20,
                }}
              />
              Continuá con Google
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterPage;
