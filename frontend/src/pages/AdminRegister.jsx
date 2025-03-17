import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/register', formData);
            setTimeout(() => {
                alert(response.data.message);
                navigate('/'); // Redirect to home page
            }, 500); // Delay for 500 ms
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Admin Registration</h1>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <br />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <br />
            <input type="text" name="mobileNo" placeholder="Mobile Number" onChange={handleChange} required />
            <br />
            <input type="email" name="email" placeholder="Email ID" onChange={handleChange} required />
            <br />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <br />
            <button type="submit">Register</button>
        </form>
    );
};

export default AdminRegister;
