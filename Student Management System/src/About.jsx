import React from 'react';
import Navbar from './components/navbar/navbar';
import "./About.css";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1>About This Project</h1>
        <p>
          This project is a simple student management app built with <strong>React</strong> and 
          <strong> Material UI</strong>. It displays student information such as 
          <em> name, roll number, subject, and profile image</em>.
        </p>
        <p>
          You can <strong>view</strong> student details or <strong>delete</strong> them dynamically. 
          The goal is to demonstrate <em>state management, component reusability, and modern UI styling</em>.
        </p>
        <p>
          This app is a great starting point for learning how to manage data and 
          navigation in a React application.
        </p>
      </div>
    </div>
  );
};

export default About;
