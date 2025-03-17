const express = require('express');
const TravelAgentController = require('../controllers/travelAgentController');
const router = express.Router();

const travelAgentController = new TravelAgentController(); // Create an instance of the controller

// Route for registering a new travel agent
router.post('/register', travelAgentController.register);
router.post('/login', travelAgentController.login);
router.put('/:id', travelAgentController.update);
router.delete('/:id', travelAgentController.delete);

module.exports = router;
