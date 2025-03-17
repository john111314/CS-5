/*const bcrypt = require('bcrypt');
const Customer = require('../models/customerModel');

class CustomerController {
    // Method to register a new customer
    async register(req, res) {
        const { firstName, lastName, gender, address, mobileNo, email, password } = req.body;

        // Basic validation
        if (!firstName || !lastName || !gender || !address || !mobileNo || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (gender !== 'Male' && gender !== 'Female') {
            return res.status(400).json({ error: 'Invalid gender' });
        }

        try {
            const customerModel = new Customer(); // Create an instance of the Customer model

            // Check if email already exists
            const existingCustomer = await customerModel.findByEmail(email);
            if (Array.isArray(existingCustomer) && existingCustomer.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create customer in the database
            const customerId = await customerModel.createCustomer(firstName, lastName, gender, address, mobileNo, email, hashedPassword);

            res.status(201).json({ message: 'Customer registered successfully', customerId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CustomerController; */

const bcrypt = require('bcrypt');
const Customer = require('../models/customerModel');
const customerModel = new Customer();

class CustomerController {
    // Method to register a new customer
    async register(req, res) {
        const { firstName, lastName, gender, address, mobileNo, email, password } = req.body;

        // Basic validation
        if (!firstName || !lastName || !gender || !address || !mobileNo || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (gender !== 'Male' && gender !== 'Female') {
            return res.status(400).json({ error: 'Invalid gender' });
        }

        try {
            // Check if email already exists
            const existingCustomer = await customerModel.findByEmail(email);
            if (existingCustomer.length > 0) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create customer in the database
            const customerId = await customerModel.createCustomer(firstName, lastName, gender, address, mobileNo, email, hashedPassword);

            res.status(201).json({ message: 'Customer registered successfully', customerId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method to login a customer
    async login(req, res) {
        const { email, password } = req.body;

        try {
            const customer = await customerModel.login(email, password);
            res.json(customer);
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Invalid credentials' });
        }
    }

    // Method to update a customer
    async update(req, res) {
        const customerId = req.params.id;
        const data = req.body;

        try {
            const result = await customerModel.updateCustomer(customerId, data);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }

    // Method to delete a customer
    async delete(req, res) {
        const customerId = req.params.id;

        try {
            const result = await customerModel.deleteCustomer(customerId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CustomerController;
