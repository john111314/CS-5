import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRegister from './pages/AdminRegister';
import TravelAgentRegister from './pages/TravelAgentRegister';
import CustomerRegister from './pages/CustomerRegister';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AdminRegister" element={<AdminRegister />} />
                <Route path="/TravelAgentRegister" element={<TravelAgentRegister />} />
                <Route path="/CustomerRegister" element={<CustomerRegister />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
