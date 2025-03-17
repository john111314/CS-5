const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User'); // Import the User model
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize tables
const user = new User();
user.initializeTables((error) => {
    if (error) {
        console.error('Failed to initialize tables:', error);
        process.exit(1); // Exit the application if tables cannot be created
    } else {
        console.log('Tables initialized successfully');
    }
});

// Routes
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));