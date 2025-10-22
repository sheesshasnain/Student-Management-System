import React from "react";
import "./CardStud.css";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const CardStud = (props) => {
  return (
    <div className="studCard">
      <div className="description">
        <img src={props.img} alt={props.name} className="personImg" />
        <h2>{props.name}</h2>
        <p className="rollNo">
          <strong>Roll No# </strong>{props.rollNo}
        </p>
        <p className="subject">
          <strong>Subject: </strong>{props.subject}
        </p>

        <Box sx={{ mt: 2 }}>
          <Link to={`/Student/${props.id}`}>
            <Button variant="contained" color="success" sx={{ mr: 2 }}>
              View
            </Button>
          </Link>

          <Button
            onClick={() => props.onDelete(props.id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
         
          <Link to={`/Edit/${props.id}`} >
          <center>
            <Button   sx={{ mt: 1 }} variant="contained" disableElevation>
              Edit
            </Button>
            </center>
          </Link>
        </Box>
      </div>
    </div>
  );
};

export default CardStud;
