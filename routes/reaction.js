const express = require('express');
const router = express.Router();
const reactionController = require('../../controllers/reactionController');

// POST route for creating a reaction to a thought
router.post('/reactions', reactionController.createReaction);

// DELETE route for deleting a reaction
router.delete('/reactions/:reactionId', reactionController.deleteReaction);

module.exports = router;
