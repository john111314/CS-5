const db = require('../db');

class User {
    // Method to find a user by email
    async findByEmail(email) {
        const [result] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return result;
    }

    // Method to create a new user
    async createUser(name, email, hashedPassword) {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return result.insertId;
    }
}

module.exports = User; // Exporting the class definition
