import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <header style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.navLeft}>
          <span style={styles.companyName}>GitHub Wrapper</span>
        </div>
        <div style={styles.menuToggle} onClick={toggleMenu}>
          ☰
        </div>
        <div style={{ ...styles.navRight, display: menuOpen ? 'none' : 'flex' }}>
          {isAuthenticated && user && <p style={styles.userName}>Welcome, {user.name}</p>}
          {isAuthenticated ? (
            <button onClick={handleLogout} style={styles.navButton}>
              Log Out
            </button>
          ) : (
            <button onClick={() => loginWithRedirect()} style={styles.navButton}>
              Log In
            </button>
          )}
        </div>
        <div style={{ ...styles.mobileMenu, display: menuOpen ? 'flex' : 'none' }}>
          <a href="/" style={styles.menuItem}>Home</a>
          <a href="#features" style={styles.menuItem}>Features</a>
          <a href="#contact" style={styles.menuItem}>Contact</a>
          {isAuthenticated ? (
            <button onClick={handleLogout} style={styles.menuButton}>
              Log Out
            </button>
          ) : (
            <button onClick={() => loginWithRedirect()} style={styles.menuButton}>
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

// Styles and media queries
const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%', // Set the initial width to 100%
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
    width: 'auto', // Ensure the width adjusts in media queries
  },
  navLeft: {
    flex: 1,
  },
  navRight: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  companyName: {
    color: '#FFFFFF',
    fontSize: '1.5rem',
    margin: '0',
  },
  navButton: {
    backgroundColor: '#0066CC',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#FFFFFF',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: '1rem',
    margin: '0 15px 0 0',
  },
  menuToggle: {
    display: 'none',
    fontSize: '1.5rem',
    color: '#FFFFFF',
    cursor: 'pointer',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mobileMenu: {
    display: 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: '60px',
    right: '0',
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
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
};

// Media Queries for Responsive Design
const mediaQueries = {
  '@media (max-width: 768px)': {
    menuToggle: {
      display: 'flex',
    },
    navRight: {
      display: 'none',
    },
    navContent: {
      width: 'auto', // Adjust the width in media queries
    },
  },
  '@media (max-width: 480px)': {
    menuToggle: {
      fontSize: '2rem',
    },
    menuItem: {
      fontSize: '1.2rem',
    },
    navContent: {
      width: 'auto', // Adjust the width in media queries
    },
  },
};

export default Navbar;
