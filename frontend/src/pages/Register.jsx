import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            setTimeout(() => {
                alert(response.data.message);
                navigate('/'); // Redirect to home page
            }, 500); // Delay for 500 ms
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Failed to register user');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default Register;
