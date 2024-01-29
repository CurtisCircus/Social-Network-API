const mongoose = require('mongoose');
const Thought = mongoose.model('thought'); 

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createThought: async (req, res) => {
    try {
      const newThought = new Thought(req.body);
      await newThought.save();
      res.json(newThought);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  deleteThought: async (req, res) => {
    try {
      await Thought.findByIdAndDelete(req.params.thoughtId);
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.push(req.body);
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

module.exports = thoughtController;