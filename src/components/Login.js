import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css';
import API_BASE_URL from '../config';

const Login = ({ setUserRole, setUserEmail }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log('Attempting to log in with email:', email);

      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Login failed:', data.error || 'Invalid credentials.');
        setError(data.error || 'Invalid credentials.');
      } else {
        const { token, role, email } = data;
        console.log('Login successful. Token received:', token);

        // Save data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', email);

        setUserRole(role);
        setUserEmail(email);

        alert(`Login successful! Welcome ${email}`);
        navigate(role === 'admin' ? '/inventory' : '/orders');
      }
    } catch (err) {
      console.error('An error occurred during login:', err.message);
      setError('Something went wrong. Please try again.');
    }
  };

  // Check for token on component mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Checking for token in localStorage:', token);

    if (token) {
      console.log('Token found, user already logged in.');
    } else {
      console.log('No token found, redirecting to login.');
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-page-container">
        <h2 className="login-page-title">Welcome</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="login-page-label">Email address</label>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-page-input"
            />
          </div>
          <div>
            <label className="login-page-label">Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-page-input"
            />
          </div>
          {error && <p className="login-page-error">{error}</p>}
          <button type="submit" className="login-page-button-signin">
            Sign in
          </button>
        </form>
        <div className="login-page-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
        <button onClick={() => navigate('/info')} className="login-page-button-info">
          Info
        </button>
      </div>
    </div>
  );
};

export default Login;
