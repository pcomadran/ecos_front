// src/components/Navbar.tsx

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
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoEcos from "../../public/images/marca ecosistema-07.png";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAuth, Role } from "../context/authContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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

    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
    setMenuIcon(true);

    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const handleMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
    setDrawerOpen(false);
    setMenuIcon(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const getInitials = (name: string = "", surname: string = ""): string => {
    if (name && surname) {
      return `${name[0]}${surname[0]}`;
    } else if (name) {
      return `${name[0]}`;
    } else if (surname) {
      return `${surname[0]}`;
    }
    return "";
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
              left: "48%",
              transform: "translateX(-50%)",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={LogoEcos} alt="Logo" style={{ height: "100%" }} />
          </div>

          <div style={{ marginLeft: "auto" }}>
            {user ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenuToggle}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    src={user.picture || ""}
                    style={{
                      backgroundColor: user.picture ? "transparent" : "#000000",
                      border: "1px solid black",
                      marginRight: "-15px",
                    }}
                  >
                    {!user.picture &&
                      getInitials(user.name || "", user.lastName || "")}
                  </Avatar>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    style: {
                      marginLeft: "10px",
                      marginTop: "10px",
                      borderRadius: "4px",
                      backgroundColor: "#fafafa",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    Bienvenido
                  </Typography>

                  <MenuItem
                    onClick={() => {
                      handleNavigation("/profile");
                      handleMenuClose();
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    <Avatar
                      src={user.picture || ""}
                      style={{
                        backgroundColor: user.picture
                          ? "transparent"
                          : "#000000",
                        border: "1px solid black",
                        marginRight: "8px",
                        marginTop: "-35px",
                      }}
                    >
                      {!user.picture &&
                        getInitials(user.name || "", user.lastName || "")}
                    </Avatar>
                    <div>
                      <Typography
                        variant="body2"
                        style={{ fontWeight: "bold" }}
                      >
                        {user.name} {user.lastName}
                      </Typography>
                      <Typography variant="body2" style={{ color: "gray" }}>
                        {user.email}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          color: "#4E169D",
                          fontWeight: "bold",
                          textAlign: "center",
                          marginLeft: "-50px",
                          marginTop: "10px",
                        }}
                      >
                        Mi perfil
                      </Typography>
                    </div>
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                style={{
                  marginRight: "-15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                }}
                onClick={() => handleNavigation("/login")}
              >
                <AccountCircleOutlinedIcon
                  style={{ color: "#000000", fontSize: 40 }}
                />
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer para usuarios no logueados */}
      {!user && (
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
          <List
            style={{
              height: "100%",
              fontFamily: "Cairo, sans-serif",
              gap: "16px",
            }}
          >
            <ListItem button onClick={() => handleNavigation("/")}>
              <ListItemText
                primary="Inicio"
                style={{ color: "#FFFFFF", fontWeight: "bold" }}
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/proveedores")}>
              <ListItemText
                primary="Proveedores"
                style={{ color: "#FFFFFF", fontWeight: "bold" }}
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/publicaciones")}>
              <ListItemText
                primary="Publicaciones"
                style={{ color: "#FFFFFF", fontWeight: "bold" }}
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/login")}>
              <ListItemText
                primary="Iniciar sesión"
                style={{ color: "#FFFFFF", fontWeight: "bold" }}
              />
            </ListItem>
            <ListItem>
              <Typography
                variant="body1"
                style={{
                  color: "#FAFAFA",
                  width: "242px",
                  height: "66px",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                ¿Querés formar parte de la Red de impacto ECO como Proveedor?
              </Typography>
            </ListItem>
            <ListItem style={{ paddingLeft: "16px" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleNavigation("/register")}
                style={{
                  width: "100%",
                  color: "#fafafa",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Registrate
              </Button>
            </ListItem>
          </List>
        </Drawer>
      )}

      {/* Drawer para el supplier */}
      {user && user.role === Role.SUPPLIER && (
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
          <List
            style={{
              height: "100%",
              fontFamily: "Cairo, sans-serif",
              gap: "16px",
            }}
          >
            <ListItem button onClick={() => handleNavigation("/")}>
              <ListItemText
                primary="Inicio"
                style={{ color: "#FFFFFF", fontWeight: "bold" }}
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/proveedores")}>
              <ListItemText
                primary="Proveedores"
                style={{ color: "#FFFFFF", fontWeight: "bold" }}
              />
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/publicaciones")}>
              <ListItemText
                primary="Publicaciones"
                style={{ color: "#FFFFFF", fontWeight: "bold" }}
              />
            </ListItem>
          </List>
        </Drawer>
      )}

      {/* Drawer para el admin */}
      {user && user.role === Role.ADMIN && (
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
          <List
            style={{
              height: "100%",
              fontFamily: "Cairo, sans-serif",
              gap: "16px",
            }}
          >
            <ListItem>
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "20px",
                  color: "#FFFFFF",
                }}
              >
                Administrador
              </Typography>
            </ListItem>

            <Box sx={{ marginTop: 2 }}>
              <ListItem button onClick={() => handleNavigation("/dashboard")}>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  Dashboard Administrador
                </Typography>
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigation("/suppliersadmin")}
              >
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  Proveedores
                </Typography>
              </ListItem>
              <ListItem
                button
                onClick={() => handleNavigation("/publications/menu")}
              >
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: 600,
                    lineHeight: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  Publicaciones
                </Typography>
              </ListItem>
            </Box>
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
