

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Info from './components/Info';
import Finance from './components/Finance';
import ProtectedRoute from './components/ProtectedRoute';
import OrderManagement from './components/OrderManagement';
function App() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    localStorage.clear();
    setUserRole(null);
    setUserEmail(null);
    navigate('/login');
  }, []);

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    }
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    }
  }, [userRole, userEmail]);


  
  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    setUserEmail(null);
    setRefreshKey((prevKey) => prevKey + 1);
    window.location.reload();
    
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
        <Route path="/" element={<Info />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} setUserEmail={setUserEmail} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
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
