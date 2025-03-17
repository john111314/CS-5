const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

class AdminController {
  // Method to register a new admin
  async register(req, res) {
    const { firstName, lastName, mobileNo, email, password } = req.body;

    // Basic validation
    if (!firstName || !lastName || !mobileNo || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const adminModel = new Admin(); // Create an instance of the Admin model

      // Create admin in the database
      const adminId = await adminModel.createAdmin(firstName, lastName, mobileNo, email, password);

      res.status(201).json({ message: 'Admin registered successfully', adminId });
    } catch (error) {
      console.error(error);
      if (error.message === 'Admin with this email already exists') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Method to login an admin
  async login(req, res) {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const adminModel = new Admin(); // Create an instance of the Admin model

      // Login admin
      const admin = await adminModel.login(email, password);

      // Generate JWT token
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);

      res.json({ message: 'Admin logged in successfully', token });
    } catch (error) {
      console.error(error);
      if (error.message === 'Admin not found') {
        res.status(404).json({ error: error.message });
      } else if (error.message === 'Invalid password') {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = AdminController; // Exporting the class definition
