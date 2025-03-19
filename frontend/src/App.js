import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import TravelAgentRegister from './pages/travelAgent/TravelAgentRegister';
import TADashboard from './pages/travelAgent/TravelAgentDashboard';
import CustomerRegister from './pages/customer/CustomerRegister';
import CustomerDashboard from './pages/customer/CustomerDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  
                <Route path='/login' element={<Login />} />
                <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
                <Route path="/travelAgent/travelAgentRegister" element={<TravelAgentRegister />} />
                <Route path="/travelAgent/travelAgentDashboard" element={<TADashboard />} />
                <Route path="/customer/customerRegister" element={<CustomerRegister />} />
                <Route path="/customer/customerDashboard" element={<CustomerDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
