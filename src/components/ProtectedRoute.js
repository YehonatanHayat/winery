// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, role }) => {
//   const userRole = localStorage.getItem('userRole');

//   if (!userRole || (role && userRole !== role)) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;




import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token || !userRole) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // בדיקה אם ה-token פג תוקף
    if (decoded.exp < currentTime) {
      localStorage.clear(); // ניקוי כל הנתונים
      return <Navigate to="/login" />;
    }

    // בדיקת התאמת role
    if (role && userRole !== role) {
      return <Navigate to="/login" />;
    }
  } catch (err) {
    console.error('Invalid token:', err);
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
