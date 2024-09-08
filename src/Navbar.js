import React from 'react';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <>
      {/* Remix Icon Link */}
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
        rel="stylesheet"
      />

      <nav className="header">
        <div className="logo">
          <a href="#home" className="logoLink">
            <span className="logoText">GitHub</span> <span className="logoAccent">Wrapper</span>
          </a>
        </div>
        <div className="navbar">
          <a href="#home" className="navLink">Home</a>
          <a href="#features" className="navLink">Features</a>
          <a href="#contact" className="navLink">Contact</a>
          <i className="ri-menu-line"></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
