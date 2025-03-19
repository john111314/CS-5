import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'admin', // Default user type
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, userType } = formData;
      const endpoint = 'http://localhost:5000/api/users/login';

      // Send login request to the backend
      const response = await axios.post(endpoint, { email, password, role: userType });

      //Used for fetching the first name
      localStorage.setItem('token', response.data.token); // Token for authentication
      localStorage.setItem('firstName', response.data.user.firstName);

      alert('Login successful!');
      localStorage.setItem('token', response.data.token); // Store token for authentication
      // Redirect based on user type
      if (userType === 'admin') {
          window.location.href = '/admin/adminDashboard';
      } else if (userType === 'travel_agent') {
          window.location.href = '/travelAgent/travelAgentDashboard';
      } else if (userType === 'customer') {
          window.location.href = '/customer/customerDashboard';
      }
      console.log(formData);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '95%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '95%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '10px' }}
          >
            <option value="admin">Admin</option>
            <option value="travel_agent">Travel Agent</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', marginTop: '5px' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
