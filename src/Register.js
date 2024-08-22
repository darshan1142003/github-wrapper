import React, { useState } from 'react';
import './Register.css'; // Import the CSS file

const Register = ({ onLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = registeredUsers.some((user) => user.email === email);

    if (userExists) {
      setMessage('User already registered');
    } else {
      registeredUsers.push({ email, password });
      localStorage.setItem('users', JSON.stringify(registeredUsers));
      setMessage('Registration successful! You can now log in.');
      setTimeout(() => onLoginClick(), 2000); // Redirect to login after 2 seconds
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Sign Up</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleRegister}>
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
        <button type="submit" className="submit-button">Register</button>
      </form>
      <div className="login-prompt">
        <p>Already have an account?</p>
        <button onClick={onLoginClick} className="button">Login</button>
      </div>
    </div>
  );
};

export default Register;
