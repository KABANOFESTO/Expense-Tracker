// src/App.js
import React, { useState, useEffect } from 'react';
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
          <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
          <ExpenseForm />
          <ExpenseList />
        </>
      ) : (
        <div className="auth-container">
          {showSignup ? (
            <>
              <Signup />
              <p>
                Already have an account?{' '}
                <button onClick={() => setShowSignup(false)} className="text-blue-500">Log in</button>
              </p>
            </>
          ) : (
            <>
              <Login onLoginSuccess={handleLoginSuccess} />
              <p>
                Don’t have an account?{' '}
                <button onClick={() => setShowSignup(true)} className="text-blue-500">Sign up</button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
