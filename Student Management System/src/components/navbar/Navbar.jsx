import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const [header, setHeader] = useState(false);

  // 🔔 logout alert state
  const [logoutOpen, setLogoutOpen] = useState(false);
  const closeLogoutAlert = (_, reason) => {
    if (reason === "clickaway") return;
    setLogoutOpen(false);
  };



  const handleLogout = () => {
    localStorage.removeItem("loggedin");
        localStorage.removeItem("currentUser");

    setLogoutOpen(true);              
    setTimeout(() => navigate("/Login"), 1000); 

  };

  useEffect(() => {
    const changeBG = () => setHeader(window.scrollY >= 20);
    changeBG();
    window.addEventListener("scroll", changeBG);
    return () => window.removeEventListener("scroll", changeBG);
  }, []);

  return (
    <>
      <Snackbar
        open={logoutOpen}
        onClose={closeLogoutAlert}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeLogoutAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ✅ Logged out successfully!
        </Alert>
      </Snackbar>

      <header className={header ? "header active" : "header"}>
        <a href=" " className="logo">
          Student Management System
        </a>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/Student">Student</Link>
          <Link to="/Contact">Contact</Link>

          <Button
            onClick={handleLogout}
            variant="contained"
            color="warning"
            style={{ marginLeft: "20px" }}
          >
            Logout
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
