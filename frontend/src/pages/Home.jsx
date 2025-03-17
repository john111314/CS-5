import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <p>Click below to register:</p>

            <Link to="/login">
                <button>Go to login page</button>
            </Link>
            <Link to="/register">
                <button>Go to Registration Page</button>
            </Link>
            <br />
            <Link to="/AdminRegister">
                <button>Go to Admin Registration Page</button>
            </Link>
            <br />
            <Link to="/TravelAgentRegister">
                <button>Go to Travel Agent Registration Page</button>
            </Link>
            <br />
            <Link to="/CustomerRegister">
                <button>Go to Customer Registration Page</button>
            </Link>
        </div>
    );
};

export default Home;
