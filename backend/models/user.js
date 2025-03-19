const db = require('../db'); // Ensure this uses mysql2 (not mysql2/promise)
const bcrypt = require('bcrypt');

class User {
    async initializeTables() {
        try {
            await db.query(`CREATE TABLE IF NOT EXISTS customer_tb (
                Customer_Id INT PRIMARY KEY AUTO_INCREMENT,
                First_Name VARCHAR(50) NOT NULL,
                Last_Name VARCHAR(50) NOT NULL,
                Gender ENUM('Male', 'Female', 'Other') NOT NULL,
                Address VARCHAR(255) NOT NULL,
                Mobile_No VARCHAR(15) NOT NULL,
                Email_Id VARCHAR(100) UNIQUE NOT NULL,
                Password VARCHAR(255) NOT NULL,
                Registration_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
                Last_Login DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`);

            await db.query(`CREATE TABLE IF NOT EXISTS travel_agent_tb (
                Travel_Agent_Id INT PRIMARY KEY AUTO_INCREMENT,
                First_Name VARCHAR(50) NOT NULL,
                Last_Name VARCHAR(50) NOT NULL,
                Gender ENUM('Male', 'Female', 'Other') NOT NULL,
                Address VARCHAR(255) NOT NULL,
                License_No VARCHAR(50) UNIQUE NOT NULL,
                Mobile_No VARCHAR(15) NOT NULL,
                Email_Id VARCHAR(100) UNIQUE NOT NULL,
                Password VARCHAR(255) NOT NULL,
                Registration_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
                Last_Login DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`);

            await db.query(`CREATE TABLE IF NOT EXISTS admin_tb (
                Admin_Id INT PRIMARY KEY AUTO_INCREMENT,
                First_Name VARCHAR(50) NOT NULL,
                Last_Name VARCHAR(50) NOT NULL,
                Mobile_No VARCHAR(15) NOT NULL,
                Email_Id VARCHAR(100) UNIQUE NOT NULL,
                Password VARCHAR(255) NOT NULL,
                Registration_Date DATETIME DEFAULT CURRENT_TIMESTAMP,
                Last_Login DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`);

            console.log('Tables created or already exist');
        } catch (error) {
            console.error('Error initializing tables:', error);
            throw error;
        }
    }

    async findByEmail(email, tableName) {
        try {
            const [results] = await db.query(`SELECT * FROM ${tableName} WHERE Email_Id = ?`, [email]);
            return results.length ? results[0] : null;
        } catch (error) {
            console.error('Database query failed:', error);
            throw new Error('Database error');
        }
    }

    async login(email, password, tableName) {
        try {
            const user = await this.findByEmail(email, tableName);
            if (!user) throw new Error('User not found');
            
            const isValidPassword = await bcrypt.compare(password, user.Password);
            if (!isValidPassword) throw new Error('Invalid password');

            const [result] = await db.query(
                `UPDATE ${tableName} 
                 SET Last_Login = NOW() 
                 WHERE Email_Id = ?`, 
                [email]
            );
    
            if (result.affectedRows === 0) {
                throw new Error('Failed to update last login');
            }

            //Later used in fetching the first name
            return {
                id: user.Customer_Id || user.Travel_Agent_Id || user.Admin_Id,
                firstName: user.First_Name,
                email: user.Email_Id,
                role: tableName
            };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async createUser(data, tableName) {
        try {
            const { firstName, lastName, gender, address, mobileNo, email, password, licenseNo } = data;
            const hashedPassword = await bcrypt.hash(password, 10);
            
            let sql, values;
            if (tableName === 'customer_tb') {
                sql = 'INSERT INTO customer_tb (First_Name, Last_Name, Gender, Address, Mobile_No, Email_Id, Password) VALUES (?, ?, ?, ?, ?, ?, ?)';
                values = [firstName, lastName, gender, address, mobileNo, email, hashedPassword];
            } else if (tableName === 'travel_agent_tb') {
                sql = 'INSERT INTO travel_agent_tb (First_Name, Last_Name, Gender, Address, License_No, Mobile_No, Email_Id, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                values = [firstName, lastName, gender, address, licenseNo, mobileNo, email, hashedPassword];
            } /*else if (tableName === 'admin_tb') {
                sql = 'INSERT INTO admin_tb (First_Name, Last_Name, Mobile_No, Email_Id, Password) VALUES (?, ?, ?, ?, ?)';
                values = [firstName, lastName, mobileNo, email, hashedPassword];
            }*/ else {
                throw new Error('Invalid table name');
            }

            const [result] = await db.query(sql, values);
            return result.insertId;
        } catch (error) {
            console.error('User creation error:', error);
            throw error;
        }
    }

    async updateUser(userId, data, tableName) {
        try {
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }
            
            const sql = `UPDATE ${tableName} SET ? WHERE ${this.getPrimaryKey(tableName)} = ?`;
            const [result] = await db.query(sql, [data, userId]);
            
            if (result.affectedRows === 0) throw new Error('User not found');
            return { message: 'User updated successfully' };
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    }

    async deleteUser(userId, tableName) {
        try {
            const sql = `DELETE FROM ${tableName} WHERE ${this.getPrimaryKey(tableName)} = ?`;
            const [result] = await db.query(sql, [userId]);
            
            if (result.affectedRows === 0) throw new Error('User not found');
            return { message: 'User deleted successfully' };
        } catch (error) {
            console.error('Delete error:', error);
            throw error;
        }
    }

    getPrimaryKey(tableName) {
        return tableName === 'customer_tb' ? 'Customer_Id' : tableName === 'travel_agent_tb' ? 'Travel_Agent_Id' : 'Admin_Id';
    }
}

module.exports = User;
