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
      console.log(formData);
      let endpoint = '';

      // Determine endpoint based on user type
      switch (userType) {
        case 'admin':
          endpoint = 'http://localhost:5000/api/admin/login';
          break;
        case 'agent':
          endpoint = 'http://localhost:5000/api/agent/login';
          break;
        case 'customer':
          endpoint = 'http://localhost:5000/api/customer/login';
          break;
        default:
          throw new Error('Invalid user type');
      }

      // Send login request to the backend
      const response = await axios.post(endpoint, { email, password });
      alert('Login successful!');
      localStorage.setItem('token', response.data.token); // Store token for authentication
      window.location.href = '/home'; // Redirect to home page
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
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="admin">Admin</option>
            <option value="agent">Travel Agent</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
