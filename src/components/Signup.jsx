import React, { useState } from 'react';
import '../CSS/style.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        const user = { username, email, password };
        localStorage.setItem(`user-${username}`, JSON.stringify(user));
        alert('Signup successful! You can now log in.');
        setUsername('');
        setPassword('');
        setEmail('');
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
            />
             <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
            />
            <button onClick={handleSignup} className="btn">Sign Up</button>
        </div>
    );
};

export default Signup;
