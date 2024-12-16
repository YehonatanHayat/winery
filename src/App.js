import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Shop from './components/Shop';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Info from './components/Info';

function App() {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null;
  });

  useEffect(() => {
    if (userRole) {
      localStorage.setItem('userRole', userRole);
    }
  }, [userRole]);

  return (
    <Routes>
      <Route path="/" element={<Info />} />
      <Route path="/login" element={<Login setUserRole={setUserRole} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/shop" element={<Shop />} />
      {userRole === 'admin' && (
        <>
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
