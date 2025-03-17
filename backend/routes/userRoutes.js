const express = require('express');
const UserController = require('../controllers/userController'); // Import the controller class
const router = express.Router();

const userController = new UserController(); // Create an instance of the controller

router.post('/register', userController.register); // No need for `.bind()`

module.exports = router;
