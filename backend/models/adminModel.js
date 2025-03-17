const db = require('../db');
const bcrypt = require('bcrypt');

class Admin {
    // Method to find an admin by email
    async findByEmail(email) {
        const [result] = await db.query('SELECT * FROM admin_tb WHERE Email_Id = ?', [email]);
        return result;
      }

    // Method to create a new admin
    async createAdmin(firstName, lastName, mobileNo, email, hashedPassword) {
        try {
            const existingAdmin = await this.findByEmail(email);
            if (existingAdmin.length > 0) {
                throw new Error('Admin with this email already exists');
            }
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
      
            const [result] = await db.query(
                'INSERT INTO admin_tb (First_Name, Last_Name, Mobile_No, Email_Id, Password) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName, mobileNo, email, hashedPassword]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            const admin = await this.findByEmail(email);
            if (!admin.length) {
                throw new Error('Admin not found');
            }
    
            const isValidPassword = await bcrypt.compare(password, admin[0].Password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }
    
            return admin[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Admin; // Exporting the class definition
