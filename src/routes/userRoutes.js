const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Email routes
router.post('/send-hire-email', userController.sendHireEmail);

module.exports = router; 