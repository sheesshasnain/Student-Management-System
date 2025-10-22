import React from "react";
import "./Card.css";
import personImg from "../../assets/persons.png";
import { Box, Button } from "@mui/material";
import { AccessAlarm, ThreeDRotation } from "@mui/icons-material";

const Card = (props) => {
  return (
    <div className="studCard">
      <div className="description">
        <img src={props.img} alt="" className="personImg" />
        <h2>{props.name}</h2>
        <p className="rollNo">
          <strong>Roll No# </strong>
          {props.rollNo}
        </p>
        <p className="subject">
          <strong>Subject: </strong>
          {props.subject}
        </p>
        
      </div>
    </div>
  );
};

export default Card;
