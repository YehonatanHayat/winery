import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Login from './components/Login';
import Signup from './components/Signup';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Info from './components/Info';
import Finance from './components/Finance';
import ProtectedRoute from './components/ProtectedRoute';
import OrderManagement from './components/OrderManagement';
import About from './components/About';

import './App.css'; // ודא שקובץ ה-CSS מיובא

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
  }, [navigate]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setUserRole(null);
    setUserEmail(null);
    navigate('/login');
  };

  return (
    <div>
      <header className="header-container">
        {/* צד שמאל: לוגו + טקסט */}
        <div className="header-left">
          <img
            src="/Photo/Logo.jpg"
            alt="Asfar Winery Logo"
            className="logo"
          />
          <div className="welcome-text">
            {userEmail ? ` ${userEmail} : מחובר בתור ` : 'ברוכים הבאים'}
          </div>
        </div>

        {/* צד ימין: כפתורים */}
        <div className="header-right">
          {userRole === 'admin' && (
            <>
              <Link to="/inventory" className="link-button">Inventory</Link>
              <Link to="/finance" className="link-button">Finance</Link>
              <Link to="/info" className="link-button">Information</Link>
              <Link to="/order-management" className="link-button">OrderManagement</Link>
            </>
          )}

          {/* כפתור לחנות */}
          <Link to="/info" className="link-button">
            חנות
          </Link>

          {/* כפתור לביצוע הזמנה */}
          <Link to="/orders" className="link-button">
            ביצוע הזמנה
          </Link>

          {/* כפתור התחברות/התנתקות */}
          {userRole ? (
            <button onClick={handleLogout} className="logout-button">
              התנתקות
            </button>
          ) : (
            <button onClick={() => navigate('/login')} className="link-button">
              התחברות
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
