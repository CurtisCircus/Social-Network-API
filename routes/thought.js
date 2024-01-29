const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');

// GET route for fetching all thoughts
router.get('/thoughts', thoughtController.getAllThoughts);

// POST route for creating a new thought
router.post('/thoughts', thoughtController.createThought);

// PUT route for updating a thought
router.put('/thoughts/:thoughtId', thoughtController.updateThought);

// DELETE route for deleting a thought
router.delete('/thoughts/:thoughtId', thoughtController.deleteThought);

// POST route for creating a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', thoughtController.createReaction);

// DELETE route for deleting a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;
