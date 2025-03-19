import React from "react";

const AdminDashboard = () => {
    const firstName = localStorage.getItem('firstName');
    return (
        <h1>Welcome to the admin dashboard, {firstName}!</h1>
    );
}

export default AdminDashboard;