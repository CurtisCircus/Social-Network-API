const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// GET route for fetching all users
router.get('/users', userController.getAllUsers);

// POST route for creating a new user
router.post('/users', userController.createUser);

// PUT route for updating a user
router.put('/users/:userId', userController.updateUser);

// DELETE route for deleting a user
router.delete('/users/:userId', userController.deleteUser);

// POST route for adding a friend to a user's friend list
router.post('/users/:userId/friends', userController.addFriend);

// DELETE route for removing a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', userController.removeFriend);

module.exports = router;
