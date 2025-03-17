import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TravelAgentRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        licenseNo: '',
        mobileNo: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/travelAgent/register', formData);
            setTimeout(() => {
                alert(response.data.message);
                navigate('/'); // Redirect to home page
            }, 500);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Failed to register travel agent');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Travel Agent Registration Page</h1>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <br />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <br />
            <select name="gender" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <br />
            <textarea name="address" placeholder="Address" onChange={handleChange} required />
            <br />
            <input type="text" name="licenseNo" placeholder="License Number" onChange={handleChange} required />
            <br />
            <input type="text" name="mobileNo" placeholder="Mobile Number" onChange={handleChange} required />
            <br />
            <input type="email" name="email" placeholder="Email ID" onChange={handleChange} required />
            <br />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <br />
            <button type="submit">Register</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default TravelAgentRegister;
