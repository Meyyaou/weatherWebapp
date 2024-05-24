import React, { useState } from 'react';
import './Signup.css';

function Signup({ navigateTo }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('student'); 
  const [alerts, setAlerts] = useState('enable'); 

  const handleSignup = async (e) => {
    e.preventDefault();

    const userData = { name, email, password, type, alerts };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register user.');
      }

      const result = await response.json();
      alert('User registered successfully!');
      
      setName('');
      setEmail('');
      setPassword('');
      setType('student');
      setAlerts('enable');
      navigateTo('login');
    } catch (error) {
      console.error('Error registering user:', error);
      alert(error.message);
    }
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleAlertsChange = (e) => {
    setAlerts(e.target.value);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select id="type" value={type} onChange={handleTypeChange} required>
            <option value="student">Student</option>
            <option value="airline-worker">Airline Worker</option>
            <option value="agriculture-worker">Agriculture Worker</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        <div className="alert">
          <label htmlFor="alerts">Alerts:</label>
          <select id="alerts" value={alerts} onChange={handleAlertsChange} required>
            <option value="enable">Enable</option>
            <option value="disable">Disable</option>
          </select>
        </div>
        <button className="button" type="submit">
          Signup
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <span
          onClick={() => navigateTo('login')}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          Login here
        </span>
      </p>
    </div>
  );
}

export default Signup;






/**useEffect(() => {
    localStorage.setItem('dataAvailable', JSON.stringify(false));
  }, []); */