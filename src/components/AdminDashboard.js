import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/inventory">Manage Inventory</Link></li>
        <li><Link to="/admin/orders">View Orders</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
