const mongoose = require('mongoose');
const User = mongoose.model('user'); 

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
      });
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      user.friends.push(req.body.friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      user.friends.pull(req.params.friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Bad Request' });
    }
  },
};

module.exports = userController;