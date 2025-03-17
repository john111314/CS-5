const db = require('../db');

class Customer {
    async findByEmail(email) {
        try {
            const sql = 'SELECT * FROM customer_tb WHERE Email_Id = ?';
            const [rows] = await db.query(sql, [email]);
            console.log('Query result:', rows);
            return rows || []; // Ensure rows is always an array
        } catch (error) {
            console.error('Database query failed:', error);
            throw new Error('Database error');
        }
    }

    async login(email, password) {
        try {
            const sql = 'SELECT * FROM customer_tb WHERE Email_Id = ?';
            const [result] = await db.query(sql, [email]);
            if (!result.length) {
                throw new Error('Email not found');
            }

            const isValidPassword = await bcrypt.compare(password, result[0].Password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            return result[0];
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Login failed');
        }
    }

    async createCustomer(firstName, lastName, gender, address, mobileNo, email, hashedPassword) {
        try {
            const sql = 'INSERT INTO customer_tb (First_Name, Last_Name, Gender, Address, Mobile_No, Email_Id, Password) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const [result] = await db.query(sql, [firstName, lastName, gender, address, mobileNo, email, hashedPassword]);
            return result.insertId;
        } catch (error) {
            console.error('Database query failed:', error);
            throw new Error('Database error');
        }
    }

    async updateCustomer(customerId, data) {
        try {
            const sql = 'UPDATE customer_tb SET ? WHERE Customer_Id = ?';
            const [result] = await db.query(sql, [data, customerId]);
            if (result.affectedRows === 0) {
                throw new Error('Customer not found');
            }
            return { message: 'Customer updated successfully' };
        } catch (error) {
            console.error('Database query failed:', error);
            throw new Error('Update failed');
        }
    }

    async deleteCustomer(customerId) {
        try {
            const sql = 'DELETE FROM customer_tb WHERE Customer_Id = ?';
            const [result] = await db.query(sql, [customerId]);
            if (result.affectedRows === 0) {
                throw new Error('Customer not found');
            }
            return { message: 'Customer deleted successfully' };
        } catch (error) {
            console.error('Database query failed:', error);
            throw new Error('Delete failed');
        }
    }
}

module.exports = Customer;