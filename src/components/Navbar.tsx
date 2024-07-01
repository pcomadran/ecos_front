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

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(true); // true for MenuIcon, false for CloseIcon

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(!drawerOpen);
    setMenuIcon(!menuIcon); // Toggle menu icon state
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
            width: 250,
            marginTop: 64,
            backgroundColor: "#6b46c1",
          },
        }}
      >
        <List style={{ height: "100%" }}>
          {["Inicio", "Proveedores", "Publicaciones", "Iniciá sesión"].map(
            (text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} style={{ color: "#FFFFFF" }} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
