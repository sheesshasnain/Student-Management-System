import React, { useState } from "react";
import axios from "axios";
import "./AddSt.css";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const API = "http://localhost:5000/students";

export default function StudentForm() {
  const navigate = useNavigate();

  // form fields
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [subject, setSubject] = useState("");
  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [gender, setGender] = useState("");

  // MUI alert
  const [snack, setSnack] = useState({
    open: false,
    severity: "success", // "success" | "error"
    message: "",
  });
  const closeSnack = (_, reason) => {
    if (reason === "clickaway") return;
    setSnack((s) => ({ ...s, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // tiny required check
    if (!name.trim() || !rollNo.trim()) {
      setSnack({ open: true, severity: "error", message: "Name & Roll No are required." });
      return;
    }

    try {
      // check duplicate by rollNo
      const { data: dup } = await axios.get(`${API}?rollNo=${encodeURIComponent(rollNo.trim())}`);
      if (Array.isArray(dup) && dup.length > 0) {
        setSnack({ open: true, severity: "error", message: `Roll No "${rollNo}" already exists.` });
        return;
      }

      // create (keep it simple; id = rollNo)
      const newStudent = {
        id: rollNo.trim(),
        name: name.trim(),
        rollNo: rollNo.trim(),
        subject: subject.trim(),
        degree: degree.trim(),
        department: department.trim(),
        age: age ? Number(age) : "",
        grade: grade.trim(),
        cgpa: cgpa ? Number(parseFloat(cgpa).toFixed(2)) : "",
        gender,
      };

      await axios.post(API, newStudent);

      setSnack({ open: true, severity: "success", message: "Student added successfully!" });

      // clear + go back after a short delay so the user sees the success
      setName(""); setRollNo(""); setSubject(""); setDegree("");
      setDepartment(""); setAge(""); setGrade(""); setCgpa(""); setGender("");

      setTimeout(() => navigate("/Student"), 700);
    } catch (err) {
      setSnack({ open: true, severity: "error", message: "Something went wrong. Try again." });
    }
  };

  return (
    <>
      <Snackbar
        open={snack.open}
        onClose={closeSnack}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeSnack} variant="filled" severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>

      <div className="form-container">
        <h2>Student Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Roll No:</label>
            <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Subject:</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Degree (e.g. BSCS):</label>
            <input value={degree} onChange={(e) => setDegree(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Department (e.g. FOIT):</label>
            <input value={department} onChange={(e) => setDepartment(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Grade:</label>
            <input value={grade} onChange={(e) => setGrade(e.target.value)} />
          </div>

          <div className="form-group">
            <label>CGPA:</label>
            <input type="number" step="0.01" value={cgpa} onChange={(e) => setCgpa(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
          <br />
          <Link to="/Student">
            <button type="button" className="submit-btn">Back</button>
          </Link>
        </form>
      </div>
    </>
  );
}
