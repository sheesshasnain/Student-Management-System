import React from 'react'
import './Navbar.css' 
import logo from "/Users/shees/Desktop/Internship/project/Student Management System/src/assets/logo.png"

const Navbar = () => {
  return (
    <header className="header">

        <a href=" " className="logo">Student Management System</a>

        <nav className="navbar">
            <a href="/">Home</a>
            <a href="/">About</a>
            <a href="/">Services</a>
            <a href="/">Contact</a>
        </nav>
    </header>
  )
}

export default Navbar