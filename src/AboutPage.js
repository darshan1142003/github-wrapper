import React, { useState } from 'react';
import Navbar from './Navbar';
import ReportGenerator from './ReportGenerator';
import Login from './Login';
import Register from './Register';
import { FaLinkedin, FaEnvelope, FaUsers, FaGlobe, FaTachometerAlt } from 'react-icons/fa';
import './AboutPage.css';

const AboutPage = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setLoggedIn(false);
    setShowLogin(true); // Show login prompt after logout
  };

  const handleLogin = () => {
    setLoggedIn(true);
    setShowLogin(false); // Hide login prompt after successful login
    setShowRegister(false); // Ensure registration form is hidden
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <div className="about-container">
      <Navbar />
      <main className="main-content">
        <section className="info-section">
          <h2 className="info-title">About Us</h2>
          <p className="description">
            <strong className="highlight">Welcome to GitHub Wrapper!</strong> 
            We specialize in delivering deep insights into GitHub profiles, allowing developers to showcase their skills and achievements effectively.
            <br /><br />
            <strong className="highlight">Our Mission:</strong> Empowering developers with detailed GitHub profile analysis that highlights their technical prowess and contributions.
            <br /><br />
            <strong className="highlight">Our Vision:</strong> To become the leading platform for GitHub profile analysis, offering tools that enhance career opportunities and professional growth.
            <br /><br />
            Using <strong className="highlight">cutting-edge algorithms</strong>, we analyze repositories, evaluate tech stacks, and generate polished PDF reports that are perfect for professional use.
          </p>
        </section>
        <section className="login-section">
          {showRegister ? (
            <Register onLoginClick={handleLoginClick} />
          ) : showLogin ? (
            <Login onLogin={handleLogin} onRegisterClick={handleRegisterClick} />
          ) : loggedIn ? (
            <ReportGenerator onLogout={handleLogout} />
          ) : (
            <div className="login-prompt">
              <p className="login-text">To access the Report Generator, please log in.</p>
              <button onClick={() => setShowLogin(true)} className="button">
                Login
              </button>
              <button onClick={() => setShowRegister(true)} className="button">
                Sign Up
              </button>
            </div>
          )}
        </section>
        <section id="features" className="features-section">
          <h2 className="features-title">Our Features</h2>
          <div className="features-container">
            <div className="feature-box">
              <FaTachometerAlt size={40} className="feature-icon" />
              <h3 className="feature-heading">Detailed Reports</h3>
              <p className="feature-description">
                Obtain in-depth GitHub profile reports that emphasize technical skills and project impact.
              </p>
            </div>
            <div className="feature-box">
              <FaGlobe size={40} className="feature-icon" />
              <h3 className="feature-heading">Global Insights</h3>
              <p className="feature-description">
                Analyze profiles from developers around the world to understand global trends and benchmarks.
              </p>
            </div>
            <div className="feature-box">
              <FaUsers size={40} className="feature-icon" />
              <h3 className="feature-heading">Team Analysis</h3>
              <p className="feature-description">
                Evaluate team performance and collaboration by analyzing collective GitHub profiles.
              </p>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-description">
            If you have any questions, need assistance, or would like to provide feedback, please don't hesitate to contact us. We look forward to hearing from you and are here to assist with any inquiries you may have.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <FaEnvelope size={24} className="contact-icon email" />
              <p>
                <strong>Email:</strong> <a href="mailto:darshangurav1142003@gmail.com" className="contact-link">darshangurav1142003@gmail.com</a>
              </p>
            </div>
            <div className="contact-item">
              <FaLinkedin size={24} className="contact-icon linkedin" />
              <p>
                <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/darshan1142003/" className="contact-link">darshan1142003</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <section className="developed-by">
          <h2 className="developed-title">Developed by</h2>
          <div className="developers">
            <a href="https://www.linkedin.com/in/darshan1142003/" className="developer">
              <FaLinkedin size={30} className="developer-link-logo" />
              <img src="/assets/darsh.png" alt="Darshan" className="developer-logo" />
              <p>Darshan</p>
            </a>
            <a href="https://www.linkedin.com/in/mansi-patil-56296323b/" className="developer">
              <FaLinkedin size={30} className="developer-link-logo" />
              <img src="/assets/man.png" alt="Mansi" className="developer-logo" />
              <p>Mansi</p>
            </a>
          </div>
        </section>
        <div className="footer-content">
          <p className="footer-text">© 2024 GitHub Wrapper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
