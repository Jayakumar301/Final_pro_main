import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage() {
  const [adminUsername, setAdminUsername] = useState(''); // Renamed variable
  const [adminPassword, setAdminPassword] = useState(''); // Renamed variable
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminUsername, adminPassword }), // Updated to renamed variables
      });

      const data = await response.json();
      if (response.status === 200 && data.success) {
        alert('Login successfully!');
        localStorage.setItem('adminProfile', JSON.stringify({ id: adminUsername })); // Save adminUsername
        navigate('/admins-page'); // Redirect to AdminsPage.jsx
      } else {
        setError(data.message || 'No records found!');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleAdminLogin}>
        <div>
          <label>Admin Username:</label>
          <input
            type="text"
            value={adminUsername} // Updated to renamed variable
            onChange={(e) => setAdminUsername(e.target.value)} // Updated to renamed variable
            required
          />
        </div>
        <div>
          <label>Admin Password:</label>
          <input
            type="password"
            value={adminPassword} // Updated to renamed variable
            onChange={(e) => setAdminPassword(e.target.value)} // Updated to renamed variable
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
}

export default AdminLoginPage;