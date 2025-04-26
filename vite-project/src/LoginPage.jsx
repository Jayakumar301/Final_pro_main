import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem('profile', JSON.stringify({ id: username }));
  
        // Fetch data for all parts
        const parts = ['parta', 'partb', 'partc', 'partd', 'parte', 'partf'];
        const fetchedData = {};
  
        for (const part of parts) {
          try {
            const partResponse = await fetch(`http://localhost:5000/get-part-data?id=${username}&part=${part}`);
            const partData = await partResponse.json();
  
            if (partResponse.status === 200 && partData.success) {
              fetchedData[part] = partData.data;
            } else {
              console.error(`Error fetching ${part} data:`, partData.message || 'Unknown error');
            }
          } catch (err) {
            console.error(`Error fetching ${part} data:`, err.message || err);
          }
        }
  
        // Store fetched data in localStorage or state for use in components
        localStorage.setItem('partsData', JSON.stringify(fetchedData));
  
        navigate('/HomePage'); // Redirect to HomePage.jsx
      } else {
        setError(data.message || 'Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Login error:', err.message || err);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;