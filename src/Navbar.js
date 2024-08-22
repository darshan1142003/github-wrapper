import React from 'react';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="header">
      <div className="logo">
        <a href="#home" className="logoLink"></a>
      </div>
      <div className="navbar">
        <a href="#home" className="navLink">Home</a>
        <a href="#features" className="navLink">Features</a>
        <a href="#contact" className="navLink">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
