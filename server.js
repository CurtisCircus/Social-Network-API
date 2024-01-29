// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
require('./models/user');
require('./models/reaction')
require('./models/thought')
const usersRoutes = require('./routes/user'); // Import the users route
const thoughtsRoutes = require('./routes/thought'); // Import the thoughts route
const reactionsRoutes = require('./routes/reaction'); // Import the reactions route

// Create an Express application
const app = express();

// Define middleware and routes
app.use(express.json());

// Use the imported route handlers
app.use('/api/users', usersRoutes);
app.use('/api/thoughts', thoughtsRoutes);
app.use('/api/reactions', reactionsRoutes);

// Set up the server to listen on a specific port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle MongoDB connection events
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');

  // Sync Mongoose models to the MongoDB database
  // This assumes you have defined your Mongoose models in separate files (e.g., user.js, thought.js)
  require('./models/user');
  require('./models/thought');

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});