import React from "react";

const CustomerDashboard = () => {
    const firstName = localStorage.getItem('firstName');
    return (
        <h1>Welcome to the customer dashboard, {firstName}!</h1>
    );
}

export default CustomerDashboard;