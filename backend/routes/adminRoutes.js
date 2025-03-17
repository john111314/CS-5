const express = require('express');
const AdminController = require('../controllers/adminController');
const router = express.Router();

const adminController = new AdminController(); // Create an instance of the controller

// Route for registering a new admin
router.post('/register', adminController.register);
router.post('/login', adminController.login);

module.exports = router;
