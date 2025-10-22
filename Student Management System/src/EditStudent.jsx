// src/EditStudent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert, Button, CircularProgress } from "@mui/material";
import img1 from "./assets/fperson.png";   // female
import img2 from "./assets/persons.png";   // male/default

const API = "http://localhost:5000/students";

const EditStudent = () => {
  const { id } = useParams();      // current student id (old rollNo)
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

  // UI state
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // alert
  const [alert, setAlert] = useState({ open: false, severity: "success", message: "" });
  const closeAlert = (_, r) => { if (r !== "clickaway") setAlert(a => ({ ...a, open: false })); };

  // helper: pick image
  const pickImg = (g, customImg) => {
    if (customImg) return customImg;
    const x = (g || "").toLowerCase().trim();
    return x === "female" || x === "f" ? img1 : img2;
  };

  // load one student
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/${id}`);
        if (!alive) return;

        if (!data || !data.id) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        // fill form
        setName(data.name || "");
        setRollNo(data.rollNo || data.id || "");
        setSubject(data.subject || "");
        setDegree(data.degree || "");
        setDepartment(data.department || "");
        setAge(data.age ?? "");
        setGrade(data.grade || "");
        setCgpa(data.cgpa ?? "");
        setGender(data.gender || "");

        setNotFound(false);
      } catch (e) {
        setNotFound(true);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="form-container" style={{ display: "grid", placeItems: "center", minHeight: 240 }}>
        <CircularProgress />
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Student not found</h2>
        <Link to="/Student">
          <Button variant="contained">Back to Students</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newId = (rollNo || "").trim();
    if (!newId) {
      setAlert({ open: true, severity: "error", message: "Roll No is required." });
      return;
    }

    try {
      // duplicate check (allow same record)
      const { data: dupList } = await axios.get(`${API}?rollNo=${encodeURIComponent(newId)}`);
      const dupExists = Array.isArray(dupList) && dupList.some(s => String(s.id) !== String(id));
      if (dupExists) {
        setAlert({ open: true, severity: "error", message: `⚠️ Roll No "${newId}" already exists.` });
        return;
      }

      const payload = {
        id: newId,                 // we keep id = rollNo
        name: name.trim(),
        rollNo: newId,
        subject: subject.trim(),
        degree: degree.trim(),
        department: department.trim(),
        age: age ? Number(age) : "",
        grade: grade.trim(),
        cgpa: cgpa ? Number(parseFloat(cgpa).toFixed(2)) : "",
        gender,
        img: pickImg(gender),      // optional: keep server img if you store it
      };

      if (newId === id) {
        // simple case: id didn't change => PUT update
        await axios.put(`${API}/${id}`, payload);
      } else {
        // id changed => create new with newId, then delete old
        await axios.post(API, payload);
        await axios.delete(`${API}/${id}`);
      }

      setAlert({ open: true, severity: "success", message: "✅ Student updated successfully!" });
      setTimeout(() => navigate("/Student"), 900);
    } catch (err) {
      setAlert({ open: true, severity: "error", message: "❌ Update failed. Try again." });
    }
  };

  return (
    <>
      <Snackbar
        open={alert.open}
        onClose={closeAlert}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>

      <div className="form-container" style={{ padding: 24 }}>
        <h2>Edit Student</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Roll No (ID):</label>
            <input value={rollNo} onChange={(e)=>setRollNo(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Subject:</label>
            <input value={subject} onChange={(e)=>setSubject(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Degree:</label>
            <input value={degree} onChange={(e)=>setDegree(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Department:</label>
            <input value={department} onChange={(e)=>setDepartment(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Grade:</label>
            <input value={grade} onChange={(e)=>setGrade(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>CGPA:</label>
            <input type="number" step="0.01" value={cgpa} onChange={(e)=>setCgpa(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select value={gender} onChange={(e)=>setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <Button type="submit" variant="contained">Save Changes</Button>
          <span style={{ margin: "0 8px" }} />
          <Link to="/Student">
            <Button type="button" variant="outlined">Cancel</Button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditStudent;
