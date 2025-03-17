const db = require('../db');

class TravelAgent {
    // Method to find a travel agent by email
    async findByEmail(email) {
        try {
            const sql = 'SELECT * FROM travel_agent_tb WHERE Email_Id = ?';
            const [rows] = await db.query(sql, [email]);
            console.log('Query result:', rows);
            return rows || [];
        }
        catch (error) {
            console.error('Database query failed:', error);
            throw new Error('Database error');
        }
    }

    async login(email, password) {
        try {
            const sql = 'SELECT * FROM travel_agent_tb WHERE Email_Id = ?';
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

    async createTravelAgent(firstName, lastName, gender, address, licenseNo, mobileNo, email, hashedPassword) {
        try {
            const sql = 'INSERT INTO travel_agent_tb (First_Name, Last_Name, Gender, Address, License_No, Mobile_No, Email_Id, Password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const [result] = await db.query(sql, [firstName, lastName, gender, address, licenseNo, mobileNo, email, hashedPassword]);
            return result.insertId;
        } catch (error) {
            console.error('Database query failed:', error);
            throw new Error('Database error');
        }
    }

    async updateTravelAgent(agentId, data) {
        try {
            const sql = 'UPDATE travel_agent_tb SET ? WHERE Travel_Agent_Id = ?';
            const [result] = await db.query(sql, [data, agentId]);
            if (result.affectedRows === 0) {
                throw new Error('Travel agent not found');
            }
            return { message: 'Travel agent updated successfully' };
        } catch (error) {
            console.error('Database query failed:', error);
            throw new Error('Update failed');
        }
    }

    async deleteTravelAgent(agentId) {
        try {
            const sql = 'DELETE FROM travel_agent_tb WHERE Travel_Agent_Id = ?';
            const [result] = await db.query(sql, [agentId]);
            if (result.affectedRows === 0) {
                throw new Error('Travel agent not found');
            }
            return { message: 'Travel agent deleted successfully' };
        } catch (error) {
            console.error('Database query failed:', error);
            throw new Error('Delete failed');
        }
    }
}

module.exports = TravelAgent;