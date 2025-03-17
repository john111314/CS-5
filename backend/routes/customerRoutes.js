const express = require('express');
const CustomerController = require('../controllers/customerController');
const router = express.Router();

const customerController = new CustomerController(); // Create an instance of the controller

// Route for registering a new customer
router.post('/register', customerController.register);
router.post('/login', customerController.login);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.delete);

module.exports = router;
