const express = require('express');
const User = require('../models/user'); // Import the User model
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, gender, address, mobileNo, email, password, role, licenseNo } = req.body;

        // Determine the table name based on the role
        let tableName;
        switch (role) {
            case 'customer':
                tableName = 'customer_tb';
                break;
            case 'travel_agent':
                tableName = 'travel_agent_tb';
                break;
            case 'admin':
                tableName = 'admin_tb';
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        const user = new User();
        const userId = await user.createUser({ firstName, lastName, gender, address, mobileNo, email, password, licenseNo }, tableName);

        res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ message: error.message || 'Registration failed' });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Determine the table name based on the role
        let tableName;
        switch (role) {
            case 'customer':
                tableName = 'customer_tb';
                break;
            case 'travel_agent':
                tableName = 'travel_agent_tb';
                break;
            case 'admin':
                tableName = 'admin_tb';
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        const user = new User();
        const loggedInUser = await user.login(email, password, tableName);

        res.status(200).json({ message: 'Login successful', user: loggedInUser });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(401).json({ message: error.message || 'Login failed' });
    }
});

// Update a user
router.put('/update/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { role, ...data } = req.body;

        // Determine the table name based on the role
        let tableName;
        switch (role) {
            case 'customer':
                tableName = 'customer_tb';
                break;
            case 'travel_agent':
                tableName = 'travel_agent_tb';
                break;
            case 'admin':
                tableName = 'admin_tb';
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        const user = new User();
        const result = await user.updateUser(userId, data, tableName);

        res.status(200).json(result);
    } catch (error) {
        console.error('Update failed:', error);
        res.status(500).json({ message: error.message || 'Update failed' });
    }
});

// Disable (delete) a user
router.delete('/disable/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        // Determine the table name based on the role
        let tableName;
        switch (role) {
            case 'customer':
                tableName = 'customer_tb';
                break;
            case 'travel_agent':
                tableName = 'travel_agent_tb';
                break;
            case 'admin':
                tableName = 'admin_tb';
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        const user = new User();
        const result = await user.deleteUser(userId, tableName);

        res.status(200).json(result);
    } catch (error) {
        console.error('Disable failed:', error);
        res.status(500).json({ message: error.message || 'Disable failed' });
    }
});

// Get user details by ID
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.query;

        // Determine the table name based on the role
        let tableName;
        switch (role) {
            case 'customer':
                tableName = 'customer_tb';
                break;
            case 'travel_agent':
                tableName = 'travel_agent_tb';
                break;
            case 'admin':
                tableName = 'admin_tb';
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        const user = new User();
        const userDetails = await user.findByEmail(userId, tableName); // Assuming userId is used as email for simplicity
        if (!userDetails) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(userDetails);
    } catch (error) {
        console.error('Fetch user failed:', error);
        res.status(500).json({ message: error.message || 'Fetch user failed' });
    }
});

module.exports = router;