const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Import the User model

class UserController {
    // Method to register a new user
    async register(req, res) {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            const userModel = new User(); // Create an instance of the User model

            // Check if email already exists
            const existingUser = await userModel.findByEmail(email);
            if (existingUser.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user in the database
            const userId = await userModel.createUser(name, email, hashedPassword);

            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController; // Exporting the class definition
