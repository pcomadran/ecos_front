import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoEcos from "../../public/images/marca ecosistema-07.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(!drawerOpen);
    setMenuIcon(!menuIcon);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
    setMenuIcon(true);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        style={{ zIndex: 1301 }}
      >
        <Toolbar
          style={{
            position: "relative",
            borderBottom: "1px solid #e0e0e0",
            height: 64,
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {menuIcon ? <MenuIcon /> : <CloseIcon />}
          </IconButton>

          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={LogoEcos}
              alt="Logo"
              style={{ height: "300%", marginTop: 10 }}
            />
          </div>

          <div style={{ marginLeft: "auto" }}>
            <Button
              color="inherit"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
              }}
              onClick={() => handleNavigation('/login')}
            >
              <AccountCircleOutlinedIcon style={{ color: "#000000" }} />
              <Typography variant="body2" style={{ color: "black" }}>
                Ingresá
              </Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          style: {
            width: 242,
            marginTop: 64,
            backgroundColor: "#4E169D",
            color: "#FFFFFF",
          },
        }}
      >
        <List style={{ height: "100%", fontFamily: 'Cairo, sans-serif', gap: '16px' }}>
          {[
            { text: "Inicio", path: "/" },
            { text: "Proveedores", path: "/proveedores" },
            { text: "Publicaciones", path: "/publicaciones" },
            { text: "Iniciá sesión", path: "/login" },
          ].map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemText primary={item.text} style={{ color: "#FFFFFF", fontWeight: 'bold' }} />
            </ListItem>
          ))}
          <ListItem>
            <Typography
              variant="body1"
              style={{
                color: "#FAFAFA",
                width: "242px",
                height: "66px",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "18px",
                lineHeight: "22px",
                textAlign: "center",
              }}
            >
              ¿Querés formar parte de la Red de impacto ECO como Proveedor?
            </Typography>
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/register")}>
            <Typography
              variant="body1"
              style={{
                color: "#FAFAFA",
                width: "242px",
                height: "24px",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "20px",
                textAlign: "center",
              }}
            >
              Registrate
            </Typography>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
