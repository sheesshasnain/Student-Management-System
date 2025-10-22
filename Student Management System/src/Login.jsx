import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

export default function LoginForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const single = JSON.parse(localStorage.getItem("user"));

    if (single) {
      const exists = users.some(
        (u) =>
          (u.email || "").toLowerCase().trim() ===
          (single.email || "").toLowerCase().trim()
      );
      if (!exists) {
        users.push(single);
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    const found = users.find(
      (u) =>
        (u.email || "").toLowerCase().trim() ===
        (input.email || "").toLowerCase().trim()
    );

    if (found && input.password === (found.password || "")) {
      localStorage.setItem("loggedin", true);
      localStorage.setItem("currentUser", JSON.stringify(found));
      setOpenSuccess(true);
      setTimeout(() => navigate("/"), 800);
    } else {
      setOpenError(true);
    }
  };

  return (
    <>
      {/* Top-center alerts */}
      <Snackbar
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ✅ Login successful!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        onClose={() => setOpenError(false)}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          ❌ Invalid Username or Password!
        </Alert>
      </Snackbar>

      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="brand">
            <div className="logo-dot">🎓</div>
            <h1>Student Management System</h1>
          </div>

          <h2 className="login-title">Sign in</h2>
          <p className="subtitle">Access your dashboard and manage students.</p>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="email" style={{ color: "white" }}>
                Email
              </label>
              <div className="input-wrap">
                <div className="input-icon">✉️</div>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" style={{ color: "white" }}>Password</label>
              <div className="input-wrap">
                <div className="input-icon">🔒</div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="row">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>

            <div className="divider">or</div>

            <p className="register-text">
              Don’t have an account? <Link to="/Register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
