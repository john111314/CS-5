import React from "react";

const TADashboard = () => {
    const firstName = localStorage.getItem('firstName');
    return (
        <h1>Welcome to the travel agent dashboard, {firstName}!</h1>
    );
}

export default TADashboard;