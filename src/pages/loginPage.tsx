import { useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import LoginImage from "../../public/images/FondoLogin.png";
import LogoEcos from "../../public/images/marcaLogin.png";
import GoogleIcon from "../../public/images/logoGoogle.png";
import { useAuth } from "../context/authContext";

const LoginPage = () => {
  const { login, getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await getToken();
      } catch (error) {
        console.error('Esperando usuario en consola:', error);
      }
    };
    
    fetchToken();
  }, [getToken]);
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${LoginImage})`,
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
            Iniciá sesión
          </Typography>

          <Typography variant="body1" gutterBottom>
            Seguí disfrutando de ECOSistema
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
          <Typography variant="body1" gutterBottom>
            Ingresá con tu cuenta de Gmail
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
              onClick={login}
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

export default LoginPage;
