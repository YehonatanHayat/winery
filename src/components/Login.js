import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserRole }) => { // קבלת setUserRole מה-Props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
      } else {
        const role = data.user.role; // חילוץ התפקיד מהשרת
        setUserRole(role); // עדכון ה-UserRole בקומפוננטת האב
        localStorage.setItem('userRole', role); // שמירת התפקיד ב-localStorage
        alert('Login successful! Welcome ' + data.user.email);

        // ניווט בהתאם לתפקיד
        if (role === 'admin') {
          navigate('/inventory');
        } else {
          navigate('/shop');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Email address</label>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Sign in
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-green-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
