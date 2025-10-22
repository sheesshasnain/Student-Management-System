import React from 'react'
import './Hero.css'
import bg from "../../assets/Student-Management-System.png"

const Hero = () => {
  const currentUser =
    JSON.parse(localStorage.getItem('currentUser')) ||
    JSON.parse(localStorage.getItem('user')) ||
    null;

  const name = currentUser?.name || 'Guest';

  return (
    <div className="hero">
      <div className="bgImg">
        <img src={bg} alt="Background" />
      </div>

      <div className="overlay">
        <h2>Welcome {name}</h2>
      </div>
    </div>
  )
}

export default Hero
