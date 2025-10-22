import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

export default function Register() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const closeSnack = (_, reason) => {
    if (reason === "clickaway") return;
    setSnack((s) => ({ ...s, open: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const already = users.find(
      (u) =>
        (u.email || "").toLowerCase().trim() ===
        (input.email || "").toLowerCase().trim()
    );
    if (already) {
      setSnack({
        open: true,
        severity: "error",
        message: "User already exists. Please login.",
      });
      return;
    }

    const updated = [...users, input];
    localStorage.setItem("users", JSON.stringify(updated));
    localStorage.setItem("user", JSON.stringify(input));

    setSnack({
      open: true,
      severity: "success",
      message: `✅ ${input.name} was successfully added!`,
    });
    setTimeout(() => navigate("/Login"), 900);
  };

  return (
    <>
      <Snackbar
        open={snack.open}
        onClose={closeSnack}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          variant="filled"
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Branding (matches CSS .brand/.logo-dot) */}
          <div className="brand">
            <div className="logo-dot">🎓</div>
            <h1>Student Management System</h1>
          </div>

          <h2 className="login-title">Create an account</h2>
          <p className="subtitle">Register to access your dashboard.</p>

          {/* Grid wrapper (matches .form-grid) */}
          <div className="form-grid">
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              {/* input-wrap + input-icon for styled field */}
              <div className="input-wrap">
                <div className="input-icon">👤</div>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  name="name"
                  value={input.name}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrap">
                <div className="input-icon">✉️</div>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <div className="input-icon">🔒</div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={input.password}
                  name="password"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button type="submit" className="login-button">
              Register
            </button>

            <div className="divider">or</div>

            <p className="register-text">
              Already have an account? <Link to="/Login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
