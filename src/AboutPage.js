import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Redirect to Report Generator if already authenticated
  if (isAuthenticated) {
    navigate('/report-generator');
    return null; // Prevent rendering the AboutPage if already authenticated
  }

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div style={styles.container}>
      <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} loginWithRedirect={loginWithRedirect} />
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to GitHub Wrapper</h1>
        <div style={styles.infoSection}>
          <p style={styles.description}>
            Our application delivers detailed GitHub profile reports with a professional and serious approach. Gain comprehensive insights into GitHub profiles with an emphasis on technical skills and contributions.
            <br /><br />
            Utilize our robust tools to analyze repositories, assess tech stacks, and generate polished PDF reports that reflect your professional achievements.
          </p>
        </div>
        <button onClick={() => loginWithRedirect()} style={styles.button}>
          Log In
        </button>
      </div>
      <div id="features" style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Features</h2>
        <div style={styles.featuresContainer}>
          <div style={styles.featureBox}>
            <div style={styles.featureContent}>
              <div style={styles.featureIcon}>📊</div>
              <div style={styles.featureText}>
                <h3 style={styles.featureHeading}>Detailed Reports</h3>
                <p style={styles.featureDescription}>
                  Obtain in-depth GitHub profile reports that emphasize technical skills and project impact.
                </p>
              </div>
            </div>
          </div>
          <div style={styles.featureBox}>
            <div style={styles.featureContent}>
              <div style={styles.featureIcon}>🔍</div>
              <div style={styles.featureText}>
                <h3 style={styles.featureHeading}>Repository Analysis</h3>
                <p style={styles.featureDescription}>
                  Analyze repositories with precision to evaluate tech stacks and overall performance.
                </p>
              </div>
            </div>
          </div>
          <div style={styles.featureBox}>
            <div style={styles.featureContent}>
              <div style={styles.featureIcon}>📄</div>
              <div style={styles.featureText}>
                <h3 style={styles.featureHeading}>Professional PDF Reports</h3>
                <p style={styles.featureDescription}>
                  Generate and download polished PDF reports suitable for sharing and professional use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="contact" style={styles.contactSection}>
        <h2 style={styles.contactTitle}>Contact Us</h2>
        <p style={styles.contactDescription}>
          If you have any questions, need assistance, or would like to provide feedback, please don't hesitate to contact us. You can reach us via email or LinkedIn:
        </p>
        <p style={styles.contactDetails}>
          <strong>Email:</strong> <a href="mailto:darshangurav1142003@gmail.com" style={styles.contactLink}>darshangurav1142003@gmail.com</a>
        </p>
        <p style={styles.contactDetails}>
          <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/darshan1142003/" target="_blank" rel="noopener noreferrer" style={styles.contactLink}>Darshan's LinkedIn</a>
        </p>
      </div>
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2024 GitHub Wrapper. All rights reserved.</p>
      </footer>
    </div>
  );
};

const Navbar = ({ menuOpen, toggleMenu, loginWithRedirect }) => {
  return (
    <header style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.navLeft}>
          <span style={styles.companyName}>GitHub Wrapper</span>
        </div>
        <div style={styles.menuToggle} onClick={toggleMenu}>
          ☰
        </div>
        <div style={styles.navCenter}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="#features" style={styles.navLink}>Features</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
        </div>
        <div style={styles.navRight}>
          <button onClick={() => loginWithRedirect()} style={styles.navButton}>
            Log In
          </button>
        </div>
      </div>
      <div style={{ ...styles.menu, display: menuOpen ? 'flex' : 'none' }}>
        <a href="/" style={styles.menuItem}>Home</a>
        <a href="#features" style={styles.menuItem}>Features</a>
        <a href="#contact" style={styles.menuItem}>Contact</a>
        <button onClick={() => loginWithRedirect()} style={styles.menuButton}>
          Log In
        </button>
      </div>
    </header>
  );
};

const styles = {
  container: {
    backgroundColor: '#F0F0F0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    color: '#333333',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: '#003366',
    color: '#FFFFFF',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    transition: 'background-color 0.3s ease',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    width: '100%',
  },
  navLeft: {
    flex: 1,
  },
  navCenter: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  navRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  companyName: {
    color: '#FFFFFF',
    fontSize: '1.5rem',
    margin: '0',
  },
  navLink: {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '8px 16px',
    transition: 'background-color 0.3s ease',
    borderRadius: '4px',
  },
  navButton: {
    backgroundColor: '#0066CC',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#FFFFFF',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  menuToggle: {
    display: 'none',
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: '#FFFFFF',
  },
  menu: {
    display: 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: '60px',
    right: '20px',
    backgroundColor: '#003366',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
    width: '200px',
    textAlign: 'center',
  },
  menuItem: {
    color: '#FFFFFF',
    textDecoration: 'none',
    display: 'block',
    padding: '10px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  menuButton: {
    backgroundColor: '#0066CC',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#FFFFFF',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '10px',
  },
  content: {
    textAlign: 'center',
    marginTop: '100px',
    padding: '20px',
    width: '100%',
    maxWidth: '1200px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#003366',
    marginBottom: '20px',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '40px',
  },
  description: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#333333',
  },
  button: {
    backgroundColor: '#0066CC',
    border: 'none',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#FFFFFF',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  featuresSection: {
    marginTop: '60px',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1200px',
  },
  featuresTitle: {
    fontSize: '2rem',
    color: '#003366',
    textAlign: 'center',
    marginBottom: '20px',
  },
  featuresContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  featureBox: {
    backgroundColor: '#F0F0F0',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    marginBottom: '20px',
  },
  featureContent: {
    display: 'flex',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: '2rem',
    color: '#0066CC',
    marginRight: '10px',
  },
  featureText: {
    textAlign: 'left',
  },
  featureHeading: {
    fontSize: '1.5rem',
    color: '#333333',
    marginBottom: '10px',
  },
  featureDescription: {
    fontSize: '1rem',
    color: '#666666',
  },
  contactSection: {
    marginTop: '60px',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '1200px',
  },
  contactTitle: {
    fontSize: '2rem',
    color: '#003366',
    textAlign: 'center',
    marginBottom: '20px',
  },
  contactDescription: {
    fontSize: '1.2rem',
    color: '#333333',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  contactDetails: {
    fontSize: '1rem',
    color: '#666666',
    marginBottom: '10px',
  },
  contactLink: {
    color: '#0066CC',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  footer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#003366',
    width: '100%',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '1rem',
    margin: '0',
  },
  // Media Queries
  '@media (max-width: 768px)': {
    navContent: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    navCenter: {
      display: 'none',
    },
    menuToggle: {
      display: 'block',
    },
    featuresContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    featureBox: {
      width: '90%',
    },
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '2rem',
    },
    description: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '1rem',
      padding: '10px 20px',
    },
    featureHeading: {
      fontSize: '1.2rem',
    },
    featureDescription: {
      fontSize: '0.9rem',
    },
    featuresContainer: {
      width: '100%',
    },
    featureBox: {
      width: '95%',
    },
  },
  };
  
  export default AboutPage;
     
