import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./StudentDetails.css";
import img1 from "./assets/fperson.png"; 
import img2 from "./assets/persons.png"; 

const API = "http://localhost:5000/students";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const getImg = (s) => {
    if (!s) return img2;
    if (s.img) return s.img; 
    const g = (s.gender || "").toLowerCase().trim();
    return g === "female" || g === "f" ? img1 : img2;
   
  };

  useEffect(() => {
    let alive = true;
    setLoading(true);

    axios.get(`${API}/${id}`)
      .then(({ data }) => {
        if (alive) {
          setStudent(data);
          setNotFound(false);
        }
      })
      .catch(() => {
        if (alive) {
          setNotFound(true);
          setStudent(null);
        }
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="details-container">
        <div className="details-card">
          <h2 className="student-name">Loading…</h2>
        </div>
      </div>
    );
  }

  if (notFound || !student) {
    return (
      <div className="details-container">
        <h2 className="not-found">Student not found</h2>
        <Link to="/Student">
          <button className="back-btn">Back to Students</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-card">
        <div className="details-top">
          <img
            src={getImg(student)}
            alt={student.name}
            className="details-avatar"
          />
          <h2 className="student-name">Student Details</h2>
        </div>
        <div className="details-fields">
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Roll No:</strong> {student.rollNo}
          </p>
          <p>
            <strong>Subject:</strong> {student.subject}
          </p>
          <p>
            <strong>Degree:</strong> {student.degree}
          </p>
          <p>
            <strong>Department:</strong> {student.department}
          </p>
          <p>
            <strong>Age:</strong> {student.age}
          </p>
          <p>
            <strong>Grade:</strong> {student.grade}
          </p>
          <p>
            <strong>CGPA:</strong> {Number(student.cgpa).toFixed(2)}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender}
          </p>
        </div>

        <Link to="/Student">
          <button className="back-btn">Back to Students</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDetails;
