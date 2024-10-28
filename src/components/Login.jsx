// src/components/Login.jsx
import React, { useState } from 'react';
import '../CSS/style.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const storedUser = localStorage.getItem(`user-${username}`);
    if (!storedUser) {
      alert('User not found. Please sign up.');
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      onLoginSuccess();
    } else {
      alert('Incorrect password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button onClick={handleLogin} className="btn">Log In</button>
    </div>
  );
};

export default Login;
