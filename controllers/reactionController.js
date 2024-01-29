const mongoose = require('mongoose');
const Reaction = require('../models/reaction'); // Assuming your Reaction model is in the '../models' directory

const reactionController = {
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.body.thoughtId);
      const newReaction = new Reaction(req.body); // Assuming req.body contains the necessary data
      thought.reactions.push(newReaction);
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.pull({ _id: req.params.reactionId });
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },
};

module.exports = reactionController;
