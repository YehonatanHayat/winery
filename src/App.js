
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; 
import Login from './components/Login';
import Signup from './components/Signup';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Info from './components/Info';
import Finance from './components/Finance';
import ProtectedRoute from './components/ProtectedRoute';
import OrderManagement from './components/OrderManagement';
import About from './components/About';


function App() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          console.log('Token expired, logging out...');
          handleLogout();
        } else {
          console.log('Token is valid, restoring user data...');
          setUserRole(localStorage.getItem('userRole'));
          setUserEmail(localStorage.getItem('userEmail'));
        }
      } catch (err) {
        console.error('Invalid token:', err);
        handleLogout();
      }
    } 
    // else {
    //   console.log('No token found, redirecting to login...');
    //   navigate('/login');
    // }
  }, [navigate]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setUserRole(null);
    setUserEmail(null);
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <div>
          {userEmail ? `Logged in as: ${userEmail}` : 'Welcome to our platform!'}
        </div>
        <div>
          {userRole === 'admin' && (
            <>
              <Link to="/inventory" className="mr-4">Inventory</Link>
              <Link to="/finance" className="mr-4">Finance</Link>
              <Link to="/info" className="mr-4">Information</Link>
              <Link to="/order-management" className="mr-4">OrderManagement</Link>
            </>
          )}
          {userRole && (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          )}
          {!userRole && (
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} setUserEmail={setUserEmail} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/info" element={<Info />} />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute role="admin">
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance"
          element={
            <ProtectedRoute role="admin">
              <Finance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-management"
          element={
            <ProtectedRoute role="admin">
              <OrderManagement />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
