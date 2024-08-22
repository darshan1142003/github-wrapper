import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

const Login = ({ onLogin, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy authentication
    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = registeredUsers.find(user => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', true);
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email" className="label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      <div className="register-prompt">
        <p>Don't have an account?</p>
        <button onClick={onRegisterClick} className="button">Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
