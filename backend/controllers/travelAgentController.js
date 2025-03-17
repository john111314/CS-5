/*const bcrypt = require('bcrypt'); 
const TravelAgent = require('../models/travelAgentModel');

class TravelAgentController {
    // Method to register a new travel agent
    async register(req, res) {
        const { firstName, lastName, gender, address, licenseNo, mobileNo, email, password } = req.body;

        // Basic validation
        if (!firstName || !lastName || !gender || !address || !licenseNo || !mobileNo || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (gender !== 'Male' && gender !== 'Female') {
            return res.status(400).json({ error: 'Invalid gender' });
        }

        try {
            const travelAgentModel = new TravelAgent(); // Create an instance of the TravelAgent model

            // Check if email already exists
            const existingAgent = await travelAgentModel.findByEmail(email);
            if (existingAgent.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create travel agent in the database
            const agentId = await travelAgentModel.createTravelAgent(firstName, lastName, gender, address, licenseNo, mobileNo, email, hashedPassword);

            res.status(201).json({ message: 'Travel agent registered successfully', agentId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TravelAgentController; */

const bcrypt = require('bcrypt');
const TravelAgent = require('../models/travelAgentModel');

class TravelAgentController {
    // Method to register a new travel agent
    async register(req, res) {
        const { firstName, lastName, gender, address, licenseNo, mobileNo, email, password } = req.body;

        // Basic validation
        if (!firstName || !lastName || !gender || !address || !licenseNo || !mobileNo || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (gender !== 'Male' && gender !== 'Female') {
            return res.status(400).json({ error: 'Invalid gender' });
        }

        try {
            const travelAgentModel = new TravelAgent(); // Create an instance of the TravelAgent model

            // Check if email already exists
            const existingAgent = await travelAgentModel.findByEmail(email);
            if (existingAgent.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create travel agent in the database
            const agentId = await travelAgentModel.createTravelAgent(firstName, lastName, gender, address, licenseNo, mobileNo, email, hashedPassword);

            res.status(201).json({ message: 'Travel agent registered successfully', agentId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method to login a travel agent
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const travelAgentModel = new TravelAgent();
            const agent = await travelAgentModel.login(email, password);
            res.json(agent);
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }

    // Method to update a travel agent
    async update(req, res) {
        const agentId = req.params.id;
        const data = req.body;

        try {
            const travelAgentModel = new TravelAgent();
            const result = await travelAgentModel.updateTravelAgent(agentId, data);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method to delete a travel agent
    async delete(req, res) {
        const agentId = req.params.id;

        try {
            const travelAgentModel = new TravelAgent();
            const result = await travelAgentModel.deleteTravelAgent(agentId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TravelAgentController;