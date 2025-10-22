import React from "react";
import Navbar from "./components/navbar/navbar";
import "./Contact.css";
import Footer from "./components/Footer/Footer";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>
          Have any questions or suggestions? We’d love to hear from you!
        </p>

        <form className="contact-form">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Message</label>
          <textarea rows="5" placeholder="Write your message"></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;
