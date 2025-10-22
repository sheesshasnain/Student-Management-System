import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/navbar/Navbar";
import CardStud from "./components/CardStud/CardStud";
import Footer from "./components/Footer/Footer";
import { Box, Button, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import img1 from "./assets/fperson.png";   // female
import img2 from "./assets/persons.png";   // male/default

const API = "http://localhost:5000/students";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  // delete snackbar
  const [delAlertOpen, setDelAlertOpen] = useState(false);
  const [delAlertSeverity, setDelAlertSeverity] = useState("success");
  const [delAlertMsg, setDelAlertMsg] = useState("Student deleted successfully.");

  const getStudentImg = (s) => {
    const g = (s?.gender || "").toLowerCase().trim();
    if (s?.img) return s.img;
    if (g === "female" || g === "f") return img1;
    return img2;
  };

useEffect(() => {
  let alive = true;
  setLoading(true);

  axios.get(API)
    .then(({ data }) => {
      if (!alive) return;
      setStudents(Array.isArray(data) ? data : []);
      setError("");
    })
    .catch((err) => {
      if (!alive) return;
      setError(err?.response?.statusText || err?.message || "Failed to load students.");
    })
    .finally(() => {
      if (alive) setLoading(false);
    });

  return () => { alive = false; };
}, []);

const handleDelete = (id) => {
  axios.delete(`${API}/${id}`)
    .then(() => {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      setDelAlertSeverity("success");
      setDelAlertMsg("Student deleted successfully.");
      setDelAlertOpen(true);
    })
    .catch(() => {
      setDelAlertSeverity("error");
      setDelAlertMsg("Could not delete student. Please try again.");
      setDelAlertOpen(true);
    });
};

  const handleCloseAlert = (_, reason) => {
    if (reason === "clickaway") return;
    setDelAlertOpen(false);
  };

  return (
    <>
      {/* Delete snackbar */}
      <Snackbar
        open={delAlertOpen}
        onClose={handleCloseAlert}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={delAlertSeverity} variant="filled" sx={{ width: "100%" }}>
          {delAlertMsg}
        </Alert>
      </Snackbar>

      <div>
        <Navbar />
        <div>
          <h4 className="HeadingStud">Student Cards</h4>
        </div>

        {loading ? (
          <div style={{ display: "grid", placeItems: "center", padding: 40 }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <p style={{ textAlign: "center", color: "crimson", padding: 24 }}>{error}</p>
        ) : (
          <div className="cardContainer">
            {students.length > 0 ? (
              students.map((student) => (
                <CardStud
                  key={student.id}
                  id={student.id}
                  img={getStudentImg(student)}
                  name={student.name}
                  rollNo={student.rollNo}
                  subject={student.subject}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p style={{ textAlign: "center" }}>
                No students yet. Add one below 👇
              </p>
            )}
          </div>
        )}

        <Box display="flex" justifyContent="center" padding="50px">
          <Link to="/AddSt">
            <Button variant="contained">Add Student</Button>
          </Link>
        </Box>

        <Footer />
      </div>
    </>
  );
};

export default Student;
